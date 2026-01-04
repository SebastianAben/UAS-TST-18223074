# User Management Microservice (UAS TST)

Project ini merupakan implementasi Microservice User Management sederhana yang menyediakan API RESTful untuk pengelolaan data pengguna (CRUD). Dikembangkan menggunakan Node.js dan Express, service ini menggunakan SQLite sebagai media penyimpanan data agar ringan dan dapat berjalan secara mandiri tanpa memerlukan setup database server tambahan.


## Tech Stack
- **Node.js** (v18 Alpine) - Runtime environment.
- **Express.js** - Web framework untuk API.
- **SQLite + Sequelize** - Database engine dan ORM.
- **Docker & Docker Compose** - Untuk containerization dan deployment.

## Panduan Penggunaan

### 1. Menggunakan Docker (Rekomendasi)
Pastikan Docker Engine sudah berjalan di sistem Anda, kemudian gunakan perintah berikut:

```bash
docker compose up --build
```
Setelah proses build selesai, server akan berjalan dan dapat diakses melalui port **1234**.

### 2. Menggunakan Instalasi Lokal
Jika ingin menjalankan secara manual tanpa Docker:

```bash
npm install
node server.js
```

## API Endpoints
Base URL: `http://localhost:1234`

| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/users` | Mengambil seluruh data pengguna. |
| `GET` | `/users/:id` | Mengambil detail pengguna berdasarkan ID. |
| `POST` | `/users` | Membuat data pengguna baru. |
| `PUT` | `/users/:id` | Memperbarui data pengguna berdasarkan ID. |
| `DELETE` | `/users/:id` | Menghapus data pengguna berdasarkan ID. |

### Contoh Request Body
Format data JSON untuk method `POST` dan `PUT`:
```json
{
  "username": "johndoe",
  "password": "secretpassword",
  "fullName": "John Doe",
  "email": "john@email.com"
}
```

## Informasi Tambahan

*   **Auto-Seeding**: Saat aplikasi dijalankan pertama kali dengan kondisi database kosong, sistem akan secara otomatis mengisi database dengan **5 data pengguna awal** (termasuk akun Administrator dan Guest). 
*   **Persistensi Data**: Database disimpan dalam file `database.sqlite` di direktori utama. Melalui konfigurasi *Volume* pada Docker, data akan tetap tersimpan secara persisten meskipun container dimatikan atau dijalankan ulang. Untuk mereset database ke kondisi awal, Anda dapat menghapus file `database.sqlite` secara manual sebelum menjalankan ulang server.