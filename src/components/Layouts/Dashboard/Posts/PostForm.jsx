import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../store/Categories/categorySlice";

const PostSchema = Yup.object().shape({
  title: Yup.string().required("Judul wajib diisi"),
  content: Yup.string().required("Konten wajib diisi"),
  categoryId: Yup.string()
    .required("Kategori wajib dipilih")
    .matches(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      "ID Kategori harus berupa UUID yang valid"
    ),
  image: Yup.mixed()
    .nullable()
    .test("fileSize", "File terlalu besar (max 5MB)", (value) => {
      if (!value) return true;
      return value.size <= 5000000;
    })
    .test(
      "fileType",
      "Format file tidak valid (hanya JPG, PNG, GIF)",
      (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
      }
    ),
});

export default function PostForm({ initialValues, onSubmit, loading }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [imagePreview, setImagePreview] = useState(initialValues.image || null);

  // Load categories when component mounts
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Update preview when initialValues change (for edit mode)
  useEffect(() => {
    if (initialValues.image && typeof initialValues.image === "string") {
      setImagePreview(initialValues.image);
    } else {
      setImagePreview(null);
    }
  }, [initialValues.image]);

  const handleSubmit = (values, actions) => {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    // Keep categoryId as UUID string (don't parseInt!)
    formData.append("categoryId", values.categoryId);

    // Only append image if it exists and is a File object
    if (values.image && values.image instanceof File) {
      formData.append("image", values.image);
    }

    onSubmit(formData, actions);
    actions.setSubmitting(false);
    actions.resetForm();
    setImagePreview(null);
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setFieldValue("image", file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PostSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, setFieldValue }) => (
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
              htmlFor="categoryId"
              className="label font-medium text-gray-700"
            >
              Kategori Post
            </label>
            <Field
              as="select"
              id="categoryId"
              name="categoryId"
              className="select select-bordered w-full bg-white text-gray-800"
            >
              <option value="">Pilih kategori...</option>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading categories...</option>
              )}
            </Field>
            <ErrorMessage
              name="categoryId"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div className="form-control">
            <label htmlFor="image" className="label font-medium text-gray-700">
              Upload Gambar (Opsional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/jpeg,image/png,image/gif"
              onChange={(event) => handleImageChange(event, setFieldValue)}
              className="file-input file-input-bordered w-full bg-white"
            />
            <div className="text-xs text-gray-500 mt-1">
              Format: JPG, PNG, GIF. Maksimal 5MB
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-3">
                <label className="label">
                  <span className="label-text font-medium text-gray-700">
                    Preview:
                  </span>
                </label>
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFieldValue("image", null);
                    }}
                    className="absolute -top-2 -right-2 btn btn-circle btn-xs btn-error"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            <ErrorMessage
              name="image"
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
