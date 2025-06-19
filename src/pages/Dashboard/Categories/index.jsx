import React, { useState } from "react";
import CategoryTable from "../../../components/Layouts/Dashboard/Categories/CategoryTable";
import CategoryModal from "../../../components/Layouts/Dashboard/Categories/CategoryModal";

export default function Categories() {
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
      <CategoryTable onEdit={handleEdit} onCreate={handleCreate} />

      {/* Modal Form Tambah/Edit */}
      <CategoryModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        data={editData}
      />
    </div>
  );
}
