import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CommentSchema = Yup.object().shape({
  content: Yup.string().required("Konten komentar wajib diisi"),
});

export default function CommentForm({ initialValues, onSubmit, loading }) {
  const handleSubmit = (values, actions) => {
    onSubmit(values, actions);
    actions.setSubmitting(false);
    actions.resetForm(); // Reset form setelah submit
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CommentSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="form-control">
            <label
              htmlFor="content"
              className="label font-medium text-gray-700"
            >
              Konten Komentar
            </label>
            <Field
              as="textarea"
              id="content"
              name="content"
              autoComplete="off"
              className="input input-bordered w-full bg-white text-gray-800 h-24 resize-none"
              placeholder="Tulis komentar Anda di sini..."
            />
            <ErrorMessage
              name="content"
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
