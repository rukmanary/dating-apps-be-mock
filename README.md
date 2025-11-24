# Dating Apps Backend – Mock Profiles API

Node.js + Express.js REST API yang menyediakan **100 mock data profil perempuan** dengan foto real dari Unsplash, siap digunakan untuk simulasi dating app.

## Fitur
- 100 profil unik: nama, usia, pekerjaan, jarak, bio, minat, foto hijabi real, status match
- Pagination berbasis halaman (page-based) dengan metadata lengkap
- Foto profil real dari Unsplash (hijabi girls, 400×400, quality 80)
- Response JSON clean & frontend-friendly
- Kode modular: routes → controllers → services → data

## Instalasi & Menjalankan
```bash
# clone / pastikan berada di root project
npm install

# jalankan server
npm start     # production
npm run dev   # auto-reload dengan nodemon
```
Server berjalan di `http://localhost:3000`

## Endpoint
### `GET /api/profiles`
Mengambil daftar profil dengan pagination.

#### Query Parameters
| Param     | Type | Default | Description |
|-----------|------|---------|-------------|
| per_page  | int  | 10      | Jumlah item per halaman (max 50) |
| page      | int  | 1       | Nomor halaman yang diminta |

#### Contoh Request
```http
GET /api/profiles?per_page=10&page=1
```

#### Contoh Response (200 OK)
```json
{
  "data": [
    {
      "id": "p0001",
      "name": "Aisyah Rahmawati",
      "age": 24,
      "job": "Product Manager",
      "distanceKm": 8,
      "bio": "Pecinta kopi, cari teman ngobrol dan petualangan.",
      "interests": ["Coffee", "Travel", "Movies", "Yoga"],
      "photo": "https://images.unsplash.com/photo-1589578235219-5890e7a8b9b2?auto=format&fit=crop&w=400&q=80",
      "match": false
    },
    ... 9 item lagi
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total_pages": 10,
    "total_items": 100,
    "next_page": 2,
    "prev_page": null,
    "hasMore": true
  }
}
```

#### Response Fields
**data[]**
- `id` (string) – unique identifier
- `name` (string) – nama lengkap perempuan
- `age` (number) – 18..60
- `job` (string) – 20 pilihan pekerjaan populer
- `distanceKm` (number) – jarak 1..30 km
- `bio` (string) – kalimat pendek + minat
- `interests` (string[]) – 3..6 minat acak
- `photo` (string) – URL foto hijabi real (Unsplash)
- `match` (boolean) – true ≈ 25 %

**pagination**
- `current_page` – halaman aktif
- `per_page` – item per halaman
- `total_pages` – total halaman tersedia
- `total_items` – total item (100)
- `next_page` – nomor halaman berikutnya (null jika tidak ada)
- `prev_page` – nomor halaman sebelumnya (null jika tidak ada)
- `hasMore` – true bila masih ada halaman berikutnya

## Arsitektur Folder
```
src/
├── data/
│   └── profiles.js        # 100 mock data + generator
├── services/
│   └── profilesService.js # logika pagination
├── controllers/
│   └── profilesController.js # validasi query
├── routes/
│   └── profiles.js        # definisi endpoint
├── app.js                 # setup Express & error handler
└── server.js              # bootstrap & listen
```

## Teknologi
- Node.js ≥ 18
- Express.js 5.x
- Nodemon (dev)

## Lisensi
Bebas digunakan untuk keperluan pribadi / edukasi.

## Kontribusi & Request Fitur
Silakan buka issue atau PR jika ingin menambah filter (usia, jarak, minat), sorting, atau autentikasi.