import React from "react";

type ButtonType = {
  children: React.ReactNode;
  color: string;
  hoverColor: string;
  onClick?: () => void;
  icon: React.ReactNode;
};

function Button({ children, color, hoverColor, onClick, icon }: ButtonType) {
  return (
    <button
      className={`flex items-center gap-[6px] rounded-full px-4 py-[6px] text-sm text-white ${color} ${hoverColor}`}
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  );
}

export default Button;
