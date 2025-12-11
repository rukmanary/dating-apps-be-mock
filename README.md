# Dating Apps Backend – API

Node.js + Express.js REST API untuk simulasi dating app: login via Firebase, manajemen user, upload photos, dan mock profiles.

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

### Environment Variables

Salin `.env.example` menjadi `.env` lalu isi nilai sesuai Firebase project Anda. Jika tidak menggunakan loader `.env`, jalankan dengan mengekspor environment variables pada shell.

```bash
# cara aman di Ubuntu (tanpa dotenv)
set -a && source .env && set +a && npm start
```

## Endpoint

### Auth

`POST /api/auth/firebase`

Body (JSON):

```json
{
  "idToken": "<firebase_id_token>",
  "accessToken": "<social_access_token>",
  "name": "Nama Awal",
  "email": "user@example.com",
  "provider": "google"
}
```

Response (200):

```json
{
  "success": true,
  "user": {
    /* objek user */
  },
  "token_id": 12
}
```

`POST /api/auth/session`

Body (JSON):

```json
{ "name": "Nama Awal", "email": "user@example.com" }
```

Response (200):

```json
{
  "success": true,
  "token_id": 42,
  "token": "<64-hex>",
  "user_id": 123
}
```

### Users (Protected: `Authorization: Bearer <token>`)

`GET /api/users/:id`

`PATCH /api/users/:id`

Content-Type yang didukung:

- `application/json` (disarankan)
- `application/x-www-form-urlencoded` (untuk klien sederhana)

Field yang didukung untuk PATCH: `name`, `email`, `phone_number`, `is_verified` (boolean), `date_of_birth` (ISO date), `age`, `gender`, `favorite_spot`, `interest` (array), `distance_preference`, `photos` (array path)

Contoh update bertahap (JSON):

````http
PATCH /api/users/123
Authorization: Bearer <token>
Content-Type: application/json

{ "name": "Nama Baru" }

Contoh update bertahap (x-www-form-urlencoded):

```http
PATCH /api/users/123
Authorization: Bearer <token>
Content-Type: application/x-www-form-urlencoded

name=Nama%20Baru&is_verified=true&interest[]=hiking&interest[]=coffee
````

Catatan:

- Array dikirim dengan `interest[]` berulang.
- Boolean dikirim sebagai string (`true`/`false`).

````

### Photos (Protected)

`POST /api/users/:id/photos`

Form-data:

- Field: `photos` (multiple files)
- Tipe: JPG, JPEG, PNG; max 2MB/file

Response (201):

```json
{ "success": true }
```

Static files tersedia di: `/uploads/users/:id/photos/<filename>`
`GET /api/profiles`
Mengambil daftar profil dengan pagination.

#### Query Parameters

| Param    | Type | Default | Description                      |
| -------- | ---- | ------- | -------------------------------- |
| per_page | int  | 10      | Jumlah item per halaman (max 50) |
| page     | int  | 1       | Nomor halaman yang diminta       |

#### Contoh Request

```http
GET /api/profiles?per_page=10&page=1
```

#### Contoh Response (200 OK)

```json
{
  "success": true,
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
│   ├── profilesController.js # validasi query
│   ├── authController.js     # auth firebase
│   ├── usersController.js    # get/patch user
│   └── photosController.js   # upload photos
├── routes/
│   ├── profiles.js        # /api/profiles
│   ├── auth.js            # /api/auth
│   ├── users.js           # /api/users
│   └── photos.js          # /api/users/:id/photos
├── middlewares/
│   └── authSession.js     # Bearer session token
├── config/
│   └── firebase.js        # verify idToken
├── db/
│   └── index.js           # SQLite schema
├── app.js                 # setup Express & static uploads
└── server.js              # bootstrap & listen
```

## Teknologi

- Node.js ≥ 18
- Express.js 5.x
- Firebase Admin SDK
- SQLite (better-sqlite3)
- Multer (upload)
- Nodemon (dev)

## Lisensi

Bebas digunakan untuk keperluan pribadi / edukasi.

## Cara Pakai di Postman

- Buat Postman Environment: `baseUrl`, `token`, `userId`
- Langkah uji (Session):
  1. Auth – `POST {{baseUrl}}/api/auth/session` body `{ "name": "Nama", "email": "user@example.com" }`
  2. Salin `token` dan `user_id` dari response ke environment (`token`, `userId`)
  3. GET User – `GET {{baseUrl}}/api/users/{{userId}}` dengan Header `Authorization: Bearer {{token}}`
  4. Update Bertahap – `PATCH {{baseUrl}}/api/users/{{userId}}` kirim partial body sesuai langkah
  5. Upload Photos – `POST {{baseUrl}}/api/users/{{userId}}/photos` (form-data) dengan Header `Authorization: Bearer {{token}}`
  6. Tampilkan Foto – ambil array `user.photos[]` dari `GET /api/users/{{userId}}` dan render menggunakan `{{baseUrl}}` + path
- Alternatif (Firebase): gunakan `POST /api/auth/firebase` bila ingin verifikasi idToken dan kirim Bearer `idToken` jika rute dilindungi Firebase.

## Flow Registrasi

- Opsi 1 (Session): Panggil `POST /api/auth/session` → backend membuat user/token, simpan `token` di client
- Opsi 2 (Firebase): Client login via Firebase → `POST /api/auth/firebase` untuk verifikasi dan membuat user
- Client memaksa user melengkapi profil secara bertahap:
  - Step 1 isi `name` → `PATCH /api/users/:id`
  - Step 2 isi `date_of_birth` + `age` → `PATCH /api/users/:id`
  - Step 3 isi `gender`, `favorite_spot`, `interest[]`, `distance_preference`
  - Step 4 upload photos → `POST /api/users/:id/photos` → path foto tersimpan ke `user.photos[]`
- Jika user batal di tengah, data partial tetap tersimpan dan bisa dilanjutkan saat retry (client ambil initial value via `GET /api/users/:id`)

## Catatan

- Semua endpoint protected perlu Header `Authorization: Bearer <token>` (session) atau `Authorization: Bearer <idToken>` (Firebase jika diaktifkan)
- `interest` dan `photos` diretur berupa array di response
- Semua response menyertakan key `success` (boolean)
````
