import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getRoles, deleteRole } from "../../../../store/Roles/roleSlice";
import Pagination from "../../../../utils/Pagination";

export default function RoleTable({ onEdit, onCreate }) {
  const dispatch = useDispatch();
  const { roles, loading, error, pagination } = useSelector(
    (state) => state.roles
  );

  const [hasInitialized, setHasInitialized] = useState(false);

  // Fallback values untuk pagination
  const currentPage = pagination?.currentPage || 1;
  const perPage = pagination?.perPage || 10;
  const totalPages = pagination?.totalPages || 1;

  useEffect(() => {
    // Hanya fetch data saat pertama kali component mount
    if (!hasInitialized) {
      dispatch(getRoles({ page: 1, limit: 10 }));
      setHasInitialized(true);
    }
  }, [dispatch, hasInitialized]);
  const handleDelete = async (id) => {
    if (!id) {
      console.error("ID tidak valid:", id);
      return;
    }

    const confirmDelete = confirm("Yakin ingin menghapus role ini?");
    if (confirmDelete) {
      try {
        await dispatch(deleteRole(id)).unwrap();
        // Tidak perlu refresh manual karena Redux store sudah update
      } catch (error) {
        console.error("Failed to delete role:", error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    dispatch(getRoles({ page: newPage, limit: perPage }));
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
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-700 font-bold">Daftar Role</h2>
        <button onClick={onCreate} className="btn btn-primary">
          Tambah Role
        </button>
      </div>
      <table className="table w-full overflow-x-auto text-gray-700">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {roles && roles.length > 0 ? (
            roles.map((role, index) => {
              // Debug log untuk melihat struktur role
              // console.log("Role data:", role);
              return (
                <tr key={role.id || `role-${index}`}>
                  <td>{(currentPage - 1) * perPage + index + 1}</td>
                  <td>{role.name || "Nama tidak tersedia"}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => onEdit(role)}
                      className="btn btn-sm btn-info"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(role.id)}
                      className="btn btn-sm btn-error"
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4">
                Tidak ada data role
              </td>
            </tr>
          )}
        </tbody>
      </table>
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
