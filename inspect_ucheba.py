import urllib.request
import json
import re
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'ru,en;q=0.9',
}

def fetch(url):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        return resp.read().decode('utf-8', errors='ignore')

os.makedirs('.pipeline/before', exist_ok=True)

print("Fetching homepage...")
html = fetch('https://www.ucheba.ru/')
print(f"HTML size: {len(html)} bytes")

m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
if m:
    data = json.loads(m.group(1))
    print(f"Page: {data.get('page')}")
    print(f"Build ID: {data.get('buildId')}")
    print("Page props keys:", list(data.get('props', {}).get('pageProps', {}).keys()))
    with open('.pipeline/home_next_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Saved .pipeline/home_next_data.json")
else:
    print("No __NEXT_DATA__ found")
    with open('.pipeline/home_raw.html', 'w', encoding='utf-8') as f:
        f.write(html)

# Also check other key URLs on ucheba.ru
urls_to_probe = [
    'https://www.ucheba.ru/for-abiturients/vuz',
    'https://www.ucheba.ru/for-abiturients/colleges',
    'https://www.ucheba.ru/professions',
    'https://www.ucheba.ru/courses',
    'https://www.ucheba.ru/article',
]

for url in urls_to_probe:
    try:
        print(f"Probing {url}...")
        sub_html = fetch(url)
        sub_m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', sub_html)
        slug = url.split('/')[-1]
        if sub_m:
            sub_data = json.loads(sub_m.group(1))
            with open(f'.pipeline/{slug}_next_data.json', 'w', encoding='utf-8') as f:
                json.dump(sub_data, f, ensure_ascii=False, indent=2)
            print(f"  -> Page {sub_data.get('page')} saved with keys: {list(sub_data.get('props', {}).get('pageProps', {}).keys())}")
        else:
            print(f"  -> No __NEXT_DATA__, html length {len(sub_html)}")
    except Exception as e:
        print(f"  -> Failed: {e}")
