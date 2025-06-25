import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  getProfile,
  updateProfile,
  deleteAccount,
  resetProfileState,
  clearError,
} from "../../store/Profile/profileSlice";

export const useProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error, success, accountDeleteSuccess } =
    useSelector((state) => state.profile);

  const handleGetProfile = useCallback(() => {
    return dispatch(getProfile());
  }, [dispatch]);

  const handleUpdateProfile = useCallback(
    (profileData) => {
      return dispatch(updateProfile(profileData));
    },
    [dispatch]
  );

  const handleDeleteAccount = useCallback(
    (passwordData) => {
      return dispatch(deleteAccount(passwordData));
    },
    [dispatch]
  );
  const handleResetState = useCallback(() => {
    dispatch(resetProfileState());
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    profile,
    loading,
    error,
    success,
    accountDeleteSuccess,
    getProfile: handleGetProfile,
    updateProfile: handleUpdateProfile,
    deleteAccount: handleDeleteAccount,
    resetState: handleResetState,
    clearError: handleClearError,
  };
};
