import CategoryForm from "./CategoryForm";

export default function CategoryModal({ isOpen, onClose, editData, onSubmit }) {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values, editData); // Parent handle tambah/edit
    resetForm();
    onClose();
  };

  return (
    <dialog
      id="service_modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box bg-white text-gray-800 rounded-xl shadow-lg">
        <h3 className="font-bold text-2xl text-primary mb-4">
          {editData ? "Edit Layanan" : "Tambah Layanan"}
        </h3>

        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
        >
          ✕
        </button>

        <CategoryForm
          initialValues={{
            name: editData?.name || "",
            description: editData?.description || "",
          }}
          onSubmit={handleSubmit}
          loading={false}
        />
      </div>
    </dialog>
  );
}
