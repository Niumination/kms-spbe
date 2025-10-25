---
title: Frequently Asked Questions (FAQ)
description: Pertanyaan yang sering diajukan tentang KMS SPBE beserta jawabannya
author: Tim KMS SPBE
tags:
  - faq
  - help
  - troubleshooting
  - support
category: faqs
access_level: public
content_type: guide
created_at: 2024-01-20
---

# Frequently Asked Questions (FAQ)

## 📑 Daftar Isi

1. [Umum](#umum)
2. [Akun & Login](#akun--login)
3. [Pencarian](#pencarian)
4. [Konten & Dokumen](#konten--dokumen)
5. [Keamanan](#keamanan)
6. [Teknis](#teknis)
7. [Administrasi](#administrasi)

---

## Umum

### Apa itu KMS SPBE?

**Jawaban:**

KMS SPBE (Knowledge Management System untuk Sistem Pemerintahan Berbasis Elektronik) adalah platform digital yang dirancang untuk:

- 📚 Mengelola pengetahuan dan dokumentasi SPBE
- 🔍 Memudahkan pencarian informasi
- 🤝 Mendorong berbagi pengetahuan antar instansi
- 📊 Mendukung implementasi SPBE di Indonesia

### Siapa yang bisa menggunakan KMS SPBE?

**Jawaban:**

KMS SPBE dapat digunakan oleh:

✅ **Pegawai pemerintah** (dengan akun @xxx.go.id)
- Akses konten public dan internal
- Menggunakan fitur pencarian
- Bookmark dokumen

✅ **Editor** (dengan persetujuan khusus)
- Semua akses user
- Membuat dan mengedit konten
- Upload dokumen

✅ **Administrator** (staff IT)
- Full access ke semua fitur
- Mengelola user
- Akses analytics

⚠️ **Masyarakat umum** dapat mengakses konten publik tanpa login

### Apakah KMS SPBE berbayar?

**Jawaban:**

**TIDAK.** KMS SPBE adalah platform gratis yang disediakan untuk mendukung implementasi SPBE di seluruh instansi pemerintah Indonesia.

Namun, untuk mendapatkan akun, Anda harus:
- Pegawai pemerintah dengan email @xxx.go.id
- Mengajukan permohonan akun
- Mendapat persetujuan atasan
- Mengikuti training (untuk Editor/Admin)

### Di mana saya bisa mengakses KMS SPBE?

**Jawaban:**

**Website:** https://kms-spbe.vercel.app

**Browser yang didukung:**
- ✅ Google Chrome (recommended)
- ✅ Mozilla Firefox
- ✅ Microsoft Edge
- ✅ Safari

**Mobile:** Responsive design, dapat diakses via mobile browser

### Apakah ada mobile app?

**Jawaban:**

Saat ini KMS SPBE **belum memiliki mobile app** dedicated untuk iOS/Android.

Namun, website kami **responsive** dan dapat diakses dengan nyaman melalui:
- Mobile browser (Chrome, Safari)
- Tablet browser
- Progressive Web App (PWA) - dapat "Add to Home Screen"

**Rencana:** Mobile app native sedang dalam roadmap pengembangan untuk 2025.

---

## Akun & Login

### Bagaimana cara mendaftar akun?

**Jawaban:**

**Langkah-langkah pendaftaran:**

1. **Akses form registrasi**
   - Kunjungi: https://kms-spbe.vercel.app/auth/register
   
2. **Isi formulir**
   - Nama lengkap
   - Email instansi (@xxx.go.id)
   - NIP
   - Unit kerja
   - Justifikasi penggunaan

3. **Upload dokumen pendukung**
   - Surat penugasan (untuk Editor/Admin)
   - Fotokopi SK Pegawai

4. **Tunggu approval**
   - Admin akan verifikasi dalam 1x24 jam
   - Anda akan menerima email notifikasi

5. **Aktivasi akun**
   - Klik link di email (valid 24 jam)
   - Set password
   - Akun aktif!

**Timeline:**
- Verifikasi: Max 1x24 jam
- Total: Max 2x24 jam

### Saya lupa password, bagaimana?

**Jawaban:**

**Self-service reset password:**

1. **Klik "Lupa Password"** di halaman login
2. **Masukkan email** yang terdaftar
3. **Cek email Anda** (termasuk folder spam)
4. **Klik link reset** (valid 1 jam)
5. **Buat password baru**
   - Min 12 karakter
   - Kombinasi huruf besar, kecil, angka, simbol
6. **Login** dengan password baru

**Jika link expired:**
- Ulangi proses dari awal
- Link baru akan dikirim

**Jika tidak menerima email:**
- Check spam folder
- Pastikan email benar
- Hubungi helpdesk: helpdesk@kms-spbe.go.id

### Akun saya terkunci, apa yang harus dilakukan?

**Jawaban:**

Akun terkunci biasanya karena:
- ❌ 5x failed login attempts
- ❌ Suspicious activity detected

**Solusi:**

**Opsi 1: Tunggu 30 menit**
- Akun akan unlock otomatis setelah 30 menit

**Opsi 2: Hubungi helpdesk**
1. Email: helpdesk@kms-spbe.go.id
2. Subject: "Unlock Account - [NIP Anda]"
3. Sertakan: Nama, NIP, Email
4. Admin akan verify dan unlock

**Opsi 3: WhatsApp**
- Nomor: +62 812-3456-7890
- Jam operasional: 08:00-17:00 WIB

**Pencegahan:**
- Gunakan password manager
- Jangan share password
- Enable MFA (Multi-Factor Authentication)

### Bagaimana cara mengubah email/data profil?

**Jawaban:**

**Data yang bisa diubah sendiri:**

Via Dashboard → Profile:
- ✅ Nama lengkap
- ✅ Nomor telepon
- ✅ Foto profil
- ✅ Bio
- ✅ Preferensi notifikasi

**Data yang perlu approval admin:**

Harus submit request via Dashboard → Profile → "Request Change":
- ⚠️ Email
- ⚠️ NIP
- ⚠️ Unit kerja
- ⚠️ Role

**Proses request:**
1. Fill request form
2. Upload dokumen pendukung
3. Admin review (1-3 hari)
4. Approval/reject via email
5. Data updated

### Apa itu MFA dan bagaimana mengaktifkannya?

**Jawaban:**

**MFA (Multi-Factor Authentication)** adalah keamanan tambahan yang memerlukan 2 faktor verifikasi:
1. Password (yang Anda tahu)
2. OTP/Token (yang Anda miliki)

**Manfaat:**
- 🔒 Keamanan 99.9% lebih baik
- 🛡️ Melindungi dari password theft
- ✅ Required untuk admin/editor

**Cara mengaktifkan:**

1. **Login** ke akun Anda
2. **Dashboard** → Settings → Security
3. **Enable MFA**
4. **Pilih metode:**
   - TOTP (Google Authenticator, Authy) - Recommended
   - Email OTP
   - SMS OTP (untuk akun tertentu)
5. **Scan QR code** (jika TOTP)
6. **Input verification code**
7. **Save backup codes** (penting!)
8. **Done!**

**Login dengan MFA:**
1. Input email + password
2. Input OTP dari authenticator app
3. Login berhasil

**Jika hilang access to authenticator:**
- Gunakan backup codes
- Atau hubungi admin untuk reset MFA

---

## Pencarian

### Bagaimana cara mencari dokumen?

**Jawaban:**

**Pencarian Dasar:**

1. **Klik search bar** di homepage
2. **Ketik kata kunci**, contoh: "panduan spbe"
3. **Enter** untuk search
4. **Lihat hasil** (diurutkan berdasarkan relevansi)

**Tips pencarian efektif:**

✅ **Gunakan kata kunci spesifik**
❌ Buruk: "dokumen"
✅ Baik: "panduan implementasi spbe 2024"

✅ **Gunakan tanda kutip untuk frasa eksak**
"sistem pemerintahan berbasis elektronik"

✅ **Gunakan operator AND/OR**
spbe AND keamanan
kebijakan OR peraturan

✅ **Gunakan wildcard**
kebi* → kebijakan, kebiasaan, dll

✅ **Filter berdasarkan type**
type:guide spbe
type:policy keamanan

### Kenapa hasil pencarian saya kosong?

**Jawaban:**

Kemungkinan penyebab:

**1. Typo/Ejaan salah**
- Periksa ejaan kata kunci
- Coba variasi kata (misal: "keamanan" vs "security")

**2. Terlalu spesifik**
- Kurangi jumlah kata kunci
- Hilangkan filter
- Gunakan kata kunci lebih umum

**3. Konten belum ada**
- Konten yang Anda cari mungkin belum ada di sistem
- Coba search dengan topik lebih umum

**4. Access level**
- Anda mungkin tidak punya akses ke konten tersebut
- Konten "restricted" hanya untuk admin
- Konten "internal" hanya untuk user yang login

**Solusi:**
Step 1: Cek ejaan
Step 2: Kurangi filter
Step 3: Gunakan sinonim
Step 4: Hubungi admin jika yakin konten ada

### Bagaimana cara menggunakan advanced search?

**Jawaban:**

**Advanced Search Operators:**

**1. Boolean Operators**

```bash
# AND (semua kata harus ada)
spbe AND implementasi AND 2024

# OR (salah satu kata)
panduan OR tutorial OR guide

# NOT (exclude kata)
spbe NOT draft

# Kombinasi
(spbe OR e-government) AND (2024 OR 2023) NOT draft
2. Field-Specific Search
# Search di field tertentu
title:implementasi          # Hanya di judul
description:keamanan        # Hanya di deskripsi
author:"Tim SPBE"          # Konten oleh author tertentu
tag:security               # Konten dengan tag tertentu
3. Filter by Type/Category
type:guide                 # Hanya panduan
type:policy                # Hanya kebijakan
type:sop                   # Hanya SOP
category:security          # Category tertentu
4. Date Filters
after:2024-01-01           # Konten setelah tanggal
before:2024-12-31          # Konten sebelum tanggal
year:2024                  # Konten tahun 2024
5. Wildcard
kebi*                      # kebijakan, kebiasaan, dll
*security                  # cybersecurity, infosecurity, dll
*manage*                   # management, manager, dll
Contoh kombinasi:
# Cari panduan keamanan tahun 2024
type:guide tag:security after:2024-01-01

# Cari kebijakan atau SOP tentang data
(type:policy OR type:sop) AND (data OR database)

# Cari semua konten oleh Tim SPBE kecuali draft
author:"Tim SPBE" NOT draft
Bagaimana cara menyimpan pencarian favorit?

Jawaban:

Fitur: Saved Searches

Cara menyimpan:

    Lakukan pencarian
    Klik icon bookmark di search bar
    Beri nama saved search
        Example: "Kebijakan Keamanan 2024"
    Simpan

Cara menggunakan:

    Dashboard → Saved Searches
    Klik nama saved search
    Hasil terbaru akan ditampilkan

Manfaat:

    Tidak perlu ketik ulang query rumit
    Quick access ke topik yang sering dicari
    Mendapat notifikasi jika ada konten baru matching query

Limit:

    User: 10 saved searches
    Editor: 20 saved searches
    Admin: Unlimited
Konten & Dokumen
Bagaimana cara mengakses dokumen?

Jawaban:

Cara 1: Browse by Category

    Homepage → Pilih kategori (Panduan/Kebijakan/SOP/Template)
    Browse list dokumen
    Klik judul untuk buka

Cara 2: Search

    Search bar → Ketik kata kunci
    Filter hasil jika perlu
    Klik dokumen yang diinginkan

Cara 3: Direct URL

Jika tahu slug dokumen:
https://kms-spbe.vercel.app/content/[category]/[slug]
Example:
https://kms-spbe.vercel.app/content/guides/getting-started
Kenapa saya tidak bisa mengakses dokumen tertentu?

Jawaban:

Kemungkinan penyebab:

1. Access Level Restriction

Dokumen memiliki 3 level akses:
Level	Akses	Solusi
Public	Semua orang	-
Internal	User yang login	Login terlebih dahulu
Restricted	Admin only	Request access ke admin

2. Dokumen Tidak Ditemukan (404)

    URL salah
    Dokumen sudah dihapus
    Dokumen di-unpublish

3. Login Session Expired

    Login ulang
    Clear browser cache

Solusi:
1. Pastikan Anda sudah login
2. Check role Anda (User/Editor/Admin)
3. Jika perlu akses restricted, submit request:
   - Dashboard → Request Access
   - Isi justifikasi
   - Tunggu approval
Bagaimana cara download dokumen?

Jawaban:

Format yang tersedia:

    PDF (untuk print/offline reading)
    Markdown (untuk edit)
    Word (DOCX) - untuk dokumen tertentu

Cara download:

    Buka dokumen
    Klik icon download di toolbar
    Pilih format (PDF/MD/DOCX)
    File akan terdownload

Batch download:

Untuk download multiple documents:

    Centang dokumen yang ingin didownload
    Actions → Download Selected
    Pilih format
    ZIP file akan terdownload

Limit:

    User: Max 10 files/batch
    Editor: Max 50 files/batch
    Admin: Unlimited

Catatan:

    Download requires login (except public docs)
    Download activity di-log untuk audit

Bagaimana cara membuat konten baru?

Jawaban:

Requirements:

    Role: Editor atau Admin
    Training: Sudah ikut training content creation (mandatory)

Langkah-langkah:

1. Access Content Editor
Dashboard → Content → Create New
2. Pilih Type

    Guide (Panduan)
    Policy (Kebijakan)
    SOP
    Template
    FAQ

3. Isi Metadata
Title: [Judul dokumen]
Description: [Ringkasan singkat]
Tags: [tag1, tag2, tag3]
Category: [kategori]
Access Level: Public/Internal/Restricted
4. Tulis Konten

    Gunakan Markdown editor
    Preview real-time
    Upload gambar jika perlu
    Add code blocks
    Create tables

5. Review

    Preview tampilan akhir
    Check spelling & grammar
    Verify links
    Check metadata

6. Publish

Opsi:

    Save as Draft (tidak visible untuk user)
    Submit for Review (untuk approval)
    Publish (langsung public)

Best Practices:

✅ Gunakan heading structure (H1, H2, H3)
✅ Add table of contents
✅ Include examples
✅ Add screenshots/diagrams
✅ Link to related docs
✅ Add FAQ section
✅ Include change history

Template tersedia:
Dashboard → Templates → Content Templates

    Guide template
    Policy template
    SOP template
    etc.

Bagaimana cara mengedit dokumen yang sudah ada?

Jawaban:

Permission:

Anda bisa edit dokumen jika:

    ✅ Anda adalah author
    ✅ Anda adalah Editor/Admin
    ❌ User biasa tidak bisa edit

Cara edit:

    Buka dokumen
    Klik "Edit" button (jika ada permission)
    Edit konten
    Save atau Submit for Review

Versioning:

Setiap edit akan create new version:

    v1.0 → v1.1 (minor edit)
    v1.0 → v2.0 (major revision)

History:

View change history:
Dokumen → History → View All Versions
Dapat:

    Lihat apa yang berubah (diff)
    Revert ke versi sebelumnya
    Lihat siapa yang edit
    Lihat kapan di-edit

Review Process:

Untuk dokumen official (policy/SOP):

    Editor edit → Save as Draft
    Submit for Review
    Reviewer approve/reject
    Jika approved → Published
    Notification ke stakeholders

Keamanan
Apakah KMS SPBE aman?

Jawaban:

YA. KMS SPBE dibangun dengan security best practices:

1. Infrastructure Security

✅ HTTPS/TLS 1.3 encryption
✅ Hosted di Vercel (SOC 2 compliant)
✅ Database di Supabase (ISO 27001 certified)
✅ DDoS protection (Cloudflare)
✅ Regular security updates

2. Application Security

✅ Secure authentication (Supabase Auth)
✅ Password hashing (bcrypt)
✅ Multi-factor authentication (MFA)
✅ Role-based access control (RBAC)
✅ SQL injection prevention (parameterized queries)
✅ XSS prevention (input sanitization)
✅ CSRF protection (tokens)

3. Data Security

✅ Data encryption at rest (AES-256)
✅ Data encryption in transit (TLS)
✅ Regular backups (daily)
✅ Audit logging (all activities logged)
✅ Data retention policy

4. Compliance

✅ ISO 27001 guidelines
✅ GDPR-like data protection
✅ Indonesian data regulation compliant
✅ Regular security audits

Security Measures You Should Take:

    🔒 Use strong password
    🔒 Enable MFA
    🔒 Don't share credentials
    🔒 Logout after use
    🔒 Report suspicious activity

Bagaimana kebijakan privasi data saya?

Jawaban:

Data yang kami kumpulkan:

1. Account Information

    Nama, NIP, Email (untuk authentication)
    Unit kerja (untuk authorization)
    Profil (foto, bio - optional)

2. Usage Data

    Login history
    Search queries
    Documents accessed
    Download history
    Activity logs

3. Technical Data

    IP address
    Browser type
    Device information
    Performance metrics

Penggunaan data:

✅ Untuk layanan:

    Authentication & authorization
    Personalisasi pengalaman
    Analytics & improvement

✅ Tidak digunakan untuk:

    ❌ Dijual ke pihak ketiga
    ❌ Marketing
    ❌ Profiling tanpa consent

Hak Anda:

Sesuai best practice data protection:

    Right to Access - Melihat data Anda
    Right to Correction - Perbaiki data yang salah
    Right to Deletion - Hapus akun & data
    Right to Export - Download data Anda
    Right to Object - Opt-out dari analytics

Request data privacy:
Email: privacy@kms-spbe.go.id
Subject: "Data Privacy Request - [NIP]"
Data Retention:
Data Type	Retention
Account data	While account active + 90 days
Activity logs	1 year
Content	Indefinite (business requirement)
Backups	12 months

Data Security:

    Encrypted at rest & in transit
    Access control (need-to-know basis)
    Regular security audits
    Incident response plan

Apa yang harus dilakukan jika akun saya di-hack?

Jawaban:

IMMEDIATE ACTIONS:

1. Change Password (jika masih bisa login)
Dashboard → Security → Change Password
2. Revoke All Sessions
Dashboard → Security → Active Sessions → Revoke All
3. Enable MFA (jika belum)
Dashboard → Security → Enable MFA
4. Contact Support ASAP
Emergency Email: security@kms-spbe.go.id
Subject: "URGENT: Account Compromised - [NIP]"

Include:
- Your name & NIP
- When you noticed
- What suspicious activity
- What you've done
5. Check Activity Log
Dashboard → Activity → View All

Look for:
- Unknown login locations
- Unusual access patterns
- Unauthorized changes
ADMIN WILL:

    ✅ Lock your account temporarily
    ✅ Investigate the breach
    ✅ Reset your password
    ✅ Audit what was accessed
    ✅ Restore from backup if needed
    ✅ Enable enhanced monitoring

PREVENTION:

    🔒 Use unique, strong password
    🔒 Enable MFA
    🔒 Don't click suspicious links
    🔒 Don't share credentials
    🔒 Use secure network (avoid public WiFi)
    🔒 Keep software updated

Report Template:
TO: security@kms-spbe.go.id
SUBJECT: Account Compromised - [NIP]

Nama: [Nama Lengkap]
NIP: [NIP]
Email: [Email]
Unit Kerja: [Unit]

Kronologi:
- [Tanggal/Waktu]: Noticed suspicious login notification
- [Tanggal/Waktu]: Tried to login, password changed
- [Tanggal/Waktu]: Contacted support

Suspicious Activity:
- Login from unknown location (IP: xxx.xxx.xxx.xxx)
- Password changed without my knowledge
- [Activity lainnya]

Action Taken:
- [X] Email changed (if still can)
- [ ] Password changed (can't login)
- [X] Reported to supervisor
- [X] Reported to security team

Contact:
Phone: [Nomor HP]
Alt Email: [Email alternatif]
Teknis
Browser apa yang didukung?

Jawaban:

Fully Supported:
Browser	Minimum Version	Status
Google Chrome	90+	✅ Recommended
Mozilla Firefox	88+	✅ Fully supported
Microsoft Edge	90+	✅ Fully supported
Safari	14+	✅ Fully supported

Partially Supported:
Browser	Version	Limitations
Internet Explorer	ANY	❌ NOT supported
Opera	76+	⚠️ Not tested, may work
Brave	Latest	⚠️ May need shield adjustment

Mobile Browsers:
Browser	Status
Chrome Mobile	✅ Fully supported
Safari iOS	✅ Fully supported
Firefox Mobile	✅ Fully supported
Samsung Internet	⚠️ Mostly working

Recommendations:

For best experience:

    💻 Desktop: Chrome or Edge
    📱 Mobile: Chrome or Safari
    🔄 Keep browser updated
    🍪 Enable cookies
    📜 Enable JavaScript

Kenapa website lambat?

Jawaban:

Possible Causes:

1. Internet Connection

Check your internet:
# Test speed
speedtest.net

# Minimum recommended:
Download: 5 Mbps
Upload: 1 Mbps
Latency: < 100ms
2. Browser Cache

Clear cache:
Chrome: Ctrl+Shift+Del
Firefox: Ctrl+Shift+Del
Edge: Ctrl+Shift+Del

Select:
- Cached images and files
- Cookies
Time range: Last 24 hours or All time
3. Too Many Tabs

    Close unnecessary tabs
    Restart browser

4. Browser Extensions

    Disable ad blockers temporarily
    Disable unnecessary extensions

5. Server Load

Check status:
3. Too Many Tabs

    Close unnecessary tabs
    Restart browser

4. Browser Extensions

    Disable ad blockers temporarily
    Disable unnecessary extensions

5. Server Load

Check status:
https://status.kms-spbe.vercel.app
If server issue:

    Server maintenance (scheduled)
    High traffic
    Technical issue

6. Large Documents

Documents with:

    Many images
    Large tables
    Code blocks
    Videos

May load slower. Try:

    Enable "Reader Mode"
    Download PDF version

Optimization Tips:

✅ Use latest browser
✅ Enable hardware acceleration
✅ Close unused tabs
✅ Clear cache regularly
✅ Use wired connection (if possible)
✅ Disable auto-play videos

Still slow?

Report to support:
Email: support@kms-spbe.go.id

Include:
- Your browser & version
- Your internet speed
- Specific page that's slow
- Screenshot of Network tab (F12)
Bagaimana cara melaporkan bug?

Jawaban:

Bug Reporting Process:

1. Check if it's really a bug

    Try refresh page (F5)
    Try clear cache (Ctrl+Shift+Del)
    Try different browser
    Try incognito mode
    Check if others have same issue

2. Gather information

Collect:

    ✅ What you were doing
    ✅ What you expected
    ✅ What actually happened
    ✅ Error message (screenshot)
    ✅ Browser & version
    ✅ Steps to reproduce

3. Report via:

Option A: Bug Report Form

https://kms-spbe.vercel.app/support/bug-report

Option B: Email
Option B: Email

text

TO: bugs@kms-spbe.go.id
SUBJECT: [BUG] Brief description

Template:
---------
Bug Description:
[What's wrong]

Steps to Reproduce:
1. Go to [URL]
2. Click [button]
3. See error

Expected Behavior:
[What should happen]

Actual Behavior:
[What actually happens]

Environment:
- Browser: Chrome 120
- OS: Windows 11
- Screen: 1920x1080
- User Role: Editor

Screenshots:
[Attach screenshots]

Additional Context:
[Any other info]

4. Priority Levels

We categorize bugs as:
Level	Description	Response Time
Critical	System down, data loss	< 1 hour
High	Major feature broken	< 4 hours
Medium	Feature partially broken	< 1 day
Low	Minor UI issue	< 1 week

5. Tracking

You'll receive:

    Ticket number
    Email confirmations
    Status updates
    Resolution notification

Example Bug Report:

text

SUBJECT: [BUG] Search not working on mobile

Bug Description:
Search functionality tidak bekerja pada mobile browser. 
Ketika saya ketik dan klik "Search", tidak ada yang terjadi.

Steps to Reproduce:
1. Buka https://kms-spbe.vercel.app di Chrome Mobile
2. Tap search bar
3. Ketik "spbe"
4. Tap "Search" button
5. No results shown, page tidak berubah

Expected Behavior:
Seharusnya menampilkan hasil pencarian

Actual Behavior:
Tidak ada response, page tetap sama

Environment:
- Browser: Chrome Mobile 120.0.6099.144
- OS: Android 13
- Device: Samsung Galaxy S23
- Screen: 1080x2340
- User Role: User
- Logged in: Yes

Screenshots:
[Attach before & after screenshots]

Console Errors (from Chrome DevTools):
Uncaught TypeError: Cannot read property 'value' of null
    at SearchBar.jsx:45

Additional Context:
Ini terjadi sejak update kemarin. Sebelumnya search berfungsi normal.
Desktop search masih berfungsi dengan baik.

Network Tab shows:
- GET /api/search?q=spbe → 200 OK
But results not rendering

Contact:
Nama: [Nama]
Email: [Email]
Phone: [Phone]
Preferred contact time: 08:00-17:00 WIB

Follow-up:

    Check email for ticket number
    Reply to any questions from dev team
    Test the fix when deployed
    Confirm bug is resolved

Administrasi
Bagaimana cara mengajukan penambahan konten?

Jawaban:

Jika Anda Editor/Admin:

Anda bisa langsung create content:

text

Dashboard → Content → Create New

Jika Anda User (tidak punya Editor access):

Submit content request:

1. Via Content Request Form

text

Dashboard → Requests → Request New Content

2. Isi Form:

YAML

Type: Guide/Policy/SOP/Template
Title: [Judul konten yang diminta]
Description: [Penjelasan konten yang dibutuhkan]
Priority: High/Medium/Low
Justification: [Mengapa konten ini diperlukan]
Target Date: [Kapan dibutuhkan]
References: [Link/dokumen referensi jika ada]

3. Attach Documents (optional)

    Draft content
    Reference materials
    Supporting documents

4. Submit

5. Tracking:

text

Dashboard → Requests → My Requests

Status:
- ⏳ Pending Review
- 👀 Under Review
- ✅ Approved - In Progress
- ❌ Rejected (dengan alasan)
- ✔️ Completed

Timeline:

    Review: 3-5 hari kerja
    Development: 1-2 minggu (tergantung kompleksitas)
    Review & Publish: 3-5 hari kerja

Total: ~3-4 minggu

Alternative:

Jika urgent dan Anda punya draft:

    Request Editor role (if eligible)
    Upload content yourself after training
    Submit for review
    Faster turnaround

Bagaimana cara request akses ke konten restricted?

Jawaban:

Why Restricted:

Konten restricted biasanya:

    🔒 Sensitive information
    🔒 Confidential data
    🔒 Admin-only procedures
    🔒 Draft/unreleased content

Request Access Process:

1. Find the document

Navigate to restricted document (you'll see "Access Denied")

2. Click "Request Access"

3. Fill Request Form:

YAML

Document: [Auto-filled]
Reason: [Why you need access]
Usage: [How you will use it]
Duration: [How long you need access]
Supervisor Approval: [Required]

4. Get Supervisor Approval

Email will be sent to your supervisor:

    Supervisor clicks approve/reject
    If approved, request goes to admin

5. Admin Review

Admin will:

    Review your justification
    Verify supervisor approval
    Check your role & need-to-know
    Approve/reject within 3 days

6. Notification

You'll receive email:

    ✅ Approved → Can access immediately
    ❌ Rejected → Reason provided

Access Duration:

Temporary access:

    30 days default
    Can be extended
    Auto-revoked after period

Permanent access:

    Requires strong justification
    For specific roles only

Tips for Approval:

✅ Be specific about why you need it
✅ Explain how it relates to your work
✅ Provide project context
✅ Get supervisor buy-in first

Example Request:

text

Document: "SOP Disaster Recovery Plan"

Reason:
Saya ditugaskan sebagai backup admin untuk project 
migrasi server. Saya perlu memahami prosedur disaster 
recovery untuk memastikan continuity jika terjadi masalah 
saat migrasi.

Usage:
- Study prosedur
- Prepare backup plan
- Document risk mitigation
- Training team

Duration:
60 days (duration of migration project)

Supervisor Approval:
Pak [Nama Supervisor] sudah approve via email
(CC: [email supervisor])

Project Reference:
Project "Migrasi Server 2024" 
SK Nomor: [SK Number]
Timeline: Feb - Apr 2024

Contact:
[Your name]
[Phone]
[Email]

Kontak & Dukungan
Bagaimana cara menghubungi support?

Jawaban:

Support Channels:

1. Email Support

General inquiries:

text

📧 support@kms-spbe.go.id
⏰ Response time: 1x24 jam

Technical issues:

text

📧 tech@kms-spbe.go.id
⏰ Response time: 4 jam (jam kerja)

Security issues:

text

📧 security@kms-spbe.go.id
⏰ Response time: 1 jam (critical)

2. Phone Support

text

📞 021-1234-5678 ext. 100
⏰ Senin-Jumat, 08:00-17:00 WIB

3. WhatsApp

text

💬 +62 812-3456-7890
⏰ Senin-Jumat, 08:00-17:00 WIB

4. Helpdesk Portal

text

🌐 https://kms-spbe.vercel.app/support
- Submit ticket
- Track ticket status
- Knowledge base
- Live chat (jam kerja)

5. Community Forum

text

💬 https://forum.kms-spbe.go.id
- Ask community
- Share knowledge
- Feature requests
- Discussions

6. Social Media

text

🐦 Twitter: @kms_spbe
📘 Facebook: /kms.spbe
📸 Instagram: @kms.spbe

Emergency (After Hours):

For critical system downtime only:

text

📞 On-call Admin: +62 813-9999-8888

Tips for Quick Response:

✅ Use email for non-urgent
✅ Use phone/WhatsApp for urgent
✅ Include your NIP & contact info
✅ Be specific about the issue
✅ Attach screenshots if possible
Di mana saya bisa memberikan feedback?

Jawaban:

We LOVE feedback! 💙

Feedback Channels:

1. Feedback Form

text

https://kms-spbe.vercel.app/feedback

Categories:
- 🐛 Bug report
- ✨ Feature request
- 💬 General feedback
- 😊 Compliment
- 😞 Complaint

2. Survey

Quarterly satisfaction survey:

    Sent via email
    5-10 minutes
    Anonymous
    Prize for participants

3. User Testing

Volunteer for:

    New feature testing
    UI/UX feedback
    Beta testing
    Focus group discussions

text

Sign up: testing@kms-spbe.go.id

4. Feature Requests

text

Dashboard → Feedback → Request Feature

Template:
---------
Feature Title: [Short title]

Problem:
[What problem does this solve?]

Proposed Solution:
[How should it work?]

Use Case:
[Who will use it? How often?]

Priority:
[Must have / Nice to have]

Alternative:
[Any workaround currently?]

References:
[Examples from other systems?]

5. Rate Your Experience

After each interaction:

    Support ticket resolution
    Content viewing
    Feature usage

Quick rating: ⭐⭐⭐⭐⭐

Impact of Your Feedback:

✅ Bug reports → Fixed in next release
✅ Feature requests → Evaluated for roadmap
✅ UX feedback → Continuous improvement
✅ Compliments → Motivates our team!

Feedback Statistics:

text

Dashboard → Community → Feedback Stats

See:
- Top requested features
- Fixed bugs
- In development
- Your feedback history

Panduan & Training
Apakah ada training untuk pengguna baru?

Jawaban:

YES! We provide training for all users.

Training Programs:

1. User Training (Basic)

Target: All users
Duration: 2 hours
Mode: Online/On-site
Content:

    ✅ Navigation
    ✅ Search techniques
    ✅ Access documents
    ✅ Bookmark & organize
    ✅ Q&A

Schedule: Monthly (first Wednesday)
Registration: training@kms-spbe.go.id
Cost: FREE

2. Editor Training

Target: Content creators
Duration: 1 day (8 hours)
Mode: On-site (Jakarta)
Content:

    ✅ Content creation
    ✅ Markdown formatting
    ✅ Metadata & SEO
    ✅ Review process
    ✅ Best practices
    ✅ Hands-on practice

Schedule: Quarterly
Registration: Required
Cost: FREE
Mandatory for Editor role

3. Admin Training

Target: System administrators
Duration: 2 days (16 hours)
Mode: On-site
Content:

    ✅ User management
    ✅ Content management
    ✅ Analytics & reporting
    ✅ Security & compliance
    ✅ Troubleshooting
    ✅ System configuration
