import React from "react";
import { motion } from "framer-motion";

const BlogImage = ({ image, title }) => {
  if (!image) return null;

  return (
    <motion.div
      className="mb-8 rounded-xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <img
        src={`http://localhost:5000/uploads/posts/${image}`}
        alt={title}
        className="w-full h-64 md:h-96 object-cover"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    </motion.div>
  );
};

export default BlogImage;
