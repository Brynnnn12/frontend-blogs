import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaCalendar,
  FaTag,
  FaUser,
  FaComment,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { usePosts } from "../../../../hooks/Posts/usePosts";
import {
  getComments,
  createComment,
  resetCommentState,
} from "../../../../store/Comments/commentSlice";
import CommentForm from "../../Dashboard/Comments/CommentForm";

const BlogPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const {
    currentPost,
    loading: postLoading,
    error: postError,
    getPostBySlug,
  } = usePosts();

  // Get comments from Redux store
  const {
    comments,
    loading: commentsLoading,
    success,
    error: commentsError,
  } = useSelector((state) => state.comments);

  //filter komentar berdasarkan postId
  const postComments = comments.filter(
    (comment) => comment.postId === currentPost?.id
  );

  useEffect(() => {
    if (slug) {
      getPostBySlug(slug);
    }
  }, [slug, getPostBySlug]);

  // Load comments when post is loaded
  useEffect(() => {
    if (currentPost?.id) {
      dispatch(getComments());
    }
  }, [currentPost, dispatch]);

  // Reset state after successful comment creation
  useEffect(() => {
    if (success) {
      dispatch(resetCommentState());
      // Reload comments to get the latest data
      dispatch(getComments());
    }
  }, [success, dispatch]);

  // Submit handler for comment form
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const commentData = {
        content: values.content,
        postId: currentPost.id,
      };

      await dispatch(createComment(commentData)).unwrap();
      resetForm();
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  if (postLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (postError) {
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
            Error
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mb-6"
          >
            Gagal memuat artikel
          </motion.p>
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
        </div>
      </motion.div>
    );
  }

  if (!currentPost) {
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
            className="text-2xl font-bold text-gray-800 mb-4"
          >
            Artikel Tidak Ditemukan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 mb-6"
          >
            Artikel yang Anda cari tidak tersedia
          </motion.p>
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
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Article Content */}
      <motion.article
        className="max-w-4xl mx-auto px-4 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Featured Image */}
        {currentPost.image && (
          <motion.div
            className="mb-8 rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={`http://localhost:5000/uploads/posts/${currentPost.image}`}
              alt={currentPost.title}
              className="w-full h-64 md:h-96 object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </motion.div>
        )}

        {/* Article Header */}
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {currentPost.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 border-b border-gray-200 pb-6">
            <div className="flex items-center">
              <FaUser className="mr-2 text-blue-600" />
              <span>{currentPost.user?.username || "Unknown Author"}</span>
            </div>

            <div className="flex items-center">
              <FaCalendar className="mr-2 text-blue-600" />
              <span>
                {currentPost.createdAt
                  ? new Date(currentPost.createdAt).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "Tanggal tidak tersedia"}
              </span>
            </div>

            {currentPost.category && (
              <div className="flex items-center">
                <FaTag className="mr-2 text-blue-600" />
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                  {currentPost.category.name}
                </span>
              </div>
            )}

            <div className="flex items-center ml-auto">
              <div className="flex items-center text-gray-600">
                <FaComment className="mr-2" />
                <span>{postComments.length}</span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Article Content */}
        <motion.div
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div
            className="text-gray-800 leading-relaxed"
            style={{
              lineHeight: "1.8",
              fontSize: "1.1rem",
            }}
          >
            {currentPost.content ? (
              currentPost.content.split("\n").map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                >
                  {paragraph}
                </motion.p>
              ))
            ) : (
              <p>Konten tidak tersedia</p>
            )}
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FaComment className="mr-3 text-blue-600" />
            Komentar ({postComments.length})
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
              onSubmit={handleSubmit}
              loading={commentsLoading}
              isEdit={false}
            />
          </motion.div>

          {/* Comments List */}
          <div className="space-y-6">
            {commentsLoading ? (
              <div className="flex justify-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
                ></motion.div>
              </div>
            ) : postComments.length > 0 ? (
              <AnimatePresence>
                {postComments.map((comment) => (
                  <motion.div
                    key={comment.id}
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
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-gray-900 mr-2">
                            {comment.user?.username || "Anonymous"}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
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

        {/* Back to Home Button */}
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
      </motion.article>
    </div>
  );
};

export default BlogPage;
