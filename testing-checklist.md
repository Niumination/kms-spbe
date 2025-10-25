🌐 HOMEPAGE (http://localhost:3000)
├── [-] Search bar muncul
├── [-] 3 card links terlihat (Dokumentasi, Kebijakan, Login)
├── [-] Hover effects bekerja
├── [-] Scroll smooth
└── [-] Responsive di mobile (F12 > Toggle Device)

🔐 LOGIN PAGE (http://localhost:3000/auth/login)
├── [-] Form login terlihat
├── [-] Input fields ada (email, password)
├── [-] Button "Login" ada
└── [-] Styling konsisten

🚫 UNAUTHORIZED (http://localhost:3000/unauthorized)
├── [-] Error message terlihat
├── [-] "Kembali ke Beranda" button ada
└── [-] "Login" button ada

🔍 SEARCH API (Test di terminal)
$ curl "http://localhost:3000/api/search?q=panduan"
├── [-] Return JSON response
├── [-] No error 500
└── [-] Results array (bisa kosong jika belum ada content)

📄 SITEMAP (http://localhost:3000/sitemap.xml)
├── [-] XML terlihat
├── [-] URL list muncul
└── [-] No error

🖼️ OG IMAGE (http://localhost:3000/opengraph-image)
├── [-] Image generates (might be slow first time)
└── [-] Shows "KMS SPBE" text
