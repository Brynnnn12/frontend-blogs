import { Link } from "react-router-dom";
import RegisterForm from "../../../components/Layouts/Auth/Register/RegisterForm";

export default function Register() {
  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
        <p className="text-sm text-gray-600">Join us today!</p>
      </div>
      <RegisterForm />
      <div className="mt-4 text-center">
        <Link to="/login" className="text-blue-600 hover:text-blue-800 text-sm">
          Already have an account? Login here
        </Link>
      </div>
    </>
  );
}
