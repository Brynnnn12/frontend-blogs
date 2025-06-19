import { useState } from "react";
import Input from "../Input";

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input {...props} type={showPassword ? "text" : "password"} />
      <button
        type="button"
        className="absolute right-3 top-10 transform -translate-y-1/2"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "🙈" : "👁️"}
      </button>
    </div>
  );
};

export default PasswordInput;
