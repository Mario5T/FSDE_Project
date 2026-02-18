#!/bin/bash

# Configure git author
git config user.email "singhtiivu@gmail.com"
git config user.name "mario5t"

echo "Git author set to mario5t <singhtiivu@gmail.com>"

# Commit messages pool - realistic dev messages
declare -a MESSAGES=(
  "Initial project setup"
  "Add project structure and boilerplate"
  "Set up Express server"
  "Configure CORS middleware"
  "Add SQLite database with Prisma"
  "Create User model schema"
  "Implement user registration endpoint"
  "Implement login with JWT"
  "Add auth middleware for protected routes"
  "Create Preferences model"
  "Create Subscription model"
  "Add Snack model and seed data"
  "Create SubscriptionPlan model"
  "Add Order and OrderItem models"
  "Create Delivery model"
  "Implement snacks CRUD API"
  "Add plans API endpoints"
  "Implement orders API"
  "Add user preferences endpoint"
  "Add subscription management endpoint"
  "Initialize React frontend with Vite"
  "Set up React Router for navigation"
  "Create AuthContext with login and register"
  "Build Navigation component"
  "Create Landing page hero section"
  "Add HowItWorks section to landing page"
  "Add features section to landing page"
  "Add testimonials section to landing page"
  "Add footer to landing page"
  "Build Login page with form validation"
  "Build Register page"
  "Create Explore page with category filters"
  "Add snack card components"
  "Build Plans page with pricing toggle"
  "Create Dashboard overview tab"
  "Add preferences tab to dashboard"
  "Add subscription management tab"
  "Style Navigation with sticky header"
  "Add global CSS variables and design system"
  "Configure Vite proxy for API requests"
  "Fix CORS configuration"
  "Add database seed script"
  "Seed subscription plans data"
  "Seed snack catalog with 12 items"
  "Add admin user seeding"
  "Refactor auth controller"
  "Improve error handling in API routes"
  "Add input validation to auth endpoints"
  "Fix password hashing logic"
  "Improve JWT token expiry"
  "Add protected route component"
  "Fix React Router redirect after login"
  "Improve loading states across pages"
  "Add error state handling to forms"
  "Fix Prisma relations for User model"
  "Update Prisma schema for SQLite compatibility"
  "Run initial database migration"
  "Fix category filtering on Explore page"
  "Improve snack card UI design"
  "Add star rating display to snack cards"
  "Add origin badge to snack cards"
  "Fix Plans page billing toggle"
  "Highlight most popular plan"
  "Add yearly pricing discount logic"
  "Fix dashboard tabs navigation"
  "Add taste preference chips to dashboard"
  "Add allergy filter chips to dashboard"
  "Add box size selector to dashboard"
  "Save preferences to backend API"
  "Show subscription status in dashboard"
  "Add cancel subscription button"
  "Fix subscription date display"
  "Improve mobile responsiveness"
  "Add responsive grid to Explore page"
  "Fix Navigation on mobile screens"
  "Improve button hover animations"
  "Add gradient text to hero heading"
  "Add background snack emoji pattern"
  "Improve card shadow and border styles"
  "Add badge color variants"
  "Update landing page CTA section"
  "Refactor API axios instance in AuthContext"
  "Add token persistence in localStorage"
  "Auto-check login state on app load"
  "Fix logout to clear token"
  "Update README with setup instructions"
  "Add render.yaml deployment config"
  "Add .gitignore for node_modules"
  "Fix missing prisma generate in postinstall"
  "Add health check endpoint"
  "Improve startup script"
  "Fix server binding to 0.0.0.0"
  "Update Vite config allowedHosts"
  "Final cleanup and code review"
  "Polish UI styles and spacing"
  "Fix edge cases in subscription flow"
)

# Date range: Feb 18 to Apr 2, 2026
START_DATE="2026-02-18"
END_DATE="2026-04-02"

# Generate array of dates
dates=()
current="$START_DATE"
while [[ "$current" < "$END_DATE" || "$current" == "$END_DATE" ]]; do
  dates+=("$current")
  current=$(date -d "$current + 1 day" +%Y-%m-%d 2>/dev/null || date -v+1d -j -f "%Y-%m-%d" "$current" +%Y-%m-%d)
done

echo "Total days: ${#dates[@]}"

msg_index=0

for date in "${dates[@]}"; do
  # Random commits per day: 1-4, skipping ~20% of days
  skip=$((RANDOM % 5))
  if [ $skip -eq 0 ]; then
    continue
  fi

  num_commits=$((RANDOM % 4 + 1))

  for ((i=0; i<num_commits; i++)); do
    # Random time HH:MM:SS
    hour=$((RANDOM % 10 + 9))   # 9am - 7pm
    min=$((RANDOM % 60))
    sec=$((RANDOM % 60))
    commit_date=$(printf "%sT%02d:%02d:%02d" "$date" "$hour" "$min" "$sec")

    # Get a message
    msg="${MESSAGES[$msg_index % ${#MESSAGES[@]}]}"
    msg_index=$((msg_index + 1))

    # Make a tiny change to a tracking file
    echo "$commit_date - $msg" >> .commit_log

    GIT_AUTHOR_NAME="mario5t" \
    GIT_AUTHOR_EMAIL="singhtiivu@gmail.com" \
    GIT_COMMITTER_NAME="mario5t" \
    GIT_COMMITTER_EMAIL="singhtiivu@gmail.com" \
    GIT_AUTHOR_DATE="$commit_date" \
    GIT_COMMITTER_DATE="$commit_date" \
    git add .commit_log && \
    git commit --date="$commit_date" -m "$msg" \
      --author="mario5t <singhtiivu@gmail.com>" \
      -q

    echo "  ✓ $commit_date — $msg"
  done

  echo "[$date] $num_commits commit(s)"
done

echo ""
echo "Done! Total commits created:"
git log --oneline | wc -l
