import React from "react";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  ...rest
}) => {
  const defaultClassName =
    "px-6 py-4 bg-[#0082FA] rounded-lg text-sm cursor-pointer";
    

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${defaultClassName} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
