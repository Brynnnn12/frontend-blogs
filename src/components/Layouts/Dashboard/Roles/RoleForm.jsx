import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RoleSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Nama minimal 2 karakter")
    .required("Nama role wajib diisi"),
});

export default function RoleForm({ initialValues, onSubmit, loading }) {
  const handleSubmit = (values, actions) => {
    onSubmit(values, actions);
    actions.setSubmitting(false);
    actions.resetForm(); // Reset form setelah submit
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RoleSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="form-control">
            <label htmlFor="name" className="label font-medium text-gray-700">
              Nama Role
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              autoComplete="off"
              className="input input-bordered w-full bg-white text-gray-800"
              placeholder="Contoh: Admin, User, Editor"
            />
            <ErrorMessage
              name="name"
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
