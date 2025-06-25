import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function LoginValidate({
  initialValues,
  validationSchema,
  onSubmit,
}) {
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    password: Yup.string()
      .min(6, "Password minimal 6 karakter")
      .required("Password wajib diisi"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema || loginSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <Field
            name="email"
            type="email"
            className="input input-bordered w-full bg-white text-gray-800"
            placeholder="Email"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-sm"
          />

          <Field
            name="password"
            type="password"
            className="input input-bordered w-full bg-white text-gray-800"
            placeholder="Password"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500 text-sm"
          />

          <button
            type="submit"
            className={`btn btn-primary w-full ${
              isSubmitting ? "loading" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
