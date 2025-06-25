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
            </label>{" "}
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
          </div>{" "}
          <div className="form-control">
            <label htmlFor="postId" className="label font-medium text-gray-700">
              Post ID
            </label>
            <Field
              type="text"
              id="postId"
              name="postId"
              readOnly={isEdit}
              className={`input input-bordered w-full text-gray-800 ${
                isEdit ? "bg-gray-100 cursor-not-allowed" : "bg-white"
              }`}
              placeholder={
                isEdit
                  ? "Post ID tidak dapat diubah"
                  : "ID Post yang dikomentari"
              }
            />
            <ErrorMessage
              name="postId"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
            {isEdit && (
              <div className="text-xs text-gray-500 mt-1">
                Post ID tidak dapat diubah saat edit
              </div>
            )}
          </div>
          <div className="form-control">
            <label htmlFor="userId" className="label font-medium text-gray-700">
              User ID
            </label>
            <Field
              type="text"
              id="userId"
              name="userId"
              readOnly={isEdit}
              className={`input input-bordered w-full text-gray-800 ${
                isEdit ? "bg-gray-100 cursor-not-allowed" : "bg-white"
              }`}
              placeholder={
                isEdit
                  ? "User ID tidak dapat diubah"
                  : "ID User yang berkomentar"
              }
            />
            <ErrorMessage
              name="userId"
              component="div"
              className="text-red-500 text-sm mt-1"
            />{" "}
            {isEdit && (
              <div className="text-xs text-gray-500 mt-1">
                User ID tidak dapat diubah saat edit
              </div>
            )}
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
