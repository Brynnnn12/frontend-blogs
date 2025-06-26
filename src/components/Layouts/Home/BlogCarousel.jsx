import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { usePosts } from "../../../hooks/Posts/usePosts";

const BlogCarousel = () => {
  const { posts, loading, error } = useSelector((state) => state.posts);
  const { getPosts } = usePosts();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  function getVisibleCount() {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  // Load posts when component mounts
  useEffect(() => {
    if (!posts || posts.length === 0) {
      getPosts({ page: 1, limit: 6 }); // Load 6 posts for carousel
    }
  }, [getPosts, posts]);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      setCurrentIndex(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset currentIndex when posts change
  useEffect(() => {
    setCurrentIndex(0);
  }, [posts]);

  const nextSlide = () => {
    if (posts && posts.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 > posts.length - visibleCount ? 0 : prevIndex + 1
      );
    }
  };

  const prevSlide = () => {
    if (posts && posts.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? posts.length - visibleCount : prevIndex - 1
      );
    }
  };

  // Handle case when posts is empty or undefined
  if (loading) {
    return (
      <div className="relative w-full bg-gradient-to-b from-blue-50 to-white py-16 px-2 md:px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Artikel Terbaru
          </h2>
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="loading loading-spinner loading-lg text-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full bg-gradient-to-b from-blue-50 to-white py-16 px-2 md:px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Artikel Terbaru
          </h2>
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-red-600 text-center">
              Gagal memuat artikel. Silakan coba lagi.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="relative w-full bg-gradient-to-b from-blue-50 to-white py-16 px-2 md:px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
            Artikel Terbaru
          </h2>
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-gray-600 text-center">
              Belum ada artikel tersedia.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const visiblePosts = [
    ...posts.slice(currentIndex, currentIndex + visibleCount),
    ...posts.slice(0, Math.max(0, currentIndex + visibleCount - posts.length)),
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
                    key={post.id || post.slug}
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
                        src={
                          post.image
                            ? `http://localhost:5000/uploads/posts/${post.image}`
                            : "https://via.placeholder.com/400x300?text=No+Image"
                        }
                        alt={post.title || "Post Image"}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x300?text=No+Image";
                        }}
                      />
                      <motion.div
                        className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.15 * i }}
                      >
                        {post.category?.name || "Uncategorized"}
                      </motion.div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-500">
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString(
                                "id-ID"
                              )
                            : "Tanggal tidak tersedia"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title || "Untitled"}
                      </h3>
                      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                        {post.content
                          ? post.content.substring(0, 150) + "..."
                          : "Tidak ada konten tersedia"}
                      </p>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        whileHover={{ scale: 1.03 }}
                        className="mt-auto w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 shadow"
                        onClick={() => {
                          // Navigate to post detail
                          window.location.href = `/post/${
                            post.slug || post.id
                          }`;
                        }}
                      >
                        Baca Selengkapnya
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons - Only show if there are enough posts */}
          {posts.length > visibleCount && (
            <>
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
            </>
          )}
        </div>

        {/* Dots indicator - Only show if there are enough posts */}
        {posts.length > visibleCount && (
          <motion.div
            className="flex justify-center mt-10 space-x-2"
            variants={itemVariants}
          >
            {Array.from({
              length: Math.max(1, posts.length - visibleCount + 1),
            }).map((_, index) => (
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
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default BlogCarousel;
