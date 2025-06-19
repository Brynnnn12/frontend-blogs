import RoleForm from "./RoleForm";

export default function CategoryModal({ isOpen, onClose, editData, onSubmit }) {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values, editData); // Parent handle tambah/edit
    resetForm();
    onClose();
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
        </button>

        <RoleForm
          initialValues={{
            name: editData?.name || "",
          }}
          onSubmit={handleSubmit}
          loading={false}
        />
      </div>
    </dialog>
  );
}
