# Environment Setup (Ubuntu) – Tanpa dotenv

Dokumentasi cara menjalankan aplikasi Node.js ini di VPS Ubuntu tanpa paket dotenv. Semua konfigurasi dibaca dari environment `process.env`.

## Prasyarat
- Node.js ≥ 18 terpasang
- Akses shell ke VPS Ubuntu
- File `.env` sudah dibuat di root project berdasarkan `.env.example`

## Jalankan di Shell Interaktif (Sesi Sementara)
Gunakan `set -a && source .env && set +a` untuk mengekspor semua variabel dari `.env` ke sesi shell saat ini.

```bash
cd /path/to/dating-apps
set -a && source .env && set +a && npm run dev
# atau untuk production
set -a && source .env && set +a && npm start
```

Kelebihan: aman untuk nilai mengandung spasi/karakter khusus karena `source` membaca menurut aturan shell.

## Jalankan Sekali Jalan (One-shot)
Untuk eksekusi sekali jalan tanpa mengubah sesi shell:

```bash
cd /path/to/dating-apps
env $(grep -v '^#' .env | xargs) npm run dev
# atau
env $(grep -v '^#' .env | xargs) npm start
```

Catatan: gunakan ini hanya jika nilai variabel tidak mengandung spasi kompleks. Jika memiliki spasi/karakter khusus, lebih aman pakai metode interaktif di atas.

## Jalankan Sebagai Service (systemd)
Rekomendasi untuk production adalah membuat systemd unit agar proses otomatis berjalan dan restart jika gagal.

1) Buat service file, contoh `/etc/systemd/system/dating-apps.service`:

```ini
[Unit]
Description=Dating Apps Backend
After=network.target

[Service]
Type=simple
WorkingDirectory=/path/to/dating-apps
EnvironmentFile=/path/to/dating-apps/.env
ExecStart=/usr/bin/node src/server.js
Restart=always
RestartSec=5
User=www-data
Group=www-data

[Install]
WantedBy=multi-user.target
```

2) Reload dan jalankan:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now dating-apps
sudo systemctl status dating-apps
```

Log aplikasi dapat dilihat dengan:

```bash
journalctl -u dating-apps -f
```

## Jalankan Dengan PM2 (Opsional)
Jika menggunakan PM2, Anda tetap tidak butuh dotenv. Anda bisa mengekspor environment sebelum start atau menaruhnya di ecosystem config.

Ekspor sementara lalu start:

```bash
cd /path/to/dating-apps
set -a && source .env && set +a
pm2 start src/server.js --name dating-apps
pm2 save
pm2 status
```

## Format .env yang Aman
- Gunakan tanda kutip untuk nilai dengan spasi atau karakter khusus.
- `FIREBASE_PRIVATE_KEY` harus memakai newline yang di-escape (`\n`). Contoh:

```bash
PORT=3000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nREPLACE_WITH_YOUR_KEY\n-----END PRIVATE KEY-----\n"
```

Backend akan mengubah `\n` menjadi newline aktual sebelum verifikasi token.

## Troubleshooting
- Pastikan file `.env` dapat dibaca oleh user yang menjalankan proses.
- Jika `idToken` Firebase ditolak, periksa `FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY`.
- Jika upload gagal karena ukuran, pastikan file ≤ 2MB per file.
- Untuk akses file statis, gunakan URL `/uploads/users/:id/photos/<filename>`.

