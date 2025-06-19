const SelectInput = ({
  id,
  label,
  options,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = "",
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
      <select
        id={id}
        className="select select-bordered w-full"
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
      >
        <option value="" disabled>
          Pilih opsi
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default SelectInput;
