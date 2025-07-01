import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ErrorPage = ({ title, message, showBackButton = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
    >
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-4">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-2xl font-bold text-red-600 mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 mb-6"
        >
          {message}
        </motion.p>
        {showBackButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-md"
            >
              <FaArrowLeft className="mr-2" />
              Kembali ke Beranda
            </Link>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorPage;
