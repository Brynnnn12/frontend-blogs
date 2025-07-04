import React, { useEffect, useMemo, useCallback } from "react";
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
  clearComments,
} from "../../../../store/Comments/commentSlice";
import CommentList from "./Common/CommentList";
import CommentForm from "../../Dashboard/Comments/CommentForm";

const BlogPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { isAuthenticated, user: currentUser } = useSelector(
    (state) => state.auth
  );

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

  // Comments sudah difilter di backend berdasarkan slug, tidak perlu filter lagi
  const postComments = useMemo(() => {
    return comments || [];
  }, [comments]);

  // Load post by slug
  useEffect(() => {
    if (slug) {
      getPostBySlug(slug);
    }
  }, [slug]); // Hapus getPostBySlug dari dependency untuk mencegah infinite loop

  // Load comments berdasarkan slug
  useEffect(() => {
    if (slug) {
      // Clear comments dari post sebelumnya
      dispatch(clearComments());
      // Load comments untuk post ini berdasarkan slug
      dispatch(getComments(slug));
    }
  }, [slug, dispatch]);

  // Reset state setelah berhasil membuat comment
  useEffect(() => {
    if (success) {
      dispatch(resetCommentState());
      // Reload comments setelah berhasil membuat comment
      if (slug) {
        dispatch(getComments(slug));
      }
    }
  }, [success, dispatch, slug]);

  // Callback untuk refresh comments setelah update/delete
  const handleCommentUpdate = useCallback(() => {
    if (slug) {
      dispatch(getComments(slug));
    }
  }, [slug, dispatch]);

  // Submit handler for comment form
  const handleSubmit = useCallback(
    async (values, { resetForm }) => {
      // Cek apakah user sudah login
      if (!isAuthenticated) {
        alert("Silakan login terlebih dahulu untuk mengomentari artikel ini");
        return;
      }

      if (!slug) {
        console.error("Slug tidak tersedia");
        return;
      }

      try {
        const commentData = {
          slug: slug,
          content: values.content,
        };

        await dispatch(createComment(commentData)).unwrap();
        resetForm();
      } catch (error) {
        console.error("Failed to create comment:", error);
      }
    },
    [slug, dispatch, isAuthenticated]
  );

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

          {/* Debug Info - bisa dihapus nanti */}
          <div className="mb-4 p-4 bg-yellow-100 text-black rounded-lg text-sm">
            <strong>Debug Auth Info:</strong>
            <br />
            Is Authenticated: {isAuthenticated ? "Yes" : "No"}
            <br />
            Current User: {currentUser ? currentUser.username : "Not logged in"}
            <br />
            User ID: {currentUser?.id || "undefined"}
          </div>

          {/* Comment Form - Conditional rendering based on authentication */}
          {isAuthenticated ? (
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
          ) : (
            <motion.div
              className="bg-gray-100 p-6 rounded-xl shadow-md mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-600 mb-4">
                Silakan login untuk mengomentari artikel ini
              </p>
              <Link
                to="/login"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Login Sekarang
              </Link>
            </motion.div>
          )}

          {/* Comments List */}
          <CommentList
            comments={postComments}
            loading={commentsLoading}
            currentUser={currentUser}
            onCommentUpdate={handleCommentUpdate}
          />

          {/* Error message for comments */}
          {commentsError && (
            <motion.div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Gagal memuat komentar: {commentsError}
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
