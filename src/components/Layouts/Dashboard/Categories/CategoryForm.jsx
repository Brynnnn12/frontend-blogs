import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CategoryForm({ initialValues, onSubmit, loading }) {
  // Schema langsung di dalam file ini
  const CategorySchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Nama minimal 2 karakter")
      .required("Nama kategori wajib diisi"),
    description: Yup.string().max(300, "Deskripsi maksimal 300 karakter"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CategorySchema}
      onSubmit={(values, actions) => {
        onSubmit(values, actions);
        actions.resetForm(); // Optional: reset form setelah submit
      }}
      enableReinitialize
    >
      <Form className="space-y-4">
        <div className="form-control">
          <label className="label font-medium text-gray-700">
            Nama Kategori
          </label>
          <Field
            type="text"
            name="name"
            className="input input-bordered w-full bg-white text-gray-800"
            placeholder="Contoh: Interior, Eksterior"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="form-control">
          <label className="label font-medium text-gray-700">Deskripsi</label>
          <Field
            as="textarea"
            name="description"
            rows={3}
            className="textarea textarea-bordered w-full bg-white text-gray-800"
            placeholder="Deskripsi kategori (opsional)"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="modal-action mt-6 flex justify-between items-center">
          <div></div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
