import { useState } from "react";

import CommentTable from "../../../components/Layouts/Dashboard/Comments/CommentTable";
import CommentModal from "../../../components/Layouts/Dashboard/Comments/CommentModal";

export default function Comments() {
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
      <CommentTable onEdit={handleEdit} onCreate={handleCreate} />

      {/* Modal Form Tambah/Edit */}
      <CommentModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        editData={editData}
        onSubmit={() => {}}
      />
    </div>
  );
}
