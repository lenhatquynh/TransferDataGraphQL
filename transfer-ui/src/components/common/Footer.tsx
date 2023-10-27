import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1f2d3f] p-4 text-center">
      <img
        src="/PTN-Global_logo.png"
        alt="Company Logo"
        className="h-auto w-auto mx-auto"
      />
      <p className="mt-2">&copy; 2023 PTN Global Corp Company</p>
    </footer>
  );
};
