#!/bin/bash

echo "🚀 Applying KMS SPBE Fixes..."
echo "================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Create necessary directories
echo -e "${YELLOW}📁 Creating directories...${NC}"
mkdir -p src/components/ui
mkdir -p public

# 2. Create .env.local if not exists
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}📝 Creating .env.local...${NC}"
    cat > .env.local << 'EOF'
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="KMS SPBE"
EOF
    echo -e "${GREEN}✅ .env.local created${NC}"
else
    echo -e "${GREEN}✅ .env.local already exists${NC}"
fi

# 3. Install additional dependencies if needed
echo -e "${YELLOW}📦 Checking dependencies...${NC}"
if ! grep -q "lucide-react" package.json; then
    echo "Installing lucide-react..."
    pnpm add lucide-react
fi

# 4. Clear Next.js cache
echo -e "${YELLOW}🗑️  Clearing cache...${NC}"
rm -rf .next

# 5. Type check
echo -e "${YELLOW}🔍 Running type check...${NC}"
pnpm tsc --noEmit

# 6. Build test
echo -e "${YELLOW}🏗️  Testing build...${NC}"
pnpm build

echo ""
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✅ All fixes applied!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Next steps:"
echo "1. Update NEXT_PUBLIC_SITE_URL in .env.local"
echo "2. Add your Supabase credentials"
echo "3. Test with: pnpm dev"
echo "4. Check accessibility: npx axe http://localhost:3000"
echo "5. Check SEO: npx lighthouse http://localhost:3000"
