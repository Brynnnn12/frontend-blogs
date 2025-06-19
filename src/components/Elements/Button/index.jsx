export default function Button({
  children,
  variant = "primary",
  size = "md",
  isFullWidth = false,
  isDisabled = false,
  isLoading = false,
  className = "",
  onClick,
  type = "button",
  leftIcon,
  rightIcon,
  rounded = "md",
  ...restProps
}) {
  // Mapping untuk variant
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700",
    success: "bg-green-600 hover:bg-green-700",
    danger: "bg-red-600 hover:bg-red-700",
    warning: "bg-yellow-600 hover:bg-yellow-700",
    info: "bg-indigo-600 hover:bg-indigo-700",
    light: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    dark: "bg-gray-800 hover:bg-gray-900",
    link: "bg-transparent text-blue-600 hover:text-blue-700 hover:underline p-0",
  };

  // Mapping untuk ukuran
  const sizeClasses = {
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-5 py-2.5",
    xl: "text-xl px-6 py-3",
  };

  // Mapping untuk rounded
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  // Menggabungkan semua kelas
  const buttonClasses = `
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.md}
    ${roundedClasses[rounded] || roundedClasses.md}
    ${isFullWidth ? "w-full" : ""}
    ${isDisabled || isLoading ? "opacity-60 cursor-not-allowed" : ""}
    transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-300
    ${className}
  `;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      {...restProps}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Sedang Memproses...
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
