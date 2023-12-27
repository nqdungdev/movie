import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={`max-w-[1182px] w-full mx-auto p-5 ${className && className}`}
    >
      {children}
    </div>
  );
};

export default Container;
