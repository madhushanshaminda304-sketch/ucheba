$shots = @(
  @{url="http://localhost:3005/school/school-hse-lyceum"; path=".pipeline/after/school-detail-desktop.png"; vp="1440,900"},
  @{url="http://localhost:3005/for-teachers"; path=".pipeline/after/for-teachers-desktop.png"; vp="1440,900"},
  @{url="http://localhost:3005/courses"; path=".pipeline/after/courses-desktop.png"; vp="1440,900"},
  @{url="http://localhost:3005/master"; path=".pipeline/after/master-desktop.png"; vp="1440,900"},
  @{url="http://localhost:3005/mba"; path=".pipeline/after/mba-desktop.png"; vp="1440,900"},
  @{url="http://localhost:3005/abroad"; path=".pipeline/after/abroad-desktop.png"; vp="1440,900"},
  @{url="http://localhost:3005/profile"; path=".pipeline/after/profile-desktop.png"; vp="1440,900"},
  @{url="http://localhost:3005/search?q=msu"; path=".pipeline/after/search-desktop.png"; vp="1440,900"},
  @{url="http://localhost:3005/ege/mathematics"; path=".pipeline/after/ege-mathematics-desktop.png"; vp="1440,900"},
  @{url="http://localhost:3005/school"; path=".pipeline/after/school-mobile.png"; vp="375,812"},
  @{url="http://localhost:3005/for-teachers"; path=".pipeline/after/for-teachers-mobile.png"; vp="375,812"},
  @{url="http://localhost:3005/profile"; path=".pipeline/after/profile-mobile.png"; vp="375,812"}
)

foreach ($s in $shots) {
  Write-Host "Capturing $($s.path)..."
  npx playwright screenshot --channel=chrome --viewport-size=$($s.vp) $($s.url) $($s.path)
}
Write-Host "All screenshots captured successfully!"
