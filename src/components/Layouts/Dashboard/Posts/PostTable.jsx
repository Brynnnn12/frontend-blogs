import { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { usePosts } from "../../../../hooks/Posts/usePosts";

export default function PostTable({ onEdit, onCreate }) {
  const { posts, loading, pagination, getPosts, deletePost } = usePosts();

  const [page, setPage] = useState(1);
  const limit = 10;

  // Load posts on component mount and when page changes
  useEffect(() => {
    getPosts({ page, limit });
  }, [getPosts, page]);
  const handleNext = () => {
    if (page < (pagination?.total_pages || 1)) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  }; // Helper function to get category name by ID

  const handleDelete = async (slug) => {
    if (window.confirm("Yakin ingin menghapus post ini?")) {
      try {
        await deletePost(slug).unwrap();
        // Refresh posts after delete
        getPosts({ page, limit });
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-700 font-bold">Daftar Post</h2>
        <button onClick={onCreate} className="btn btn-primary">
          Tambah Post
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full text-gray-700">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Judul</th>
              <th>Kategori</th>
              <th>User</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.length > 0 ? (
              posts.map((post, index) => (
                <tr key={post.slug || post.id || index}>
                  <td>{(page - 1) * limit + index + 1}</td>

                  <td>
                    {post.image ? (
                      <img
                        src={`http://localhost:5000/uploads/posts/${post.image}`}
                        alt={post.title || "Post Image"}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="max-w-xs truncate">
                    {post.title || "Untitled"}
                  </td>
                  <td>{post.category?.name || "Uncategorized"}</td>
                  <td>{post.user?.username || post.user || "Unknown"}</td>
                  <td className="flex space-x-2">
                    <button
                      onClick={() => onEdit(post)}
                      className="btn btn-sm btn-secondary"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(post.slug || post.id)}
                      className="btn btn-sm btn-danger"
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  Tidak ada data post
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="btn btn-sm"
        >
          Prev
        </button>
        <span className="text-gray-600">
          Halaman {page} dari {pagination?.total_pages || 1}
        </span>
        <button
          onClick={handleNext}
          disabled={page === (pagination?.total_pages || 1)}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
