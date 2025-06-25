import { Link, useNavigate } from "react-router-dom";
import RegisterValidate from "./RegisterValidate"; // Importing validation schema
import { FaUserPlus } from "react-icons/fa"; // Importing an icon for the button
import { useDispatch } from "react-redux";
import { registerUser } from "../../../../store/Auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    const resultAction = await dispatch(registerUser(values));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/");
    }
    setSubmitting(false);
  };

  return (
    <>
      <RegisterValidate initialValues={initialValues} onSubmit={handleSubmit} />
    </>
  );
};

export default Register;
