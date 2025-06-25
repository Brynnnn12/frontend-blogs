import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRole,
  updateRole,
  resetRoleState,
} from "../../../../store/Roles/roleSlice";
import RoleForm from "./RoleForm";

export default function RoleModal({ isOpen, onClose, editData }) {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.roles);
  // Tutup modal dan reset state jika sukses
  useEffect(() => {
    if (success) {
      onClose();
      dispatch(resetRoleState());
      // Tidak perlu dispatch getRoles di sini karena sudah di RoleTable
    }
  }, [success, dispatch, onClose]);
  // Submit handler
  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (editData) {
        await dispatch(
          updateRole({ id: editData.id, roleData: values })
        ).unwrap();
      } else {
        await dispatch(createRole(values)).unwrap();
      }
      resetForm();
    } catch (error) {
      console.error("Failed to submit role:", error);
    }
  };

  return (
    <dialog id="role_modal" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-white text-gray-800 rounded-xl shadow-lg">
        <h3 className="font-bold text-2xl text-primary mb-4">
          {editData ? "Edit Role" : "Tambah Role"}
        </h3>
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
        >
          ✕
        </button>{" "}
        <RoleForm
          initialValues={{
            name: editData?.name || "",
          }}
          onSubmit={handleSubmit}
          loading={loading}
        />
        {error && (
          <div className="alert alert-error mt-4">
            <span>{error}</span>
          </div>
        )}
      </div>
    </dialog>
  );
}
