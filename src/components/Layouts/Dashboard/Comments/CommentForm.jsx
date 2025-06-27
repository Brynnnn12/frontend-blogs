import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CommentForm({
  initialValues,
  onSubmit,
  loading,
  isEdit = false,
}) {
  // Schema validasi berbeda untuk edit dan create
  const CommentSchema = Yup.object().shape({
    content: Yup.string()
      .min(10, "Konten minimal 10 karakter")
      .required("Konten komentar wajib diisi"),
  });

  const handleSubmit = (values, actions) => {
    // Jika sedang edit, hanya kirim field yang boleh diubah
    const submitData = isEdit ? { content: values.content } : values;

    onSubmit(submitData, actions);
    actions.setSubmitting(false);
    // Reset form akan dilakukan di parent component jika berhasil
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
              rows="4"
              className="textarea textarea-bordered w-full bg-white text-gray-800"
              placeholder="Tulis komentar Anda..."
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
