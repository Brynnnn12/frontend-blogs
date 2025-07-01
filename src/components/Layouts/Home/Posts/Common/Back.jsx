import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Back = () => {
  return (
    <motion.div
      className="mt-12 pt-8 border-t border-gray-200 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <Link
        to="/"
        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg"
      >
        <FaArrowLeft className="mr-2" />
        Kembali ke Beranda
      </Link>
    </motion.div>
  );
};

export default Back;
