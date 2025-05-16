import requests
from bs4 import BeautifulSoup
from datetime import datetime

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

def parse_aliexpress(query="usb gadget", limit=5):
    search_url = f"https://www.aliexpress.com/wholesale?SearchText={query.replace(' ', '+')}"
    print("[+] Запрос к:", search_url)
    resp = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(resp.text, 'html.parser')

    cards = soup.select('a._3t7zg._2f4Ho, a._3t7zg')
    print(f"[+] Найдено карточек: {len(cards)}")

    products = []
    for card in cards[:limit]:
        try:
            title = card.get('title') or card.select_one('h1, h2, h3') or "No title"
            title = title if isinstance(title, str) else title.text.strip()
            price_raw = card.select_one('.mGXnE._37W_B span, ._12A8D span')
            price = int(float(price_raw.text.replace('$', '').replace(',', '').strip()) * 90) if price_raw else 999
            img_tag = card.select_one('img')
            image = img_tag.get('src') or img_tag.get('image-src') or ''
            url = image if image.startswith("http") else "https:" + image
            desc = "Imported from Aliexpress"

            products.append((title, desc, price, datetime.now().isoformat(), url))
        except Exception as e:
            print("[!] Ошибка при обработке карточки:", e)
            continue
    return products

def make_sql_insert(products):
    values = []
    for p in products:
        title = p[0].replace("'", "''")
        desc = p[1].replace("'", "''")
        url = p[4].replace("'", "''")
        sql_entry = f"('{title}', '{desc}', {p[2]}, NOW(), '{url}')"
        values.append(sql_entry)
    return f'INSERT INTO "Products" (title, description, price, created_at, url)\nVALUES\n  ' + ",\n  ".join(values) + ";"

items = parse_aliexpress("usb gadget", limit=10)
print(f"[+] Найдено товаров: {len(items)}")
sql = make_sql_insert(items)

with open("aliexpress_products.sql", "w") as f:
    f.write(sql)

print("[+] SQL экспорт готов: aliexpress_products.sql")
