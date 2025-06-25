import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const BlogCarousel = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Tips Memulai Bisnis Online di Tahun 2023",
      excerpt:
        "Pelajari strategi terbaru untuk memulai bisnis online yang sukses di era digital saat ini.",
      date: "15 Juni 2023",
      category: "Bisnis",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6g10Sw9do2EIowWd7Uugp_Vq2fVH5DT50Sg&s",
    },
    {
      id: 2,
      title: "Teknologi Terkini dalam Pengembangan Web",
      excerpt:
        "Eksplorasi teknologi web terbaru yang akan mengubah cara kita membangun aplikasi.",
      date: "10 Juni 2023",
      category: "Teknologi",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6g10Sw9do2EIowWd7Uugp_Vq2fVH5DT50Sg&s",
    },
    {
      id: 3,
      title: "Panduan Lengkap Desain UI/UX untuk Pemula",
      excerpt:
        "Mulai perjalanan Anda dalam dunia desain antarmuka pengguna dengan panduan ini.",
      date: "5 Juni 2023",
      category: "Desain",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6g10Sw9do2EIowWd7Uugp_Vq2fVH5DT50Sg&s",
    },
    {
      id: 4,
      title: "Strategi Marketing Digital yang Efektif",
      excerpt:
        "Temukan cara meningkatkan penjualan dengan strategi marketing digital terbaru.",
      date: "1 Juni 2023",
      category: "Marketing",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6g10Sw9do2EIowWd7Uugp_Vq2fVH5DT50Sg&s",
    },
    {
      id: 5,
      title: "Kesehatan Mental di Tempat Kerja",
      excerpt:
        "Pentingnya menjaga kesehatan mental dalam lingkungan kerja yang kompetitif.",
      date: "28 Mei 2023",
      category: "Kesehatan",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6g10Sw9do2EIowWd7Uugp_Vq2fVH5DT50Sg&s",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  function getVisibleCount() {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      setCurrentIndex(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 > blogPosts.length - visibleCount ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? blogPosts.length - visibleCount : prevIndex - 1
    );
  };

  const visiblePosts = [
    ...blogPosts.slice(currentIndex, currentIndex + visibleCount),
    ...blogPosts.slice(
      0,
      Math.max(0, currentIndex + visibleCount - blogPosts.length)
    ),
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-blue-50 to-white py-16 px-2 md:px-4">
      <motion.div
        id="Blogs"
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12 drop-shadow"
          variants={itemVariants}
        >
          Artikel Terbaru
        </motion.h2>

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
              >
                {visiblePosts.map((post, i) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col border border-blue-100"
                    whileHover={{
                      scale: 1.025,
                      boxShadow: "0 8px 32px rgba(59,130,246,0.12)",
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      />
                      <motion.div
                        className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15 * i }}
                      >
                        {post.category}
                      </motion.div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-500">
                          {post.date}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.03 }}
                        className="mt-auto w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow"
                      >
                        Baca Selengkapnya
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-md hover:bg-blue-100 text-blue-800 hover:text-yellow-500 transition-all duration-300 z-10 border border-blue-100"
            aria-label="Previous slide"
            whileTap={{ scale: 0.85, rotate: -15 }}
            whileHover={{ scale: 1.07, boxShadow: "0 4px 24px #1e40af33" }}
            variants={itemVariants}
          >
            <FaChevronLeft size={20} />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-md hover:bg-blue-100 text-blue-800 hover:text-yellow-500 transition-all duration-300 z-10 border border-blue-100"
            aria-label="Next slide"
            whileTap={{ scale: 0.85, rotate: 15 }}
            whileHover={{ scale: 1.07, boxShadow: "0 4px 24px #1e40af33" }}
            variants={itemVariants}
          >
            <FaChevronRight size={20} />
          </motion.button>
        </div>

        {/* Dots indicator */}
        <motion.div
          className="flex justify-center mt-10 space-x-2"
          variants={itemVariants}
        >
          {Array.from({ length: blogPosts.length - visibleCount + 1 }).map(
            (_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-blue-600 border-blue-600 scale-110"
                    : "bg-gray-300 border-gray-400"
                }`}
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
              />
            )
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BlogCarousel;
