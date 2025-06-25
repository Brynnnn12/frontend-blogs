import { Link, useNavigate } from "react-router-dom";
import LoginValidate from "./LoginValidate";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../store/Auth/authSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValue = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const resultAction = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/");
    }

    setSubmitting(false);
  };

  return (
    <>
      <LoginValidate initialValues={initialValue} onSubmit={handleSubmit} />
    </>
  );
}
