import urllib.request
import re
import json

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

def get_page(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        return f"Error: {e}"

print("--- ROBOTS.TXT ---")
robots = get_page('https://www.ucheba.ru/robots.txt')
for line in robots.split('\n')[:35]:
    if line.strip():
        print(line)

print("\n--- CHECKING CANDIDATE URLS ---")
test_urls = [
    'https://www.ucheba.ru/for-abiturients/schools',
    'https://www.ucheba.ru/for-abiturients/master',
    'https://www.ucheba.ru/for-abiturients/abroad',
    'https://www.ucheba.ru/for-abiturients/ege/mathematics',
    'https://www.ucheba.ru/for-abiturients/ege/russian',
    'https://www.ucheba.ru/map',
    'https://www.ucheba.ru/rating',
    'https://www.ucheba.ru/reviews',
    'https://www.ucheba.ru/calculator',
    'https://www.ucheba.ru/search',
    'https://www.ucheba.ru/for-teachers',
    'https://www.ucheba.ru/school',
    'https://www.ucheba.ru/parents',
]

for url in test_urls:
    res = get_page(url)
    if res.startswith("Error"):
        print(f"{url} -> {res}")
    else:
        title = re.search(r'<title>(.*?)</title>', res)
        t_str = title.group(1)[:50] if title else "No title"
        print(f"{url} -> 200 OK ({len(res)} bytes) | Title: {t_str}")
