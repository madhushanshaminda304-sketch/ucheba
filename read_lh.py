import json

with open('.pipeline/lh.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

cats = d.get('categories', {})
print("--- LIGHTHOUSE SCORES ---")
for k, v in cats.items():
    print(f"  {v.get('title')}: {round(v.get('score', 0) * 100)}")

audits = d.get('audits', {})
print("\n--- CORE METRICS ---")
print("  LCP:", audits.get('largest-contentful-paint', {}).get('displayValue'))
print("  CLS:", audits.get('cumulative-layout-shift', {}).get('displayValue'))
print("  FCP:", audits.get('first-contentful-paint', {}).get('displayValue'))
print("  TBT:", audits.get('total-blocking-time', {}).get('displayValue'))
print("  Speed Index:", audits.get('speed-index', {}).get('displayValue'))
