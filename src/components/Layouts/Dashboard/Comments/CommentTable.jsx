import { useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function CommentTable({ onEdit, onCreate }) {
  // Dummy data
  const dummyComments = Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1,
    content: `Comment ${index + 1}`,
    postId: `Post ${Math.ceil((index + 1) / 5)}`,
    userId: `User ${Math.ceil((index + 1) / 10)}`,
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  }));

  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(dummyComments.length / limit);
  const currentPage = page;
  useEffect(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    setComments(dummyComments.slice(start, end));
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus komentar ini?");
    if (confirmDelete) {
      const updated = dummyComments.filter((comment) => comment.id !== id);
      setComments(updated);
      // Untuk simulasi hapus
      alert("Data dihapus (simulasi)");
    }
  };

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
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment.id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{comment.content}</td>
                <td>{comment.postId}</td>
                <td>{comment.userId}</td>
                <td>{comment.createdAt}</td>
                <td>{comment.updatedAt}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => onEdit(comment)}
                    className="btn btn-sm btn-secondary"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="btn btn-sm btn-danger"
                  >
                    <FiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="btn btn-sm"
        >
          Prev
        </button>
        <span className="text-gray-600">
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
