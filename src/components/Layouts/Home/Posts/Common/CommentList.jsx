// CommentList.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommentItem from "./CommentItem";

const CommentList = ({ comments, loading, currentUser, onCommentUpdate }) => {
  // Debug log
  console.log("CommentList currentUser:", currentUser);

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
          ></motion.div>
        </div>
      ) : comments.length > 0 ? (
        <AnimatePresence>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUser={currentUser} // PASTIKAN INI ADA!
              onDelete={onCommentUpdate}
              onUpdate={onCommentUpdate}
            />
          ))}
        </AnimatePresence>
      ) : (
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-500">
            Belum ada komentar. Jadilah yang pertama berkomentar!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CommentList;
