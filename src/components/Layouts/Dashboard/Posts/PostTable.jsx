import { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function PostTable({ onEdit, onCreate }) {
  // Dummy data
  const dummyPosts = Array.from({ length: 30 }).map((_, index) => ({
    id: index + 1,
    title: `Judul Post ${index + 1}`,
    content: `Konten untuk post ${index + 1}`,
    category: `Kategori ${Math.ceil((index + 1) / 10)}`,
    user: `User ${Math.ceil((index + 1) / 15)}`,
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
  }));

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const totalPages = Math.ceil(dummyPosts.length / limit);

  useEffect(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    setPosts(dummyPosts.slice(start, end));
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus post ini?");
    if (confirmDelete) {
      const updated = dummyPosts.filter((post) => post.id !== id);
      setPosts(updated);
      // Untuk simulasi hapus
      alert("Data dihapus (simulasi)");
    }
  };

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
              <th>Judul</th>
              <th>Kategori</th>
              <th>User</th>
              <th>Dibuat Pada</th>
              <th>Diupdate Pada</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.user}</td>
                <td>{post.createdAt}</td>
                <td>{post.updatedAt}</td>
                <td className="flex space-x-2">
                  <button
                    onClick={() => onEdit(post)}
                    className="btn btn-sm btn-secondary"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
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
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="btn btn-sm"
        >
          Prev
        </button>
        <span className="text-gray-600">
          Halaman {page} dari
          {totalPages}
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
