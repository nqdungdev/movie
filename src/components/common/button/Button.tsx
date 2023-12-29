import React, { ReactNode } from "react";

type Props = {
  children: ReactNode | string;
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, className, onClick }: Props) => {
  return (
    <button
      className={`text-white bg-secondary px-4 py-1 border-none flex justify-center items-center text-sm rounded-md leading-9 hover:bg-[#263238] transition-all duration-300 ${
        className && className
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
