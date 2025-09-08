import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";

interface BasicLayoutProps {
  children: React.ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NLZBTPDJ"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      <Header theme="light" />
      <main className="">{children}</main>
      <Footer />
    </>
  );
};

export default BasicLayout;
