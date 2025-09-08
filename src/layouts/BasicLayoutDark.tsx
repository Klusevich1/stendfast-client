import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useEffect } from "react";
import FooterLogo from "@/components/FooterLogo";

interface BasicLayoutDarkProps {
  children: React.ReactNode;
}

const BasicLayoutDark: React.FC<BasicLayoutDarkProps> = ({ children }) => {
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('prefers-color-scheme', 'dark'); // Устанавливаем тему
  }, []);
  return (
    <div className="bg-black text-white">
      <Header theme="dark"/>
      <main className="">{children}</main>
      <Footer />
    </div>
  );
};

export default BasicLayoutDark;
