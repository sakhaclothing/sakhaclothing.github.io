# Sakha Clothing - Official Website

## 🚀 Quick Start & Fitur Profile

### Fitur Profile

- **Edit Profil:** User dapat mengubah username, fullname, dan email.
- **Ganti Email:** Jika email diubah, sistem akan mengirim OTP ke email baru. User harus memasukkan OTP untuk verifikasi.
- **Ganti Password:** User dapat mengganti password dengan memasukkan password lama dan password baru.
- **Notifikasi Interaktif:** Semua aksi penting (update profil, ganti password, verifikasi email) menggunakan SweetAlert2 untuk feedback yang jelas.

### Cara Menggunakan (User)

1. **Login** ke website.
2. Klik menu **My Profile** di pojok kanan atas.
3. Di halaman profile:
   - Edit data diri, klik "Simpan Perubahan".
   - Jika email diubah, masukkan OTP yang dikirim ke email baru.
   - Untuk ganti password, isi form di bawah dan klik "Simpan Password".
4. Semua perubahan akan mendapat notifikasi sukses/gagal.

### Cara Menjalankan Lokal

1. Clone repo:
   ```bash
   git clone https://github.com/yourusername/sakhaclothing.github.io.git
   cd sakhaclothing.github.io
   ```
2. Buka `index.html` di browser atau jalankan server lokal:
   ```bash
   python -m http.server 8000
   # atau
   npx http-server
   ```
3. Akses di `http://localhost:8000`

---

![Sakha Clothing Logo](images/Minimalist%20Line%20Business%20Logo.png)

## 📖 About

Sakha Clothing is a premium clothing brand specializing in custom screen printing and high-quality apparel. Our website showcases our latest collections, trending products, and provides customers with an easy way to discover and purchase our clothing items.

**Live Website:** [sakhaclothing.shop](https://sakhaclothing.shop)

## ✨ Features

### 🛍️ Product Showcase

- **Trending Products Section** - Highlighting our most popular items
- **Product Catalog** - Complete collection of clothing items
- **Custom Screen Printing** - Specialized service for personalized clothing
- **Product Details** - Comprehensive product information and pricing

### 🚚 Services

- **Quick Delivery** - Fast inter-city shipping using trusted courier services
- **In-Store Pickup** - Option for customers to pick up orders directly from our store
- **Special Packaging** - Eco-friendly and stylish packaging solutions

### 💬 Customer Experience

- **Customer Testimonials** - Real feedback from satisfied customers
- **Responsive Design** - Optimized for all devices (desktop, tablet, mobile)
- **Easy Navigation** - Intuitive menu structure and user-friendly interface
- **Contact Integration** - Direct WhatsApp contact for customer support

### 🎨 Design Features

- **Modern UI/UX** - Clean, minimalist design with premium aesthetics
- **Smooth Animations** - Scroll reveal effects and interactive elements
- **Image Sliders** - Swiper.js powered product and testimonial carousels
- **Responsive Layout** - Bootstrap-based responsive grid system

## 🛠️ Technologies Used

### Frontend

- **HTML5** - Semantic markup and structure
- **CSS3** - Custom styling with CSS variables and modern layouts
- **JavaScript (ES6+)** - Interactive functionality and animations
- **Bootstrap 5.3** - Responsive framework and components
- **Swiper.js** - Touch-enabled image sliders and carousels

### Fonts & Typography

- **Outfit** - Primary body font family
- **Urbanist** - Heading font family

### External Services

- **Google Fonts** - Web font delivery
- **CDN Resources** - Bootstrap and Swiper.js from CDN
- **WhatsApp API** - Direct messaging integration

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic knowledge of HTML, CSS, and JavaScript (for development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/sakhaclothing.github.io.git
   cd sakhaclothing.github.io
   ```

2. **Open the website**

   - Simply open `index.html` in your web browser
   - Or use a local server for development:

     ```bash
     # Using Python 3
     python -m http.server 8000

     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

3. **Access the website**
   - Local development: `http://localhost:8000`
   - Production: `https://sakhaclothing.shop`

## 🎯 Key Sections

### Homepage (`index.html`)

- **Hero Section** - Eye-catching banner with brand messaging
- **Services Overview** - Quick delivery, in-store pickup, special packaging
- **Trending Products** - Swiper carousel of popular items
- **Product Catalog** - Grid layout of all available products
- **Customer Testimonials** - Social proof from satisfied customers
- **Footer** - Contact information and additional links

### Styling (`style.css`)

- **CSS Variables** - Consistent color scheme and typography
- **Responsive Design** - Mobile-first approach with breakpoints
- **Custom Components** - Product cards, buttons, and navigation
- **Animations** - Scroll reveal effects and hover states

### Functionality (`script.js`)

- **Navigation Effects** - Dynamic navbar background on scroll
- **Swiper Integration** - Product and testimonial carousels
- **Responsive Behavior** - Adaptive slider configurations
- **Scroll Animations** - Reveal effects for enhanced UX

## 📱 Responsive Design

The website is fully responsive and optimized for:

- **Desktop** (1200px+) - Full layout with all features
- **Tablet** (768px - 1199px) - Adjusted grid layouts
- **Mobile** (< 768px) - Single-column layout with touch-friendly elements

## 🔧 Customization

### Colors

The color scheme can be modified in `style.css`:

```css
:root {
  --accent-color: rgb(0, 0, 0);
  --dark-color: #040404;
  --light-color: #fff;
  --primary-color: #111111;
}
```

### Fonts

Font families are defined in CSS variables:

```css
:root {
  --body-font: "Outfit", sans-serif;
  --heading-font: "Urbanist", sans-serif;
}
```

### Products

To add or modify products, edit the product sections in `index.html` and update corresponding images in the `images/` directory.

## 📞 Contact & Support

- **Website:** [sakhaclothing.shop](https://sakhaclothing.shop)
- **WhatsApp:** [+62 857-5979-0334](https://api.whatsapp.com/send?phone=6285759790334)
- **Email:** Contact through the website

## 📄 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Bootstrap** - For the responsive framework
- **Swiper.js** - For the carousel functionality
- **Google Fonts** - For the typography
- **Customers** - For their valuable feedback and testimonials

---

**Sakha Clothing** - Discover the joy of dressing with premium quality apparel and custom screen printing services.
