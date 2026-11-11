import urllib.request
import re
from collections import Counter

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
req = urllib.request.Request('https://www.ucheba.ru/', headers=headers)
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Check links
links = re.findall(r'<link[^>]+>', html)
for l in links:
    if 'stylesheet' in l or '.css' in l:
        print("CSS link:", l)

# Check fonts
fonts = re.findall(r'font-family:[^;]+', html)
print(f"Font-family declarations ({len(fonts)}):")
for f in set(fonts):
    print(" ", f)

# Check classes / tailwind / styled-components
classes = re.findall(r'class="([^"]+)"', html)
all_tokens = []
for c in classes:
    all_tokens.extend(c.split())
print(f"Total CSS classes: {len(all_tokens)}, unique: {len(set(all_tokens))}")
print("Top 20 classes:")
for c, cnt in Counter(all_tokens).most_common(20):
    print(f"  {c}: {cnt}")

# Check colors in style attributes or SVG
colors = re.findall(r'#(?:[0-9a-fA-F]{3,4}){1,2}\b', html)
print("Top hex colors in HTML:")
for c, cnt in Counter(colors).most_common(10):
    print(f"  {c}: {cnt}")
