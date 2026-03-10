cd "c:\Users\hp\Downloads\Waiter Dashboard Final"

# Configure git
git config user.name "NASRE-GAURI"
git config user.email "nasregauri@gmail.com"

# Initialize repo if needed
if (-not (Test-Path ".git")) {
    git init
}

# Add all files
git add .

# Create commit
git commit -m "Initial commit: Waiter Dashboard application"

# Add remote
git remote rm origin 2>$null
git remote add origin https://github.com/NASRE-GAURI/Infosys-M3-WaiterDashboard.git

# Push to main branch
git branch -M main
git push -u origin main

Write-Host "Push completed!" -ForegroundColor Green
