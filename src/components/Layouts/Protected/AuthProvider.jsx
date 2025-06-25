// src/components/Layouts/Protected/AuthProvider.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../store/Auth/authSlice";
import LoadingSpinner from "../../Animations/LoadingSpinner";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(getUser());
      setChecked(true);
    };
    checkAuth();
  }, [dispatch]);

  if (!checked || loading) {
    return <LoadingSpinner />;
  }

  return children;
}
