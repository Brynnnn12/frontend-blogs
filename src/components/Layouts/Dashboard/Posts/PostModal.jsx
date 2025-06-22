import PostForm from "./PostForm";

export default function PostModal({
  isOpen,
  onClose,
  initialValues,
  onSubmit,
  loading,
}) {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values); // Parent handle tambah/edit
    resetForm();
    onClose();
  };

  return (
    <dialog id="post_modal" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-white text-gray-800 rounded-xl shadow-lg">
        <h3 className="font-bold text-2xl text-primary mb-4">
          {initialValues.id ? "Edit Post" : "Tambah Post"}
        </h3>

        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
        >
          ✕
        </button>

        <PostForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </dialog>
  );
}
