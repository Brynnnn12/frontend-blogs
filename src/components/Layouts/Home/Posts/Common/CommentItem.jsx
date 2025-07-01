import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  updateComment,
  deleteComment,
} from "../../../../../store/Comments/commentSlice";
import CommentForm from "../../../Dashboard/Comments/CommentForm";

const CommentItem = ({ comment, currentUser, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.comments);

  // Debug logs untuk melihat data
  // console.log("CommentItem Debug:", {
  //   currentUser,
  //   commentUser: comment.user,
  //   currentUserId: currentUser?.id,
  //   commentUserId: comment.user?.id,
  //   commentUserUserId: comment.userId, // Kadang field ini bernama userId bukan user.id
  // });

  // Check if current user is the owner of the comment
  // Coba beberapa kemungkinan field yang berbeda
  const isOwner =
    currentUser &&
    (currentUser.id === comment.user?.id ||
      currentUser.id === comment.userId ||
      String(currentUser.id) === String(comment.user?.id) ||
      String(currentUser.id) === String(comment.userId));

  console.log("isOwner:", isOwner);

  const handleEdit = async (values, { resetForm }) => {
    try {
      await dispatch(
        updateComment({
          id: comment.id,
          content: values.content,
        })
      ).unwrap();

      setIsEditing(false);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteComment(comment.id)).unwrap();
      setShowDeleteConfirm(false);
      if (onDelete) onDelete();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start">
        <img
          src={
            comment.user?.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              comment.user?.username || "User"
            )}&background=random`
          }
          alt={comment.user?.username || "User"}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <h3 className="font-semibold text-gray-900 mr-2">
                {comment.user?.username || "Anonymous"}
              </h3>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {comment.updatedAt !== comment.createdAt && (
                  <span className="ml-1 italic">(diedit)</span>
                )}
              </span>
            </div>

            {/* Debug info - hapus setelah selesai debug */}
            <div className="text-xs text-gray-400 mr-2">
              Debug: {isOwner ? "Owner" : "Not Owner"}
            </div>

            {/* Action buttons - always show for debugging, remove condition temporarily */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-800 p-1 rounded border"
                title="Edit komentar"
                disabled={loading}
              >
                <FaEdit className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-red-600 hover:text-red-800 p-1 rounded border"
                title="Hapus komentar"
                disabled={loading}
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>

            {/* Original conditional buttons - uncomment after fixing the issue */}
            {/*
            {isOwner && !isEditing && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded"
                  title="Edit komentar"
                  disabled={loading}
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-red-600 hover:text-red-800 p-1 rounded"
                  title="Hapus komentar"
                  disabled={loading}
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            )}
            */}
          </div>

          {/* Comment content or edit form */}
          {isEditing ? (
            <div className="mt-2">
              <CommentForm
                initialValues={{ content: comment.content }}
                onSubmit={handleEdit}
                loading={loading}
                isEdit={true}
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
                  disabled={loading}
                >
                  <FaTimes className="w-3 h-3" />
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 leading-relaxed">{comment.content}</p>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Hapus Komentar
            </h3>
            <p className="text-gray-600 mb-4">
              Apakah Anda yakin ingin menghapus komentar ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                disabled={loading}
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CommentItem;
