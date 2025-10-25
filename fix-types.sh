#!/bin/bash

echo "🔧 Fixing TypeScript errors..."

# Install missing dependencies
echo "📦 Installing dependencies..."
pnpm add remark remark-html
pnpm add -D @types/lunr

# Create missing directories
echo "📁 Creating directories..."
mkdir -p content/guides
mkdir -p content/policies
mkdir -p content/sops

# Type check
echo "🔍 Running type check..."
pnpm tsc --noEmit

if [ $? -eq 0 ]; then
    echo "✅ Type check passed!"
    echo ""
    echo "🏗️  Building project..."
    pnpm build
else
    echo "❌ Type check failed. Please review errors above."
    exit 1
fi
