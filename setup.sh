#!/bin/bash

# Thomestic Institute Website - GitHub Setup Script
# This script helps you set up your GitHub repository

echo "========================================="
echo "  Thomestic Institute Website Setup"
echo "========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME
echo ""

# Get repository name
read -p "Enter repository name (default: thomestic-institute): " REPO_NAME
REPO_NAME=${REPO_NAME:-thomestic-institute}
echo ""

# Ask about custom domain
read -p "Will you use a custom domain? (y/n): " USE_DOMAIN
if [[ $USE_DOMAIN == "y" || $USE_DOMAIN == "Y" ]]; then
    read -p "Enter your custom domain (e.g., thomestic.regent.edu): " CUSTOM_DOMAIN
    echo $CUSTOM_DOMAIN > CNAME
    rm -f CNAME.example
    echo -e "${GREEN}✓ Created CNAME file with: $CUSTOM_DOMAIN${NC}"
else
    rm -f CNAME.example
fi
echo ""

# Update README with correct URLs
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s/yourusername/$GITHUB_USERNAME/g" README.md
    sed -i '' "s/thomestic-institute/$REPO_NAME/g" README.md
else
    # Linux
    sed -i "s/yourusername/$GITHUB_USERNAME/g" README.md
    sed -i "s/thomestic-institute/$REPO_NAME/g" README.md
fi

echo -e "${GREEN}✓ Updated README with your GitHub username${NC}"
echo ""

# Initialize git if needed
if [ ! -d .git ]; then
    git init
    echo -e "${GREEN}✓ Initialized git repository${NC}"
fi

# Add all files
git add .
git commit -m "Initial commit - Thomestic Institute Website"
echo -e "${GREEN}✓ Created initial commit${NC}"
echo ""

# Instructions for next steps
echo -e "${YELLOW}=========================================${NC}"
echo -e "${YELLOW}          Next Steps${NC}"
echo -e "${YELLOW}=========================================${NC}"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo "   Name: $REPO_NAME"
echo ""
echo "2. Add the remote and push:"
echo -e "${GREEN}   git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git${NC}"
echo -e "${GREEN}   git branch -M main${NC}"
echo -e "${GREEN}   git push -u origin main${NC}"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to: https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/pages"
echo "   - Source: Deploy from a branch"
echo "   - Branch: main / Folder: / (root)"
echo "   - Click Save"
echo ""
echo "4. Your site will be live at:"
if [[ ! -z $CUSTOM_DOMAIN ]]; then
    echo -e "${GREEN}   https://$CUSTOM_DOMAIN${NC}"
    echo "   (after DNS configuration)"
else
    echo -e "${GREEN}   https://$GITHUB_USERNAME.github.io/$REPO_NAME${NC}"
fi
echo ""
echo "5. Customize content:"
echo "   - Edit JSON files in data/ folder"
echo "   - Update Google Form link in js/main.js"
echo "   - Add board member photos to images/board/"
echo ""
echo -e "${GREEN}Setup complete! Follow the steps above to deploy.${NC}"
