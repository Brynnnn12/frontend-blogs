import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  updateComment,
  resetCommentState,
} from "../../../../store/Comments/commentSlice";
import CommentForm from "./CommentForm";

export default function CommentModal({ isOpen, onClose, editData }) {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.comments);

  // Tutup modal dan reset state jika sukses
  useEffect(() => {
    if (success) {
      onClose();
      dispatch(resetCommentState());
      // Tidak perlu dispatch getComments di sini karena sudah di CommentTable
    }
  }, [success, dispatch, onClose]);

  // Submit handler
  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (editData) {
        await dispatch(
          updateComment({ id: editData.id, commentData: values })
        ).unwrap();
      } else {
        await dispatch(createComment(values)).unwrap();
      }
      resetForm();
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
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
        </button>{" "}
        <CommentForm
          initialValues={{
            content: editData?.content || "",
            postId: editData?.post?.title || "",
            userId: editData?.user?.username || "",
          }}
          onSubmit={handleSubmit}
          loading={loading}
          isEdit={!!editData}
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
