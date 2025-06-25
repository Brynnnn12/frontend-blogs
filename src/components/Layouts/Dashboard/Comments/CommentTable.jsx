import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  deleteComment,
} from "../../../../store/Comments/commentSlice";
import Pagination from "../../../../utils/Pagination";

export default function CommentTable({ onEdit, onCreate }) {
  const dispatch = useDispatch();
  const { comments, loading, error, pagination } = useSelector(
    (state) => state.comments
  );

  const [hasInitialized, setHasInitialized] = useState(false);

  // Fallback values untuk pagination
  const currentPage = pagination?.currentPage || 1;
  const perPage = pagination?.perPage || 10;
  const totalPages = pagination?.totalPages || 1;

  useEffect(() => {
    // Hanya fetch data saat pertama kali component mount
    if (!hasInitialized) {
      dispatch(getComments({ page: 1, limit: 10 }));
      setHasInitialized(true);
    }
  }, [dispatch, hasInitialized]);
  const handleDelete = async (id) => {
    if (!id) {
      console.error("ID tidak valid:", id);
      return;
    }

    const confirmDelete = confirm("Yakin ingin menghapus komentar ini?");
    if (confirmDelete) {
      try {
        await dispatch(deleteComment(id)).unwrap();
        // Tidak perlu refresh manual karena Redux store sudah update
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    dispatch(getComments({ page: newPage, limit: perPage }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-700 font-bold">Daftar Komentar</h2>
        <button onClick={onCreate} className="btn btn-primary">
          Tambah Komentar
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full text-gray-700">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th>No</th>
              <th>Konten</th>
              <th>Post</th>
              <th>User</th>
              <th>Dibuat Pada</th>
              <th>Diupdate Pada</th>
              <th>Aksi</th>
            </tr>
          </thead>{" "}
          <tbody>
            {comments && comments.length > 0 ? (
              comments.map((comment, index) => (
                <tr key={comment.id || `comment-${index}`}>
                  <td>{(currentPage - 1) * perPage + index + 1}</td>
                  <td>{comment.content || "Konten tidak tersedia"}</td>
                  <td>
                    {comment.postId ||
                      comment.post?.title ||
                      "Post tidak tersedia"}
                  </td>
                  <td>
                    {comment.userId ||
                      comment.user?.username ||
                      "User tidak tersedia"}
                  </td>
                  <td>
                    {comment.createdAt
                      ? new Date(comment.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    {comment.updatedAt
                      ? new Date(comment.updatedAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => onEdit(comment)}
                      className="btn btn-sm btn-info"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="btn btn-sm btn-error"
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr key="no-data">
                <td colSpan="7" className="text-center py-4">
                  Tidak ada data komentar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>{" "}
      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={pagination?.totalItems || 0}
          perPage={perPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
