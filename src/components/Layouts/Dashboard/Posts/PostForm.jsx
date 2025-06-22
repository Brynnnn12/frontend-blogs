import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const PostSchema = Yup.object().shape({
  title: Yup.string().required("Judul wajib diisi"),
  content: Yup.string().required("Konten wajib diisi"),
  category: Yup.string().required("Kategori wajib diisi"),
});

export default function PostForm({ initialValues, onSubmit, loading }) {
  const handleSubmit = (values, actions) => {
    onSubmit(values, actions);
    actions.setSubmitting(false);
    actions.resetForm(); // Reset form setelah submit
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PostSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div className="form-control">
            <label htmlFor="title" className="label font-medium text-gray-700">
              Judul Post
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              autoComplete="off"
              className="input input-bordered w-full bg-white text-gray-800"
              placeholder="Masukkan judul post..."
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="form-control">
            <label
              htmlFor="content"
              className="label font-medium text-gray-700"
            >
              Konten Post
            </label>
            <Field
              as="textarea"
              id="content"
              name="content"
              autoComplete="off"
              className="input input-bordered w-full bg-white text-gray-800 h-24 resize-none"
              placeholder="Tulis konten post Anda di sini..."
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="form-control">
            <label
              htmlFor="category"
              className="label font-medium text-gray-700"
            >
              Kategori Post
            </label>
            <Field
              type="text"
              id="category"
              name="category"
              autoComplete="off"
              className="input input-bordered w-full bg-white text-gray-800"
              placeholder="Masukkan kategori post..."
            />
            <ErrorMessage
              name="category"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div
            className="modal-action mt-6 flex justify-between
            items-center"
          >
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
