import hashlib
import io
import json
import re
import sys
import time
import urllib.request
import urllib.parse
from pathlib import Path

from PIL import Image, ImageOps
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PRODUCT_DATA = ROOT / "product-data"
SITE_DIR = ROOT / "ui_kits" / "website"
ASSET_DIR = ROOT / "assets" / "products" / "fondis"
PDF_CACHE = PRODUCT_DATA / "_source-pdfs" / "fondis"
REPORT_DIR = PRODUCT_DATA / "_reports"

FONDIS_CATALOGS = [
    PRODUCT_DATA / "fondis-poeles-bois" / "fondis-poeles-bois.json",
    PRODUCT_DATA / "fondis-inserts-bois" / "fondis-inserts-bois.json",
    PRODUCT_DATA / "fondis-cheminees-contemporaines" / "fondis-cheminees-contemporaines.json",
]

ALL_CATALOGS_FOR_FRONTEND = [
    PRODUCT_DATA / "termatech-poeles-bois" / "termatech-poeles-bois.json",
    PRODUCT_DATA / "lasian-poeles-granules" / "lasian-poeles-granules.json",
    PRODUCT_DATA / "cmg-poeles-granules" / "cmg-poeles-granules.json",
    PRODUCT_DATA / "cmg-inserts-granules" / "cmg-inserts-granules.json",
    PRODUCT_DATA / "kunst-poeles-bois" / "kunst-poeles-bois.json",
    PRODUCT_DATA / "kunst-inserts-bois" / "kunst-inserts-bois.json",
    *FONDIS_CATALOGS,
]


def slugify(value):
    value = (value or "").lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def normalize(value):
    value = (value or "").lower()
    replacements = {
        "é": "e", "è": "e", "ê": "e", "ë": "e",
        "à": "a", "â": "a", "ä": "a",
        "î": "i", "ï": "i",
        "ô": "o", "ö": "o",
        "ù": "u", "û": "u", "ü": "u",
        "ç": "c", "œ": "oe",
    }
    for src, dst in replacements.items():
        value = value.replace(src, dst)
    return re.sub(r"[^a-z0-9]+", " ", value).strip()


def token_score(product_name, page_text):
    name = normalize(product_name)
    text = normalize(page_text)
    if not name or not text:
        return 0
    if name in text:
        return 8 + min(len(name.split()), 4)
    tokens = [t for t in name.split() if len(t) > 1 and t not in {"poele", "insert", "cheminee", "bois"}]
    if not tokens:
        return 0
    hits = sum(1 for token in tokens if token in text)
    return hits / len(tokens)


def download_pdf(url):
    PDF_CACHE.mkdir(parents=True, exist_ok=True)
    digest = hashlib.sha1(url.encode("utf-8")).hexdigest()[:14]
    path = PDF_CACHE / f"{digest}.pdf"
    if path.exists() and path.stat().st_size > 1000:
        return path
    parsed = urllib.parse.urlsplit(url)
    safe_path = urllib.parse.quote(parsed.path)
    safe_query = urllib.parse.quote(parsed.query, safe="=&")
    safe_url = urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, safe_path, safe_query, parsed.fragment))
    request = urllib.request.Request(safe_url, headers={"User-Agent": "Mozilla/5.0 BCE catalog image extraction"})
    with urllib.request.urlopen(request, timeout=45) as response:
        data = response.read()
    if not data.startswith(b"%PDF"):
        raise ValueError(f"Downloaded file is not a PDF: {url}")
    path.write_bytes(data)
    time.sleep(0.12)
    return path


def open_image(image_bytes):
    with Image.open(io.BytesIO(image_bytes)) as img:
        img.load()
        img = ImageOps.exif_transpose(img)
        if img.mode not in {"RGB", "RGBA"}:
            img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
        if img.mode == "RGBA":
            background = Image.new("RGB", img.size, (245, 241, 234))
            background.paste(img, mask=img.getchannel("A"))
            img = background
        return img.copy()


