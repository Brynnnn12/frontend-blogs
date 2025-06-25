import { useDispatch, useSelector } from "react-redux";
import CategoryForm from "./CategoryForm";
import { useEffect } from "react";
import {
  createCategory,
  updateCategory,
  resetCategoryState,
} from "../../../../store/Categories/categorySlice";

export default function CategoryModal({ isOpen, onClose, editData }) {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.categories);

  // Tutup modal dan reset state jika sukses
  useEffect(() => {
    if (success) {
      onClose();
      dispatch(resetCategoryState());
    }
  }, [success, dispatch, onClose]);

  // Submit handler
  const handleSubmit = async (values, { resetForm }) => {
    if (editData) {
      await dispatch(updateCategory({ slug: editData.slug, data: values }));
    } else {
      await dispatch(createCategory(values));
    }

    resetForm();
  };

  console.log("✅ isOpen:", isOpen);
  console.log("✅ editData:", editData);

  return (
    isOpen && (
      <dialog open className="modal modal-open">
        <div className="modal-box bg-white text-black max-w-sm lg:max-w-lg w-full relative">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          >
            ✕
          </button>

          <h3 className="font-bold text-2xl mb-6 text-center">
            {editData ? "Edit Kategori" : "Tambah Kategori"}
          </h3>

          <CategoryForm
            initialValues={{
              name: editData ? editData.name : "",
            }}
            onSubmit={handleSubmit}
            loading={loading}
          />
          {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
        </div>
      </dialog>
    )
  );
}
