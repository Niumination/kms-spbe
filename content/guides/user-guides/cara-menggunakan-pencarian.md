---
title: Cara Menggunakan Fitur Pencarian
description: Panduan lengkap menggunakan fitur pencarian untuk menemukan dokumen dengan cepat
author: Tim KMS SPBE
tags:
  - search
  - tutorial
  - user-guide
category: guides
access_level: public
content_type: guide
created_at: 2024-01-20
---

# Cara Menggunakan Fitur Pencarian

## Pengenalan

Fitur pencarian di KMS SPBE menggunakan teknologi Lunr.js yang memungkinkan pencarian cepat dan akurat di seluruh dokumen.

## Pencarian Dasar

### 1. Pencarian Sederhana
Cukup ketik kata kunci di search bar:
spbe
Sistem akan mencari semua dokumen yang mengandung kata "spbe"

### 2. Pencarian Multiple Words
implementasi spbe 2024
Mencari dokumen yang mengandung salah satu kata tersebut.

## Pencarian Lanjutan

### Operator Pencarian

#### AND Operator
spbe AND keamanan
Mencari dokumen yang mengandung KEDUA kata.

#### OR Operator
kebijakan OR peraturan
Mencari dokumen yang mengandung salah satu kata.

#### NOT Operator
spbe NOT draft
Mencari dokumen yang mengandung "spbe" tapi TIDAK mengandung "draft"

### Pencarian Frasa
Gunakan tanda kutip untuk pencarian frasa eksak:
"sistem pemerintahan berbasis elektronik"

### Wildcard
Gunakan asterisk (*) untuk mengganti karakter:
kebi*
Akan menemukan: kebijakan, kebiasaan, dll.

## Filter Pencarian

### Filter by Type
type:guide spbe
Hanya mencari di dokumen tipe "guide"

### Filter by Category
category:policies keamanan
Hanya mencari di kategori "policies"

### Filter by Date
after:2024-01-01 implementasi
Dokumen yang dibuat setelah tanggal tertentu

## Tips Pencarian Efektif

### 1. Gunakan Kata Kunci Spesifik
❌ Buruk: `dokumen`
✅ Baik: `pedoman implementasi spbe`

### 2. Manfaatkan Tags
Dokumen di KMS SPBE menggunakan tags. Cari berdasarkan tag:
tag:security

### 3. Kombinasikan Operator
(spbe OR e-government) AND (2024 OR 2023) NOT draft

### 4. Gunakan Autocomplete
Ketik beberapa huruf dan sistem akan memberikan saran.

## Hasil Pencarian

### Memahami Hasil

Setiap hasil pencarian menampilkan:
- **Title** - Judul dokumen
- **Description** - Ringkasan singkat
- **Type** - Jenis dokumen (guide/policy/sop)
- **Relevance Score** - Seberapa relevan dengan query
- **Date** - Tanggal publikasi

### Sorting
Hasil dapat diurutkan berdasarkan:
- Relevance (default)
- Date (newest/oldest)
- Title (A-Z/Z-A)

## Troubleshooting

### Tidak Menemukan Hasil?

1. **Periksa Ejaan**
   - Pastikan kata kunci dieja dengan benar

2. **Coba Kata Kunci Alternatif**
   - Gunakan sinonim atau istilah terkait

3. **Kurangi Spesifikasi**
   - Hapus beberapa filter atau operator

4. **Gunakan Wildcard**
   - Coba dengan wildcard jika tidak yakin ejaan lengkap

### Terlalu Banyak Hasil?

1. **Tambah Filter**
   - Gunakan filter type, category, atau date

2. **Gunakan AND Operator**
   - Tambah kata kunci dengan AND

3. **Gunakan Pencarian Frasa**
   - Gunakan tanda kutip untuk frasa eksak

## Keyboard Shortcuts

- `Ctrl + K` atau `Cmd + K` - Fokus ke search bar
- `Enter` - Submit pencarian
- `Esc` - Clear search
- `↑` `↓` - Navigate hasil

## Advanced Features

### Saved Searches
Simpan pencarian yang sering digunakan:
1. Lakukan pencarian
2. Klik "Save Search"
3. Beri nama
4. Akses dari sidebar

### Search History
Lihat riwayat pencarian Anda:
- Dashboard → Search History
- Klik untuk mengulang pencarian

### Search Analytics
Admin dapat melihat:
- Popular searches
- Search trends
- Zero-result searches

## Best Practices

### 1. Mulai dari General ke Specific
Step 1: spbe
Step 2: spbe keamanan
Step 3: spbe keamanan infrastruktur

### 2. Gunakan Filter Progresif
Mulai tanpa filter, tambahkan filter jika perlu.

### 3. Bookmark Hasil Penting
Jangan lakukan pencarian berulang, gunakan bookmark.

### 4. Feedback pada Hasil
Beri feedback jika hasil tidak relevan untuk meningkatkan algoritma.

## Contoh Kasus

### Kasus 1: Mencari Pedoman Terbaru
Query: pedoman after:2024-01-01
Filter: Type = Guide
Sort: Date (Newest)

### Kasus 2: Mencari Semua Kebijakan Keamanan
Query: keamanan OR security
Filter: Type = Policy, Category = Security
Sort: Relevance
### Kasus 3: Mencari Template Form
Query: template formulir
Filter: Type = Template
Sort: Title (A-Z)

## FAQ

**Q: Apakah pencarian case-sensitive?**
A: Tidak, pencarian tidak membedakan huruf besar/kecil.

**Q: Berapa lama index pencarian diupdate?**
A: Index diupdate real-time setiap ada dokumen baru.

**Q: Apakah bisa mencari di dalam PDF?**
A: Ya, konten PDF diextract dan diindex.

**Q: Maksimal berapa hasil yang ditampilkan?**
A: Default 10 hasil per halaman, dapat diubah hingga 50.

---

*Butuh bantuan lebih lanjut? Hubungi support@kms-spbe.go.id*
