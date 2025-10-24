# KMS SPBE - Sistem Manajemen Pengetahuan SPBE

Platform manajemen pengetahuan untuk mendukung implementasi SPBE di instansi pemerintah.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase
- **Deployment:** Vercel
- **Language:** TypeScript

## Features

- 📚 Document Management
- 🔍 Smart Search
- 🔐 Role-based Access Control
- 📝 Version Control
- 👥 Team Collaboration

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

\```bash
# Clone repository
git clone https://github.com/niumination/kms-spbe.git
cd kms-spbe

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
pnpm dev
\```

### Environment Variables

Create `.env.local` file:

\```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
\```

## Deployment

Deploy to Vercel:

\```bash
vercel --prod
\```

## License

MIT

## Author

- GitHub: [@niumination](https://github.com/niumination)
