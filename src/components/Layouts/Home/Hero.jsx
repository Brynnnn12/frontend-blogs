import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../store/Categories/categorySlice";

const Hero = () => {
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  // Load categories when component mounts
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories]);

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
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: false, margin: "-100px 0px 0px 0px" }}
          >
            Jelajahi koleksi artikel kami yang mencakup berbagai topik menarik
            mulai dari teknologi, bisnis, hingga gaya hidup modern.
          </motion.p>

          {/* Popular Categories */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: false, margin: "-100px 0px 0px 0px" }}
          >
            <p className="text-white/80 mb-4 text-sm">Kategori Populer:</p>

            {loading && (
              <div className="flex justify-center">
                <div className="loading loading-spinner loading-sm text-white"></div>
              </div>
            )}

            {error && (
              <p className="text-red-400 text-sm">Gagal memuat kategori</p>
            )}

            {!loading && !error && categories && categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {categories.slice(0, 5).map((category, index) => (
                  <motion.button
                    key={category.id || index}
                    className="px-4 py-2 text-sm rounded-full border border-white/30 text-white hover:bg-blue-500 hover:border-blue-500 transition-colors"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    viewport={{ once: false, margin: "-50px 0px 0px 0px" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            )}

            {!loading && !error && (!categories || categories.length === 0) && (
              <p className="text-white/60 text-sm">
                Belum ada kategori tersedia
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
