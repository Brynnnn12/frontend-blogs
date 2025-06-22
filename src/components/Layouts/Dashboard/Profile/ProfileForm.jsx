import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Nama wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
});

export default function ProfileForm({ initialValues, onSubmit, loading }) {
  const handleSubmit = (values, actions) => {
    onSubmit(values, actions);
    actions.setSubmitting(false);
    actions.resetForm(); // Reset form setelah submit
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProfileSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="form-control">
            <label htmlFor="name" className="label font-medium text-gray-700">
              Nama Lengkap
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              className="input input-bordered w-full bg-white text-gray-800"
              placeholder="Masukkan nama lengkap Anda..."
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="form-control">
            <label htmlFor="email" className="label font-medium text-gray-700">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              className="input input-bordered w-full bg-white text-gray-800"
              placeholder="Masukkan email Anda..."
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="form-control">
            <label
              htmlFor="password"
              className="label font-medium text-gray-700"
            >
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              className="input input-bordered w-full bg-white text-gray-800"
              placeholder="Masukkan password baru..."
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="form-control">
            <label
              htmlFor="confirmPassword"
              className="label font-medium text-gray-700"
            >
              Konfirmasi Password
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="off"
              className="input input-bordered w-full bg-white text-gray-800"
              placeholder="Konfirmasi password baru..."
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="modal-action mt-6 flex justify-between items-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || isSubmitting}
            >
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
