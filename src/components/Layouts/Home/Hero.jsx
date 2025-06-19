import React from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const Hero = () => {
  const popularCategories = [
    { name: "Teknologi", url: "#" },
    { name: "Bisnis", url: "#" },
    { name: "Desain", url: "#" },
    { name: "Kesehatan", url: "#" },
    { name: "Gaya Hidup", url: "#" },
  ];

  return (
    <motion.section
      id="Home"
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>

      <div className="relative max-w-6xl mx-auto px-4 flex items-center min-h-screen">
        <div className="text-center w-full py-20">
          {/* Badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, margin: "-100px 0px 0px 0px" }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              Blog Terbaru
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false, margin: "-100px 0px 0px 0px" }}
          >
            Temukan Artikel Menarik untuk{" "}
            <span className="text-blue-400">Membuka Wawasan</span> Baru
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false, margin: "-100px 0px 0px 0px" }}
          >
            Jelajahi koleksi artikel kami yang mencakup berbagai topik menarik
            mulai dari teknologi, bisnis, hingga gaya hidup modern.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="flex justify-center max-w-md mx-auto mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: false, margin: "-100px 0px 0px 0px" }}
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari artikel..."
                className="w-full px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">
                <FaSearch className="text-lg" />
              </button>
            </div>
          </motion.div>

          {/* Popular Categories */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: false, margin: "-100px 0px 0px 0px" }}
          >
            <p className="text-white/80 mb-4 text-sm">Kategori Populer:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularCategories.map((category, index) => (
                <motion.a
                  key={index}
                  href={category.url}
                  className="px-4 py-2 text-sm rounded-full border border-white/30 text-white hover:bg-blue-500 hover:border-blue-500 transition-colors"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  viewport={{ once: false, margin: "-50px 0px 0px 0px" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
