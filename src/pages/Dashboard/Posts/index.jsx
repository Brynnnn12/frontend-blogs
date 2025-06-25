import { useState, useEffect } from "react";
import { usePosts } from "../../../hooks/Posts/usePosts";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../store/Categories/categorySlice";
import PostTable from "../../../components/Layouts/Dashboard/Posts/PostTable";
import PostModal from "../../../components/Layouts/Dashboard/Posts/PostModal";

export default function Posts() {
  const dispatch = useDispatch();
  const { createPost, updatePost, loading, success, clearCurrentPost } =
    usePosts();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Load categories when component mounts
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Close modal when success
  useEffect(() => {
    if (success) {
      setModalOpen(false);
      setEditData(null);
      clearCurrentPost();
    }
  }, [success, clearCurrentPost]);
  const handleCreate = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (data) => {
    setEditData(data);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);
  };
  const handleSubmit = async (values) => {
    try {
      if (editData) {
        // Update existing post
        await updatePost(editData.slug, values).unwrap();
      } else {
        // Create new post
        await createPost(values).unwrap();
      }
    } catch (error) {
      console.error("Failed to save post:", error);
    }
  };

  return (
    <div className="p-4">
      <PostTable onEdit={handleEdit} onCreate={handleCreate} />{" "}
      {/* Modal Form Tambah/Edit */}
      <PostModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        initialValues={
          editData || { title: "", content: "", categoryId: "", image: null }
        }
        onSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}
