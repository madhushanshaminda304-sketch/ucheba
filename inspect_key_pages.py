import urllib.request
import re
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch(url):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        return resp.read().decode('utf-8', errors='ignore')

targets = [
    ('vuz_catalog', 'https://www.ucheba.ru/for-abiturients/vuz'),
    ('college_catalog', 'https://www.ucheba.ru/for-abiturients/college'),
    ('prof_catalog', 'https://www.ucheba.ru/prof'),
    ('uz_detail_sample', 'https://www.ucheba.ru/uz/1153'),
    ('article_sample', 'https://www.ucheba.ru/article/6493'),
]

for name, url in targets:
    try:
        print(f"Fetching {name}: {url}...")
        html = fetch(url)
        print(f"  Length: {len(html)} bytes")
        m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
        if m:
            data = json.loads(m.group(1))
            with open(f'.pipeline/{name}_next.json', 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            page = data.get('page')
            props = data.get('props', {}).get('pageProps', {})
            print(f"  -> __NEXT_DATA__ found! Page: {page}, props: {list(props.keys())}")
        else:
            # Check title, h1, etc
            title_m = re.search(r'<title>(.*?)</title>', html)
            title = title_m.group(1) if title_m else 'No title'
            print(f"  -> No __NEXT_DATA__. Title: {title}")
            with open(f'.pipeline/{name}.html', 'w', encoding='utf-8') as f:
                f.write(html)
    except Exception as e:
        print(f"  -> Error: {e}")
