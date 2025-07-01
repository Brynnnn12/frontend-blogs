import React from "react";
import { motion } from "framer-motion";
import { FaComment } from "react-icons/fa";
import CommentForm from "../../../Dashboard/Comments/CommentForm";
import CommentList from "./CommentList";

const CommentsSection = ({
  comments,
  commentsLoading,
  commentsError,
  onSubmit,
}) => {
  return (
    <motion.section
      className="mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <FaComment className="mr-3 text-blue-600" />
        Komentar ({comments.length})
      </h2>

      {/* Comment Form */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-md mb-8"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Tulis Komentar
        </h3>
        <CommentForm
          initialValues={{ content: "" }}
          onSubmit={onSubmit}
          loading={commentsLoading}
          isEdit={false}
        />
      </motion.div>

      {/* Comments List */}
      <CommentList comments={comments} loading={commentsLoading} />

      {/* Error message for comments */}
      {commentsError && (
        <motion.div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Gagal memuat komentar. Silakan coba lagi.
        </motion.div>
      )}
    </motion.section>
  );
};

export default CommentsSection;
