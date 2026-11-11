import urllib.request
import re
from bs4 import BeautifulSoup
import json

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
req = urllib.request.Request('https://www.ucheba.ru/', headers=headers)
html = urllib.request.urlopen(req).read().decode('utf-8', errors='ignore')

# Extract titles, h1, h2, h3
h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', html, re.DOTALL)
h2s = re.findall(r'<h2[^>]*>(.*?)</h2>', html, re.DOTALL)
h3s = re.findall(r'<h3[^>]*>(.*?)</h3>', html, re.DOTALL)

def clean(txt):
    return re.sub(r'<[^>]+>', '', txt).strip().replace('&nbsp;', ' ')

print("H1s:", [clean(h) for h in h1s])
print("\nH2s:")
for h in h2s:
    print(" -", clean(h))

print("\nH3s:")
for h in h3s[:10]:
    print(" -", clean(h))

# Also extract all text blocks in nav / header
nav_blocks = re.findall(r'<nav[^>]*>(.*?)</nav>', html, re.DOTALL)
print(f"\nNav blocks found: {len(nav_blocks)}")
for i, n in enumerate(nav_blocks):
    links = re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', n, re.DOTALL)
    print(f"Nav {i+1} links ({len(links)}):")
    for href, text in links:
        print(f"   {clean(text)} -> {href}")

# Check footer links
footer_m = re.search(r'<footer[^>]*>(.*?)</footer>', html, re.DOTALL)
if footer_m:
    f_links = re.findall(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', footer_m.group(1), re.DOTALL)
    print(f"\nFooter links ({len(f_links)}):")
    for href, text in f_links[:15]:
        print(f"   {clean(text)} -> {href}")
