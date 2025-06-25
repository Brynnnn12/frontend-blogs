import { Link } from "react-router-dom";
import LoginForm from "../../../components/Layouts/Auth/Login/LoginForm";

export default function Login() {
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-sm text-gray-600">Please login to your account</p>
      </div>
      <LoginForm />
      <div className="mt-4 text-center">
        <Link
          to="/register"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          Don't have an account? Register here
        </Link>
      </div>
    </>
  );
}
