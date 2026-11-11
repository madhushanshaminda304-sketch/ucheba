import urllib.request
import re
import json
from collections import Counter

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

def fetch(url):
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        return resp.read().decode('utf-8', errors='ignore')

html = fetch('https://www.ucheba.ru/')

links = re.findall(r'href=["\']([^"\']+)["\']', html)
clean_links = set()
for l in links:
    if l.startswith('/') and not l.startswith('//'):
        clean_links.add(l)
    elif 'ucheba.ru' in l:
        clean_links.add(l)

print(f"Total links on home: {len(links)}, unique internal: {len(clean_links)}")

# Group by first path segment
routes = {}
for link in clean_links:
    path = link.split('?')[0]
    parts = [p for p in path.split('/') if p]
    base = parts[0] if parts else 'root'
    routes.setdefault(base, []).append(link)

for base, items in sorted(routes.items(), key=lambda x: len(x[1]), reverse=True):
    print(f"/{base} ({len(items)} links):")
    for sample in sorted(items)[:5]:
        print(f"    {sample}")

with open('.pipeline/discovered_routes.json', 'w', encoding='utf-8') as f:
    json.dump({k: sorted(v) for k, v in routes.items()}, f, ensure_ascii=False, indent=2)
print("Saved .pipeline/discovered_routes.json")
