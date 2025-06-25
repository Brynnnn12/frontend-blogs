import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useProfile } from "../../../../hooks/Profile/useProfile";
import ProfileForm from "./ProfileForm";

// Validation schema untuk delete account
const DeleteAccountSchema = Yup.object().shape({
  password: Yup.string().required("Password wajib diisi"),
  confirmation: Yup.boolean().oneOf([true], "Anda harus mencentang konfirmasi"),
});

export default function ProfilePage() {
  const { profile, loading, error, getProfile, updateProfile, deleteAccount } =
    useProfile(); // Load profile data on component mount
  useEffect(() => {
    getProfile();
  }, [getProfile]); // Sekarang getProfile sudah di-memoize dengan useCallback
  // Form submit handlers
  const handleProfileFormSubmit = async (values, { setSubmitting }) => {
    try {
      await updateProfile(values).unwrap();
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSubmit = async (values, { setSubmitting }) => {
    try {
      await deleteAccount({ password: values.password }).unwrap();
    } catch (error) {
      console.error("Failed to delete account:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 ml-4">Profil Saya</h1>
        </div>
        {/* Informasi Pengguna */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Informasi Akun
            </h2>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Aktif
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {" "}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Nama Lengkap</p>
              <p className="text-gray-800 font-semibold">
                {profile?.username || "Tidak tersedia"}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Email</p>
              <p className="text-gray-800 font-semibold">
                {profile?.email || "Tidak tersedia"}
              </p>
            </div>
          </div>{" "}
        </div>

        {/* Profile Form - Gabungan Profile + Password */}
        <ProfileForm
          initialValues={{
            username: profile?.username || profile?.name || "",
            email: profile?.email || "",
          }}
          onSubmit={handleProfileFormSubmit}
          loading={loading}
          error={error}
        />
        {/* Hapus Akun */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
          <div className="flex items-start mb-4">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Hapus Akun
              </h2>
              <p className="text-red-600 text-sm mt-1">
                PERINGATAN: Tindakan ini akan menghapus semua data Anda secara
                permanen dan tidak dapat dikembalikan!
              </p>
            </div>
          </div>

          <Formik
            initialValues={{
              password: "",
              confirmation: false,
            }}
            validationSchema={DeleteAccountSchema}
            onSubmit={handleDeleteSubmit}
          >
            {({ isSubmitting, values }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Konfirmasi Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                    placeholder="Masukkan password Anda"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="confirmation"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="confirmation"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Saya mengerti bahwa semua data saya akan dihapus secara
                    permanen
                  </label>
                </div>
                <ErrorMessage
                  name="confirmation"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg shadow-md transition duration-300 disabled:opacity-50 flex items-center"
                    disabled={loading || isSubmitting || !values.confirmation}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    {loading || isSubmitting
                      ? "Menghapus..."
                      : "Hapus Akun Saya"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
