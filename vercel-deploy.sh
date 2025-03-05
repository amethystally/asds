#!/bin/bash

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Vercel Deployment Script ===${NC}"
echo ""

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check for Vercel CLI
if ! command_exists vercel; then
  echo -e "${YELLOW}Vercel CLI not found. Installing globally...${NC}"
  npm install -g vercel
fi

# Check if package.json exists and has next dependency
if [ ! -f "package.json" ]; then
  echo -e "${YELLOW}package.json not found. Creating a basic one...${NC}"
  cat > package.json << EOF
{
  "name": "tiktok-email-region-fetcher",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
EOF
  echo -e "${GREEN}Created package.json with Next.js dependency.${NC}"
  
  echo -e "${YELLOW}Installing dependencies...${NC}"
  npm install
fi

# Check if we're in a git repository
if [ -d ".git" ]; then
  echo -e "${YELLOW}Git repository detected. Making sure all changes are committed...${NC}"
  git status
  
  read -p "Do you want to commit all changes before deploying? (y/n): " commit_changes
  if [ "$commit_changes" = "y" ] || [ "$commit_changes" = "Y" ]; then
    read -p "Enter commit message: " commit_message
    git add .
    git commit -m "$commit_message"
    echo -e "${GREEN}Changes committed.${NC}"
  fi
fi

# Ask for deployment type
echo -e "${YELLOW}How would you like to deploy to Vercel?${NC}"
echo "1) Deploy to production"
echo "2) Create a preview deployment"
echo "3) Link to existing Vercel project first, then deploy"
read -p "Enter your choice (1-3): " deploy_choice

case $deploy_choice in
  1)
    # Production deployment
    echo -e "${BLUE}Deploying to production...${NC}"
    vercel --prod
    ;;
    
  2)
    # Preview deployment
    echo -e "${BLUE}Creating a preview deployment...${NC}"
    vercel
    ;;
    
  3)
    # Link first, then deploy
    echo -e "${BLUE}Linking to existing Vercel project...${NC}"
    vercel link
    
    read -p "Deploy to production? (y/n): " prod_deploy
    if [ "$prod_deploy" = "y" ] || [ "$prod_deploy" = "Y" ]; then
      vercel --prod
    else
      vercel
    fi
    ;;
    
  *)
    echo -e "${YELLOW}Invalid choice. Creating a preview deployment by default...${NC}"
    vercel
    ;;
esac

echo ""
echo -e "${GREEN}Deployment process completed!${NC}"
echo -e "${YELLOW}Note: You can view your deployments at https://vercel.com/dashboard${NC}"