def crop_whitespace(img):
    # Many PDF cutouts sit on a white or cream background. A light crop makes
    # product cards denser while keeping contextual photos intact.
    rgb = img.convert("RGB")
    bg = Image.new("RGB", rgb.size, rgb.getpixel((0, 0)))
    diff = ImageChops.difference(rgb, bg)
    bbox = diff.getbbox()
    if not bbox:
        return img
    left, top, right, bottom = bbox
    if (right - left) < img.width * 0.35 or (bottom - top) < img.height * 0.35:
        return img
    pad_x = int((right - left) * 0.04)
    pad_y = int((bottom - top) * 0.04)
    return img.crop((
        max(0, left - pad_x),
        max(0, top - pad_y),
        min(img.width, right + pad_x),
        min(img.height, bottom + pad_y),
    ))


def image_score(img, page_index, match_score):
    width, height = img.size
    area = width * height
    if width < 180 or height < 180 or area < 55_000:
        return -1
    ratio = width / height
    if ratio < 0.18 or ratio > 5.5:
        return -1
    score = area / 100_000
    if 0.45 <= ratio <= 2.2:
        score += 3
    if 0.65 <= ratio <= 1.55:
        score += 2
    score += match_score * 4
    score -= page_index * 0.35
    return score


def extract_candidates(pdf_path, product_names):
    reader = PdfReader(str(pdf_path))
    pages = []
    for page_index, page in enumerate(reader.pages):
        try:
            text = page.extract_text() or ""
        except Exception:
            text = ""
        page_scores = {name: token_score(name, text) for name in product_names}
        images = []
        for image_index, pdf_image in enumerate(getattr(page, "images", [])):
            try:
                img = open_image(pdf_image.data)
            except Exception:
                continue
            images.append({
                "page": page_index,
                "index": image_index,
                "image": img,
                "width": img.width,
                "height": img.height,
            })
        pages.append({"text": text, "scores": page_scores, "images": images})
    return pages


def choose_image(pages, product_name):
    best = None
    for page in pages:
        match = page["scores"].get(product_name, 0)
        for candidate in page["images"]:
            score = image_score(candidate["image"], candidate["page"], match)
            if score < 0:
                continue
            if best is None or score > best["score"]:
                best = {**candidate, "score": score, "match": match}
    if best:
        return best

    # Last-resort fallback: choose the largest valid image in the document.
    for page in pages:
        for candidate in page["images"]:
            score = image_score(candidate["image"], candidate["page"], 0)
            if score < 0:
                continue
            if best is None or score > best["score"]:
                best = {**candidate, "score": score, "match": 0}
    return best


def save_product_image(product, chosen):
    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    out = ASSET_DIR / f"{slugify(product['id'])}.jpg"
    img = chosen["image"]
    if max(img.size) > 1800:
        img.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
    img.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    return out


def relative_asset_path(path):
    return "../../" + path.relative_to(ROOT).as_posix()


