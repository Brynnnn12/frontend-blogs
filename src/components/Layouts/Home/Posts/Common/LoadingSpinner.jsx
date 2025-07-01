import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "w-16 h-16" }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${size} border-4 border-blue-500 border-t-transparent rounded-full`}
      ></motion.div>
    </div>
  );
};

export default LoadingSpinner;
