const Input = ({
  id,
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = "",
  size = "md", // 'xs', 'sm', 'md', 'lg'
}) => {
  return (
    <div className={`form-control ${className}`}>
      {label && (
        <label htmlFor={id} className="label">
          <span className="label-text">
            {label}
            {required && <span className="text-error"> *</span>}
          </span>
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`input input-bordered input-${size} w-full`}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default Input;
