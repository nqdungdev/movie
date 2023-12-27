import React, { ReactNode } from "react";

type Props = {
  children: ReactNode | string;
  className?: string;
};

const AsideTitle = ({ children, className }: Props) => {
  return (
    <h3
      className={`relative w-full text-white text-sm font-normal pb-3 mb-5 before:absolute before:left-0 before:bottom-0 before:h-[1px] before:w-full before:bg-[#696969] before:opacity-20 after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-[30px] after:bg-[#b5e745] ${
        className && className
      }`}
    >
      {children}
    </h3>
  );
};

export default AsideTitle;
