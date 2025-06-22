import CommentForm from "./CommentForm";

export default function CommentModal({ isOpen, onClose, editData, onSubmit }) {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values, editData); // Parent handle tambah/edit
    resetForm();
    onClose();
  };

  return (
    <dialog
      id="comment_modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
    >
      <div className="modal-box bg-white text-gray-800 rounded-xl shadow-lg">
        <h3 className="font-bold text-2xl text-primary mb-4">
          {editData ? "Edit Komentar" : "Tambah Komentar"}
        </h3>

        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
        >
          ✕
        </button>

        <CommentForm
          initialValues={{
            content: editData?.content || "",
          }}
          onSubmit={handleSubmit}
          loading={false}
        />
      </div>
    </dialog>
  );
}
