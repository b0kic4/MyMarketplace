import React from "react";
import Navbar from "../components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div>{children}</div>
    </main>
  );
};

export default Layout;
