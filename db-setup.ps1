# ============================================================
# db-setup.ps1 — PostgreSQL setup script for Sri Nangali Overseas
# Run: .\db-setup.ps1
# Prerequisites: PostgreSQL installed and running locally
# Or: Docker Desktop running (uncomment Docker section)
# ============================================================

Write-Host "`n🌾 Sri Nangali Overseas — Database Setup`n" -ForegroundColor Cyan

# ── Database connection config ────────────────────────────────
$DB_URL = "postgresql://srinangali_user:Srinangali%402024@localhost:5432/srinangali_db"
$DB_PASS = "Srinangali@2024"
$DB_USER = "srinangali_user"
$DB_NAME = "srinangali_db"

# Override any system-level DATABASE_URL for this session
$env:DATABASE_URL = $DB_URL
Write-Host "✓ DATABASE_URL set for this session" -ForegroundColor Green

# ── Option A: Local PostgreSQL (default) ─────────────────────
Write-Host "`n▶ Creating database and user in local PostgreSQL..." -ForegroundColor Yellow

$sql = @"
DO `$`$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '$DB_USER') THEN
    CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';
  END IF;
END
`$`$;
SELECT 'CREATE DATABASE $DB_NAME' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')\gexec
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
"@

$sql | psql -U postgres
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Note: psql returned non-zero — continuing (may be expected for existing resources)" -ForegroundColor Yellow
}
psql -U postgres -d $DB_NAME -c "GRANT ALL ON SCHEMA public TO $DB_USER;"
Write-Host "✓ Database ready!" -ForegroundColor Green

# ── Option B: Docker (uncomment if preferred) ─────────────────
# docker compose up -d postgres
# Start-Sleep -Seconds 10

# Step 3: Generate Prisma client
Write-Host "`n▶ Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) { Write-Host "✗ Prisma generate failed." -ForegroundColor Red; exit 1 }

# Step 4: Push schema to DB
Write-Host "`n▶ Pushing schema to database..." -ForegroundColor Yellow
npx prisma db push --force-reset
if ($LASTEXITCODE -ne 0) { Write-Host "✗ Prisma db push failed." -ForegroundColor Red; exit 1 }
Write-Host "✓ Schema applied!" -ForegroundColor Green

# Step 5: Seed the database
Write-Host "`n▶ Seeding database with products..." -ForegroundColor Yellow
npx tsx prisma/seed.ts
if ($LASTEXITCODE -ne 0) { Write-Host "✗ Seed failed." -ForegroundColor Red; exit 1 }
Write-Host "✓ Database seeded!" -ForegroundColor Green

Write-Host "`n✅ Database setup complete!" -ForegroundColor Green
Write-Host "   Host:     localhost:5432" -ForegroundColor Cyan
Write-Host "   Database: $DB_NAME" -ForegroundColor Cyan
Write-Host "   User:     $DB_USER" -ForegroundColor Cyan
Write-Host "   Password: $DB_PASS" -ForegroundColor Cyan
Write-Host "`n   Admin login: admin@srinangalioverseas.com / Admin@123" -ForegroundColor Cyan
Write-Host "`n▶ Start the dev server: `$env:DATABASE_URL='$DB_URL'; npm run dev`n" -ForegroundColor Yellow
