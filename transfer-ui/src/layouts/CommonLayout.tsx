import React from "react";
import { Header, Footer } from "../components";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex flex-col h-screen bg-slate-700">
      <Header />
      <div className="flex-grow relative my-3 mx-5">
        <Toaster />
        {children}
      </div>
      <Footer />
    </div>
  );
};
