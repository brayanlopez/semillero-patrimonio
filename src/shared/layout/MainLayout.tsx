import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import type { PageId } from "../../types/navigation";

type MainLayoutProps = {
  page: PageId;
  onNavigate: (id: PageId) => void;
  children: ReactNode;
};

const MainLayout = ({ page, onNavigate, children }: MainLayoutProps) => {
  return (
    <>
      <div className="topline"></div>
      <Header page={page} onNavigate={onNavigate} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