def load_json(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def write_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def regenerate_product_data_js():
    def join_values(values):
        return ", ".join(str(value) for value in (values or []) if value not in (None, ""))

    def label_for_category(cat):
        return {
            "poeles-a-bois": "Poêles à bois",
            "poeles-a-granules": "Poêles à granulés",
            "inserts-bois": "Inserts bois",
            "inserts-granules": "Inserts à granulés",
            "cheminees-contemporaines": "Cheminées contemporaines",
        }.get(cat, cat)

    products = []
    for path in ALL_CATALOGS_FOR_FRONTEND:
        catalog = load_json(path)
        for product in catalog.get("products", []):
            specs = product.get("specs") or {}
            image = product.get("image") or {}
            documents = product.get("documents") or {}
            effective_category = product.get("categoryBceCompatible") or product.get("category", "")
            power = specs.get("puissanceNominaleKw") or specs.get("puissancePlageKw") or ""
            heated = specs.get("volumeChauffageM3") or specs.get("surfaceChauffeeM2") or ""
            products.append({
                "id": product.get("id", ""),
                "name": product.get("name", ""),
                "brand": product.get("brand", ""),
                "manufacturer": product.get("manufacturer", ""),
                "origin": product.get("origin", ""),
                "category": effective_category,
                "sourceCategory": product.get("category", ""),
                "categoryLabel": label_for_category(effective_category),
                "sourceCategoryLabel": product.get("categoryLabel", ""),
                "combustible": product.get("combustibleLabel") or ("Bois" if "bois" in effective_category else ""),
                "series": product.get("series", ""),
                "subSeries": product.get("subSeries", ""),
                "sourceUrl": product.get("sourceUrl", ""),
                "description": product.get("description", ""),
                "imageUrl": image.get("url", ""),
                "imageThumbnail": image.get("thumbnail") or image.get("url", ""),
                "power": str(power) if power is not None else "",
                "efficiency": str(specs.get("rendementPourcent") or ""),
                "heatedVolume": str(heated) if heated is not None else "",
                "weight": str(specs.get("poidsKg") or ""),
                "dimensions": str(specs.get("dimensions") or ""),
                "glassDimensions": str(specs.get("dimensionsVitre") or ""),
                "smokeOutlet": str(specs.get("sortieFumees") or ""),
                "technologies": join_values(product.get("technologies")),
                "options": join_values(product.get("options")),
                "typeAppareil": product.get("typeAppareilLabel", ""),
                "availabilityForBce": product.get("availabilityForBce", ""),
                "ficheTechnique": documents.get("ficheTechnique", ""),
            })
    products.sort(key=lambda item: (item["categoryLabel"], item["brand"], item["series"], item["name"]))
    payload = {
        "generatedAt": time.strftime("%Y-%m-%d %H:%M:%S"),
        "totalProducts": len(products),
        "products": products,
    }
    (SITE_DIR / "ProductData.js").write_text(
        "window.BCE_PRODUCTS = " + json.dumps(payload, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )


def main():
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    pdf_to_products = {}
    catalogs = []
    for path in FONDIS_CATALOGS:
        catalog = load_json(path)
        catalogs.append((path, catalog))
        for product in catalog.get("products", []):
            pdf = ((product.get("documents") or {}).get("ficheTechnique") or "").strip()
            if not pdf:
                continue
            pdf_to_products.setdefault(pdf, []).append(product)

    pdf_pages = {}
    download_errors = []
    for url, products in pdf_to_products.items():
        try:
            pdf_path = download_pdf(url)
            pdf_pages[url] = extract_candidates(pdf_path, [p.get("name", "") for p in products])
            print(f"PDF OK {len(pdf_pages[url])} pages - {url}")
        except Exception as exc:
            download_errors.append({"url": url, "error": str(exc)})
            print(f"PDF ERROR {url}: {exc}", file=sys.stderr)

    report = []
    for _, catalog in catalogs:
        for product in catalog.get("products", []):
            pdf = ((product.get("documents") or {}).get("ficheTechnique") or "").strip()
            if not pdf or pdf not in pdf_pages:
                report.append({"id": product.get("id"), "name": product.get("name"), "status": "missing-pdf"})
                continue
            chosen = choose_image(pdf_pages[pdf], product.get("name", ""))
            if not chosen:
                report.append({"id": product.get("id"), "name": product.get("name"), "status": "no-image", "pdf": pdf})
                continue
            out = save_product_image(product, chosen)
            image = product.setdefault("image", {})
            old_url = image.get("url", "")
            rel = relative_asset_path(out)
            image["url"] = rel
            image["thumbnail"] = rel
            image["alt"] = image.get("alt") or product.get("name", "")
            image["source"] = "pdf-fondis"
            image["pdfSource"] = pdf
            image["previousUrl"] = old_url
            report.append({
                "id": product.get("id"),
                "name": product.get("name"),
                "status": "ok",
                "asset": rel,
                "pdf": pdf,
                "page": chosen["page"] + 1,
                "score": round(chosen["score"], 2),
                "match": round(chosen["match"], 2),
                "size": f"{chosen['width']}x{chosen['height']}",
            })

    for path, catalog in catalogs:
        write_json(path, catalog)

    regenerate_product_data_js()
    (REPORT_DIR / "fondis-pdf-image-extraction.json").write_text(
        json.dumps({"downloadErrors": download_errors, "products": report}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    ok = sum(1 for row in report if row["status"] == "ok")
    no_image = [row for row in report if row["status"] != "ok"]
    print(f"Fondis PDF images assigned: {ok}/{len(report)}")
    if download_errors:
        print(f"Download errors: {len(download_errors)}")
    if no_image:
        print(f"Missing images: {len(no_image)}")


if __name__ == "__main__":
    # Lazy import used only by crop_whitespace if we activate it later.
    from PIL import ImageChops  # noqa: F401
    main()
