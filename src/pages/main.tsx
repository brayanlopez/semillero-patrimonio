import { useState } from "react";
import MainLayout from "../shared/layout/MainLayout";
import HomeSection from "../features/home/HomeSection";
import CatalogSection from "../features/catalog/CatalogSection";
import DetailSection from "../features/detail/DetailSection";
import AboutSection from "../features/about/AboutSection";
import {
  getCatalogRecordById,
  getCatalogRecords,
} from "../features/catalog/catalogService";
import type { PageId } from "../types/navigation";

const MainPage = () => {
  const [page, setPage] = useState<PageId>("home");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selected = getCatalogRecordById(selectedId) ?? getCatalogRecords()[0];

  const showPage = (id: PageId) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDetail = (id: number) => {
    setSelectedId(id);
    showPage("detail");
  };

  return (
    <MainLayout page={page} onNavigate={showPage}>
      <HomeSection active={page === "home"} onNavigate={showPage} />
      <CatalogSection active={page === "catalog"} onOpenDetail={openDetail} />
      <DetailSection
        active={page === "detail"}
        record={selected}
        onBack={() => showPage("catalog")}
      />
      <AboutSection active={page === "about"} />
    </MainLayout>
  );
};

export default MainPage;
