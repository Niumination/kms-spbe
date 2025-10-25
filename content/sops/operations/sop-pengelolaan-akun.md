---
title: SOP Pengelolaan Akun Pengguna
description: Standard Operating Procedure untuk pengelolaan akun pengguna KMS SPBE
author: Tim IT KMS SPBE
tags:
  - sop
  - user-management
  - operations
  - access-control
category: sops
access_level: internal
content_type: sop
created_at: 2024-01-20
---

# SOP Pengelolaan Akun Pengguna

## 1. Tujuan
Mengatur prosedur pembuatan, modifikasi, dan penghapusan akun pengguna dalam sistem KMS SPBE.

## 2. Ruang Lingkup
SOP ini berlaku untuk:
- Admin sistem
- Help desk
- User baru yang mengajukan akun

## 3. Referensi
- Kebijakan Keamanan Informasi
- Panduan Manajemen Akses
- ISO 27001:2013

## 4. Definisi
- **User**: Pengguna sistem KMS SPBE
- **Admin**: Administrator sistem dengan hak akses penuh
- **Role**: Tingkat akses yang diberikan kepada user

## 5. Prosedur Pembuatan Akun Baru

### 5.1 Pengajuan
1. User mengisi form registrasi di https://kms-spbe.vercel.app/auth/register
2. Form minimal berisi:
   - Nama lengkap
   - Email instansi (.go.id)
   - NIP
   - Unit kerja
   - Justifikasi penggunaan

### 5.2 Verifikasi
1. Admin menerima notifikasi pengajuan
2. Admin verifikasi:
   - ✓ Email valid (.go.id)
   - ✓ NIP terdaftar di database kepegawaian
   - ✓ Unit kerja valid
   - ✓ Justifikasi memadai

### 5.3 Approval
**Jika disetujui:**
1. Admin set role sesuai kebutuhan:
   - `user`: Akses read-only
   - `editor`: Akses read + create/edit content
   - `admin`: Full access

2. Sistem auto-send email aktivasi ke user
3. User klik link aktivasi dalam 24 jam
4. User set password
5. Akun aktif

**Jika ditolak:**
1. Admin berikan alasan penolakan
2. Sistem send email notifikasi ke user
3. User dapat mengajukan ulang setelah 7 hari

### 5.4 Timeline
- Verifikasi: Max 1x24 jam
- Aktivasi user: Max 1x24 jam setelah approval
- Total: Max 2x24 jam

## 6. Prosedur Modifikasi Akun

### 6.1 Perubahan Data Profil
**User dapat mengubah sendiri:**
- Nama lengkap
- Nomor telepon
- Foto profil
- Preferensi notifikasi

**Perlu approval admin:**
- Email
- NIP
- Unit kerja
- Role

### 6.2 Reset Password
**Self-service:**
1. User klik "Lupa Password"
2. Input email
3. Sistem send reset link
4. User klik link (valid 1 jam)
5. User set password baru

**By admin:**
1. User request ke helpdesk
2. Admin verify identitas
3. Admin reset password
4. Sistem send temporary password
5. User wajib ganti password di login pertama

### 6.3 Perubahan Role
1. User atau atasan submit request perubahan role
2. Admin review justifikasi
3. Jika approved:
   - Admin update role
   - Log perubahan dicatat
   - User dapat notifikasi
4. User logout dan login ulang untuk apply role baru

## 7. Prosedur Penonaktifan Akun

### 7.1 Penonaktifan Sementara
**Kondisi:**
- User cuti panjang
- User dipindahtugaskan sementara
- Investigasi keamanan

**Prosedur:**
1. Admin terima request penonaktifan
2. Admin set status akun: `suspended`
3. User tidak bisa login
4. Data tetap tersimpan
5. Akun dapat diaktifkan kembali

### 7.2 Penonaktifan Permanen
**Kondisi:**
- User resign/pensiun
- User pindah instansi
- Pelanggaran kebijakan

**Prosedur:**
1. Admin terima pemberitahuan resmi
2. Admin backup data user:
   - Konten yang dibuat
   - Activity logs
   - Bookmarks
