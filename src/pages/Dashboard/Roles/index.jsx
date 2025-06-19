import React, { useState } from "react";
import RoleTable from "../../../components/Layouts/Dashboard/Roles/RoleTable";
import RoleModal from "../../../components/Layouts/Dashboard/Roles/RoleModal";

export default function Roles() {
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
      <RoleTable onEdit={handleEdit} onCreate={handleCreate} />

      {/* Modal Form Tambah/Edit */}
      <RoleModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        data={editData}
      />
    </div>
  );
}
