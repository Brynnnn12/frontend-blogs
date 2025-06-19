import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { name: "Beranda", url: "/" },
    { name: "Tentang Kami", url: "/about" },
    { name: "Artikel", url: "/blog" },
    { name: "Kontak", url: "/contact" },
    { name: "Kebijakan Privasi", url: "/privacy" },
  ];

  const categories = [
    { name: "Teknologi", url: "/category/technology" },
    { name: "Bisnis", url: "/category/business" },
    { name: "Kesehatan", url: "/category/health" },
    { name: "Gaya Hidup", url: "/category/lifestyle" },
    { name: "Pendidikan", url: "/category/education" },
  ];

  const socialMedia = [
    { icon: <FaFacebook className="text-xl" />, url: "#" },
    { icon: <FaTwitter className="text-xl" />, url: "#" },
    { icon: <FaInstagram className="text-xl" />, url: "#" },
    { icon: <FaLinkedin className="text-xl" />, url: "#" },
    { icon: <FaYoutube className="text-xl" />, url: "#" },
  ];

  return (
    <footer className="bg-blue-100 text-blue-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo dan Deskripsi */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-700">Blog</span>
              <span className="text-2xl font-bold text-yellow-500">Ku</span>
            </div>
            <p className="mb-4">
              Menyediakan konten berkualitas tentang berbagai topik menarik
              untuk menambah wawasan Anda.
            </p>
            <div className="flex gap-4">
              {socialMedia.map((social, index) => (
                <Link
                  key={index}
                  to={social.url}
                  className="btn btn-circle btn-sm bg-white border border-blue-300 hover:bg-yellow-400 hover:text-white transition-all duration-200"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h3 className="footer-title text-lg font-semibold text-blue-700">
              Tautan Cepat
            </h3>
            <ul className="space-y-2 mt-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.url}
                    className="hover:text-yellow-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kategori */}
          <div>
            <h3 className="footer-title text-lg font-semibold text-blue-700">
              Kategori
            </h3>
            <ul className="space-y-2 mt-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={category.url}
                    className="hover:text-yellow-500 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="footer-title text-lg font-semibold text-blue-700">
              Newsletter
            </h3>
            <p className="mb-4 mt-2">
              Berlangganan newsletter kami untuk mendapatkan update artikel
              terbaru.
            </p>
            <div className="form-control">
              <div className="relative">
                <input
                  type="email"
                  placeholder="email@anda.com"
                  className="input input-bordered w-full pr-20 border-blue-300"
                />
                <button className="btn bg-yellow-400 hover:bg-yellow-500 text-blue-900 absolute top-0 right-0 rounded-l-none">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-white border-t border-blue-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} BlogKu. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0 text-sm">
              <Link to="#" className="hover:text-yellow-500">
                Terms of Service
              </Link>
              <Link to="#" className="hover:text-yellow-500">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-yellow-500">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
