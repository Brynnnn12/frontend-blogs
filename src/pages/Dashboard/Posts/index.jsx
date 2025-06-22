import { useState } from "react";

import PostTable from "../../../components/Layouts/Dashboard/Posts/PostTable";
import PostModal from "../../../components/Layouts/Dashboard/Posts/PostModal";

export default function Posts() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

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

  return (
    <div className="p-4">
      <PostTable onEdit={handleEdit} onCreate={handleCreate} />

      {/* Modal Form Tambah/Edit */}
      <PostModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        initialValues={editData || { title: "", content: "" }}
        onSubmit={() => {}}
      />
    </div>
  );
}
