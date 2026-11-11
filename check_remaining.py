import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

def check_url(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            title_m = re.search(r'<title>(.*?)</title>', html)
            title = title_m.group(1) if title_m else 'No title'
            h1_m = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
            h1 = re.sub(r'<[^>]+>', '', h1_m.group(1)).strip() if h1_m else 'No h1'
            print(f"URL: {url} -> 200 OK | Title: {title[:60]} | H1: {h1[:60]}")
    except Exception as e:
        print(f"URL: {url} -> Error: {e}")

check_url('https://www.ucheba.ru/for-abiturients/admission-support')
check_url('https://www.ucheba.ru/for-abiturients/ege')
check_url('https://www.ucheba.ru/for-clients')
check_url('https://www.ucheba.ru/agreement')
