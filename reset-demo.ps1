# This script instantly resets the database to the default 500 patient "Safe" state
Write-Host "Resetting the ReguVigil Demo Database to zero risk state..." -ForegroundColor Cyan
docker exec ragu-bajil-backend-1 python scripts/seed.py
Write-Host "Reset Complete! You can now show the judges a fresh dashboard with 0 flags." -ForegroundColor Green
