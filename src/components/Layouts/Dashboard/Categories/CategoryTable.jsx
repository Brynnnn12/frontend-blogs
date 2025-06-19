import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

export default function CategoryTable({ onEdit, onCreate }) {
  // Dummy data
  const dummyCategories = Array.from({ length: 45 }).map((_, index) => ({
    id: index + 1,
    name: `Kategori ${index + 1}`,
    description: `Deskripsi untuk kategori ${index + 1}`,
  }));

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  const totalPages = Math.ceil(dummyCategories.length / limit);
  const currentPage = page;

  useEffect(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    setCategories(dummyCategories.slice(start, end));
  }, [page]);

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Yakin ingin menghapus kategori ini?");
    if (confirmDelete) {
      const updated = dummyCategories.filter((cat) => cat.id !== id);
      // Untuk simulasi hapus
      alert("Data dihapus (simulasi)");
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-700 font-bold">Daftar Kategori</h2>
        <button onClick={onCreate} className="btn btn-primary">
          Tambah Kategori
        </button>
      </div>

      <table className="table w-full overflow-x-auto text-gray-700">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td>{(page - 1) * limit + index + 1}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td className="flex gap-2">
                <button
                  onClick={() => onEdit(category)}
                  className="btn btn-sm btn-info"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="btn btn-sm btn-error"
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="btn btn-sm"
        >
          « Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="btn btn-sm"
        >
          Next »
        </button>
      </div>
    </div>
  );
}