3. Admin set status: `deactivated`
4. Setelah 90 hari, data dapat dihapus permanen
5. Email notifikasi ke user (jika resign normal)

### 7.3 Penghapusan Akun (GDPR Compliance)
**User dapat request penghapusan data:**
1. User submit "Right to be Forgotten" request
2. Admin verify identitas
3. Admin hapus data:
   - Personal information
   - Activity logs
   - Uploaded content (jika bukan official document)
4. Data terhapus permanen dalam 30 hari
5. Konfirmasi penghapusan dikirim ke user

## 8. Monitoring dan Audit

### 8.1 Aktivitas yang Dilog
- Login/logout
- Perubahan password
- Perubahan role
- Akses ke konten restricted
- Failed login attempts

### 8.2 Review Berkala
**Monthly:**
- List inactive accounts (>30 hari tidak login)
- Failed login attempts analysis

**Quarterly:**
- Role assignment review
- Access rights audit

**Yearly:**
- Full account audit
- Policy compliance check

### 8.3 Alert Conditions
- 5 failed login dalam 15 menit → Account locked
- Login dari IP asing → Email verification
- Akses konten restricted → Log + notify admin
- Perubahan data profil → Email confirmation

## 9. Security Measures

### 9.1 Password Policy
- Minimal 12 karakter
- Kombinasi huruf besar, kecil, angka, simbol
- Tidak boleh sama dengan 3 password sebelumnya
- Expired setiap 90 hari (untuk admin: 60 hari)
- Tidak boleh mengandung nama, NIP, atau email

### 9.2 Multi-Factor Authentication (MFA)
**Mandatory untuk:**
- Admin
- Editor
- Akses dari luar jaringan instansi

**Optional untuk:**
- User biasa dalam jaringan instansi

**Metode MFA:**
- TOTP (Google Authenticator, Authy)
- Email OTP
- SMS OTP (untuk akun tertentu)

### 9.3 Session Management
- Session timeout: 30 menit inaktivitas
- Max concurrent sessions: 2
- Logout otomatis di akhir jam kerja (optional)

## 10. Troubleshooting

### 10.1 Account Locked
**Penyebab:**
- 5x failed login
- Suspicious activity detected

**Solusi:**
1. User hubungi helpdesk
2. Admin verify identitas via telpon
3. Admin unlock account
4. User reset password

### 10.2 Email Tidak Diterima
**Checklist:**
1. ✓ Check spam folder
2. ✓ Verify email address correct
3. ✓ Check email server status
4. ✓ Whitelist domain: kms-spbe.vercel.app

### 10.3 Tidak Bisa Login Setelah Password Reset
**Solusi:**
1. Clear browser cache
2. Try incognito mode
3. Try different browser
4. Contact helpdesk

## 11. Escalation Path

**Level 1: User Self-Service**
- Reset password
- Update profil
- FAQ/Knowledge base

**Level 2: Helpdesk**
- Account unlock
- General inquiries
- Basic troubleshooting

**Level 3: Admin**
- Role changes
- Account approval
- Security incidents

**Level 4: IT Manager**
- Policy violations
- Major security breaches
- System-wide issues

## 12. Kontak

**Helpdesk:**
- Email: helpdesk@kms-spbe.go.id
- Phone: 021-1234-5678 ext. 100
- WhatsApp: +62 812-3456-7890
- Jam operasional: Senin-Jumat, 08:00-17:00 WIB

**Emergency (After Hours):**
- On-call admin: +62 813-9999-8888

## 13. Form dan Template

### 13.1 Form Pengajuan Akun
[Link: Form Pengajuan Akun]

### 13.2 Form Perubahan Role
[Link: Form Perubahan Role]

### 13.3 Form Penonaktifan Akun
[Link: Form Penonaktifan]

## 14. Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2024-01-20 | Initial release | Tim IT |
| 1.1 | TBD | - | - |

---

**Approved by:**
- IT Manager: _______________
- Security Officer: _______________
- Head of Department: _______________

**Effective Date:** 20 Januari 2024
**Next Review:** 20 Juli 2024
