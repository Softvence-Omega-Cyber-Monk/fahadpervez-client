import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export interface ButtonProps {
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  type:string,
  className?: string;
<<<<<<< HEAD
=======
  disabled?: boolean;
>>>>>>> 04e8881909da2c316796f778f38163540d21c380
}


const PrimaryButton: React.FC<ButtonProps> = ({
  title,
  leftIcon,
  rightIcon,
  onClick,
  type,
  className = "",
<<<<<<< HEAD
=======
  disabled,
>>>>>>> 04e8881909da2c316796f778f38163540d21c380
}) => {
  return (
    <Button
      onClick={onClick}
<<<<<<< HEAD
      className={`flex items-center justify-center gap-1 px-5 py-6 font-medium  capitalize rounded-xl focus:outline-none text-lg cursor-pointer ${
        type === "Primary"
          ? "bg-primary-blue"
          : type === "Outline" 
          ? "text-accent bg-accent-foreground border border-accent"
=======
      className={`flex items-center justify-center gap-1 px-6 py-6 font-medium  capitalize rounded-xl focus:outline-none lg:text-lg cursor-pointer ${
        type === "Primary"
          ? "bg-primary-blue text-primary-background "
          : type === "Outline" 
          ? "text-primary-blue border border-primary-blue"
>>>>>>> 04e8881909da2c316796f778f38163540d21c380
          : type === "Badge"
          ? "text-dark-Blue bg-light-Gray text-sm  px-4 py-1 rounded-bl-full rounded-tl-full rounded-tr-full rounded-br-full"
          : type === "Icon"
          ? " text-light-Gray size-12 rounded-full border border-light-Gray p-3"  
          : ""
      }  ${className}`}
<<<<<<< HEAD
=======
      disabled={disabled}
>>>>>>> 04e8881909da2c316796f778f38163540d21c380
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {title && <span>{title}</span>}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </Button>
  );
};

export default PrimaryButton;