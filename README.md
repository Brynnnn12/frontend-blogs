# BlogKita 📝

BlogKita adalah platform blog modern yang dibangun dengan React dan Vite. Platform ini menyediakan sistem manajemen konten lengkap dengan dashboard admin, sistem autentikasi, dan antarmuka yang responsif.

## ✨ Fitur Utama

### 🔐 Sistem Autentikasi
- **Login & Register** - Sistem autentikasi pengguna yang aman
- **Protected Routes** - Konten premium hanya dapat diakses setelah login
- **Session Management** - Manajemen sesi pengguna dengan cookies

### 🎯 Dashboard Admin
- **CRUD Posts** - Kelola artikel blog dengan editor lengkap
- **Categories Management** - Organisasi konten dengan sistem kategori
- **Roles Management** - Pengaturan peran dan akses pengguna
- **Comments Management** - Moderasi komentar dari pengguna
- **Profile Management** - Pengaturan profil pengguna

### 🌐 Frontend Blog
- **Homepage** dengan hero section menarik dan latar belakang visual
- **About Section** - Informasi tentang platform
- **Blog Carousel** - Tampilan artikel dalam format carousel yang menarik
- **Individual Blog Pages** - Halaman detail artikel dengan sistem komentar
- **Category Browsing** - Jelajahi artikel berdasarkan kategori

### 🎨 Design & UX
- **Responsive Design** - Dioptimalkan untuk semua ukuran layar
- **Modern UI** dengan tema biru dan kuning yang menarik
- **Smooth Animations** menggunakan Framer Motion
- **Loading States** dengan spinner yang elegan
- **Toast Notifications** untuk feedback pengguna

## 🛠️ Tech Stack

### Frontend Framework
- **React 19** - Library UI dengan hooks terbaru
- **Vite 6** - Build tool yang cepat dan modern
- **React Router Dom 7** - Routing dengan lazy loading

### State Management
- **Redux Toolkit** - State management yang efisien
- **React Redux** - Integrasi Redux dengan React

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI 5** - Component library untuk Tailwind
- **Framer Motion 12** - Animasi yang smooth dan performant
- **React Icons 5** - Icon library yang comprehensive

### Form & Validation
- **Formik 2** - Form management yang powerful
- **Yup 1** - Schema validation yang robust

### HTTP & API
- **Axios 1** - HTTP client dengan interceptors
- **API Integration** - Backend REST API di `localhost:5000`

### Notifications & Feedback
- **React Hot Toast 2** - Toast notifications yang stylish
- **React Spinners** - Loading indicators yang beragam

## 📁 Struktur Proyek

```
src/
├── components/          # Komponen reusable
│   ├── Animations/      # Loading spinners dan animasi
│   ├── Elements/        # UI elements dasar
│   ├── Fragments/       # Fragment komponen
│   └── Layouts/         # Layout komponen
│       ├── Home/        # Komponen homepage
│       │   ├── Hero.jsx
│       │   ├── About.jsx
│       │   ├── BlogCarousel.jsx
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   └── Posts/   # Komponen blog detail
│       └── Protected/   # Protected route wrapper
├── pages/               # Halaman utama aplikasi
│   ├── Auth/           # Halaman autentikasi
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── Dashboard/      # Halaman dashboard admin
│   │   ├── main.jsx
│   │   ├── Posts/
│   │   ├── Categories/
│   │   ├── Roles/
│   │   ├── Comments/
│   │   └── Profile/
│   ├── Home/           # Homepage
│   └── Error/          # Error pages
├── layouts/            # Layout wrappers
│   ├── Auth.jsx
│   ├── Dashboard.jsx
│   └── Home.jsx
├── services/           # API services
│   ├── api.js          # Axios configuration
│   ├── Auth/
│   ├── Posts/
│   ├── Categories/
│   ├── Roles/
│   └── Comments/
├── store/              # Redux store
│   ├── store.js        # Store configuration
│   ├── Auth/
│   ├── Posts/
│   ├── Categories/
│   ├── Roles/
│   └── Comments/
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── assets/             # Static assets
```

## 🚀 Instalasi dan Setup

### Prerequisites
- **Node.js** (versi 16 atau lebih baru)
- **npm** atau **yarn**
- **Backend API** berjalan di `localhost:5000`

### Langkah Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/Brynnnn12/frontend-blogs.git
   cd frontend-blogs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Backend API**
   - Pastikan backend API berjalan di `http://localhost:5000`
   - API endpoint base: `/api/v1`
   - Backend harus mendukung CORS dan cookies

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

5. **Akses aplikasi**
   - Frontend: `http://localhost:5173`
   - Buat akun admin melalui halaman register
   - Login untuk mengakses dashboard dan konten premium

### Build untuk Production

```bash
# Build aplikasi
npm run build

# Preview build
npm run preview

# Lint kode
npm run lint
```

## 🔧 Konfigurasi

### API Configuration
File konfigurasi API terletak di `src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});
```

### Environment Variables
Buat file `.env` untuk konfigurasi environment:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=BlogKita
```

## 🎨 Customization

### Tema dan Styling
- Tema utama menggunakan warna biru dan kuning
- Customization dapat dilakukan melalui Tailwind CSS classes
- DaisyUI components dapat di-override sesuai kebutuhan

### Animasi
- Framer Motion digunakan untuk semua animasi
- Konfigurasi animasi dapat ditemukan di komponen individual
- Support untuk reduced motion preferences

## 🤝 Kontribusi

1. **Fork** repository ini
2. **Create feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add: AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### Coding Standards
- Gunakan ESLint configuration yang sudah ada
- Follow React best practices dan hooks patterns
- Gunakan TypeScript untuk type safety (opsional)
- Write meaningful commit messages

### Bug Reports
- Gunakan GitHub Issues untuk melaporkan bug
- Sertakan langkah reproduksi yang jelas
- Tambahkan screenshot jika memungkinkan

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Tim Pengembang

- **Frontend Developer** - React, Redux, Tailwind CSS
- **UI/UX Designer** - Design system dan user experience
- **Backend Integration** - API integration dan state management

## 🔗 Links

- **Repository:** [https://github.com/Brynnnn12/frontend-blogs](https://github.com/Brynnnn12/frontend-blogs)
- **Issues:** [https://github.com/Brynnnn12/frontend-blogs/issues](https://github.com/Brynnnn12/frontend-blogs/issues)
- **Documentation:** Lihat folder `/docs` untuk dokumentasi lebih detail

---

**Happy Blogging with BlogKita! 🎉**
