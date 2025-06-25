import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema untuk form gabungan
const ProfileFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Username minimal 2 karakter")
    .required("Username wajib diisi"),
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  currentPassword: Yup.string().when("newPassword", {
    is: (newPassword) => newPassword && newPassword.length > 0,
    then: (schema) =>
      schema.required(
        "Password saat ini wajib diisi jika ingin mengubah password"
      ),
    otherwise: (schema) => schema.notRequired(),
  }),
  newPassword: Yup.string()
    .min(6, "Password baru minimal 6 karakter")
    .notRequired(),
  confirmPassword: Yup.string().when("newPassword", {
    is: (newPassword) => newPassword && newPassword.length > 0,
    then: (schema) =>
      schema
        .oneOf(
          [Yup.ref("newPassword"), null],
          "Konfirmasi password tidak cocok"
        )
        .required("Konfirmasi password wajib diisi"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default function ProfileForm({
  initialValues,
  onSubmit,
  loading,
  error,
}) {
  const handleSubmit = async (values, actions) => {
    try {
      // Validasi manual untuk password
      if (values.newPassword && !values.currentPassword) {
        actions.setFieldError(
          "currentPassword",
          "Password saat ini wajib diisi jika ingin mengubah password"
        );
        actions.setSubmitting(false);
        return;
      }

      if (values.currentPassword && !values.newPassword) {
        actions.setFieldError(
          "newPassword",
          "Password baru wajib diisi jika Anda mengisi password saat ini"
        );
        actions.setSubmitting(false);
        return;
      }

      // Buat data yang akan dikirim
      const submitData = {
        username: values.username,
        email: values.email,
      };

      // Tambahkan password fields hanya jika ada perubahan password
      if (values.currentPassword && values.newPassword) {
        submitData.currentPassword = values.currentPassword;
        submitData.newPassword = values.newPassword;
      }

      await onSubmit(submitData, actions);

      // Reset password fields setelah berhasil
      actions.setFieldValue("currentPassword", "");
      actions.setFieldValue("newPassword", "");
      actions.setFieldValue("confirmPassword", "");
    } catch (error) {
      console.error("Failed to submit profile:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-purple-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Ubah Profil & Password
      </h2>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <Formik
        initialValues={{
          username: initialValues?.username || "",
          email: initialValues?.email || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={ProfileFormSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, values }) => (
          <Form className="space-y-5">
            {/* Profile Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                  placeholder="Masukkan username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full text-gray-800 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                  placeholder="Masukkan email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Password Section */}
            <div className="border-t pt-5">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                Ubah Password (Opsional)
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Kosongkan field password jika tidak ingin mengubah password
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password Saat Ini
                  </label>
                  <Field
                    type="password"
                    name="currentPassword"
                    className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    placeholder="Masukkan password saat ini"
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password Baru
                  </label>
                  <Field
                    type="password"
                    name="newPassword"
                    className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    placeholder="Masukkan password baru"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Konfirmasi Password Baru
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    placeholder="Konfirmasi password baru"
                    disabled={!values.newPassword}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg shadow-md transition duration-300 flex items-center"
                disabled={loading || isSubmitting}
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {loading || isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
