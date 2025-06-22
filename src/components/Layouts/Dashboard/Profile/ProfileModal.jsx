import ProfileForm from "./ProfileForm";

import { useState } from "react";

export default function ProfileModal({
  isOpen,
  onClose,
  initialValues,
  onSubmit,
}) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    await onSubmit(values);
    setLoading(false);
    actions.resetForm();
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h2 className="font-bold text-lg">Edit Profil</h2>
        <ProfileForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}
