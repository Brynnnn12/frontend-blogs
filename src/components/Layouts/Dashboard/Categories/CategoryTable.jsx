import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteCategory,
} from "../../../../store/Categories/categorySlice";
import Pagination from "../../../../utils/Pagination";

export default function CategoryTable({ onEdit, onCreate }) {
  const dispatch = useDispatch();

  // State untuk pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  const { categories, loading, error, pagination } = useSelector(
    (state) => state.categories
  );

  // Ambil data kategori setiap kali `page` berubah
  useEffect(() => {
    dispatch(getCategories({ page, limit }));
  }, [dispatch, page, limit]);

  const handleDelete = async (slug) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus kategori ini?");
    if (!confirmDelete) return;

    await dispatch(deleteCategory(slug));
    dispatch(getCategories({ page, limit }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-700 font-bold">Daftar Kategori</h2>
        <button onClick={onCreate} className="btn btn-primary">
          Tambah Kategori
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="table w-full overflow-x-auto text-gray-700">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Slug</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.slug}>
              <td>
                {(pagination.currentPage - 1) * pagination.perPage + index + 1}
              </td>
              <td>{category.name}</td>
              <td>{category.slug}</td>
              <td className="flex space-x-2">
                <button
                  onClick={() => onEdit(category)}
                  className="btn btn-sm btn-secondary"
                  title="Edit"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(category.slug)}
                  className="btn btn-sm btn-error"
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center text-gray-500">
                Tidak ada kategori ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          perPage={pagination.perPage}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </div>
  );
}
