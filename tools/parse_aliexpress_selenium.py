
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

import time

import tempfile

import shutil



CHROMEDRIVER_PATH = "/usr/local/bin/chromedriver"



options = Options()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("user-agent=Mozilla/5.0")
options.add_argument("--window-size=1920,1080")
# ❌ ВАЖНО: никаких user-data-dir
# options.add_argument("--user-data-dir=...") ← УБРАНО

service = Service(executable_path=CHROMEDRIVER_PATH)
driver = webdriver.Chrome(service=service, options=options)

query = "usb gadget"
url = f"https://www.aliexpress.com/wholesale?SearchText={query.replace(' ', '+')}"
print("[+] Открываем:", url)
driver.get(url)

try:
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "a._3t7zg._2f4Ho"))
    )
except:
    print("[!] Время ожидания истекло — карточки не найдены.")

html = driver.page_source
driver.quit()

soup = BeautifulSoup(html, 'html.parser')
selectors = [
    "a._3t7zg._2f4Ho",
    "a[data-role=product]",
    ".manhattan--container--1lP57Ag"
]

for sel in selectors:
    cards = soup.select(sel)
    print(f"[+] Селектор `{sel}` нашёл: {len(cards)} карточек")

