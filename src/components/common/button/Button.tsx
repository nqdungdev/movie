import React, { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode | string;
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, className, onClick, ...props }: Props) => {
  return (
    <button
      className={`text-white bg-secondary px-4 py-1 border-none flex justify-center items-center text-sm rounded-md leading-9 hover:bg-[#263238] transition-all duration-300 ${
        className && className
      }`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
