import { useState } from "react";
import ProfileModal from "./ProfileModal";

export default function ProfilePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-gray-700 font-bold">Profil Pengguna</h2>
        <button onClick={handleEdit} className="btn btn-primary">
          Edit Profil
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-2">Informasi Profil</h3>
        // informasi user tapi pakai input disabled
        <div className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nama</span>
            </label>
            <input
              type="text"
              disabled
              value="John Doe" // Ganti dengan data user
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              disabled
              value="john.doe@example.com" // Ganti dengan data user
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>

      {/* Modal Form Edit Profil */}
      <ProfileModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        initialValues={editData || { name: "", email: "" }}
        onSubmit={() => {}}
      />
    </div>
  );
}
