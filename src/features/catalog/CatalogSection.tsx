import { useState, useEffect } from "react";
import PageSection from "../../shared/ui/PageSection";
import FilterSidebar from "./FilterSidebar";
import RecordCard from "./RecordCard";
import RecordTable from "./RecordTable";
import { filterCatalogRecords } from "./catalogService";
import type { CatalogFilters } from "../../types/catalog";

type CatalogSectionProps = {
  active: boolean;
  onOpenDetail: (id: number) => void;
};

type CatalogLayout = "cards" | "table";

const emptyFilters: CatalogFilters = { support: "", type: "", period: "" };

const CatalogSection = ({ active, onOpenDetail }: CatalogSectionProps) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<CatalogFilters>(emptyFilters);
  const [layout, setLayout] = useState<CatalogLayout>("cards");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // On mobile, always show cards. On desktop/tablet, respect the user's choice
  const effectiveLayout = isMobile ? "cards" : layout;

  const filtered = filterCatalogRecords(query, filters);

  const updateFilter = (key: keyof CatalogFilters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const clearFilters = () => {
    setQuery("");
    setFilters(emptyFilters);
  };

  const toggleLayout = () => {
    setLayout((current) => (current === "cards" ? "table" : "cards"));
  };

  return (
    <PageSection id="catalog" active={active}>
      <div className="catalog-head">
        <div className="kicker">Archivo / Consulta pública</div>
        <h1>Catálogo audiovisual</h1>
      </div>
      <div className="catalog-layout">
        <FilterSidebar
          filters={filters}
          onChange={updateFilter}
          onClear={clearFilters}
        />
        <div>
          <div className="results-top">
            <div className="searchbox">
              <span>⌕</span>
              <input
                placeholder="Buscar por título, autor, tema o código…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="results-controls">
              <div className="result-count">
                {String(filtered.length).padStart(2, "0")} REGISTROS
              </div>
              {!isMobile && (
                <button
                  type="button"
                  className="view-toggle-btn"
                  onClick={toggleLayout}
                  aria-label={
                    layout === "cards"
                      ? "Cambiar a vista de tabla"
                      : "Cambiar a vista de tarjetas"
                  }
                >
                  {layout === "cards" ? "Vista tabla ☰" : "Vista tarjetas ⊞"}
                </button>
              )}
            </div>
          </div>
          {filtered.length ? (
            effectiveLayout === "cards" ? (
              <div className="catalog-grid">
                {filtered.map((record, index) => (
                  <RecordCard
                    key={record.id}
                    record={record}
                    index={index}
                    onOpen={onOpenDetail}
                  />
                ))}
              </div>
            ) : (
              <RecordTable records={filtered} onOpen={onOpenDetail} />
            )
          ) : (
            <div className="empty">
              No encontramos registros con esos criterios.
              <br />
              Prueba con otros términos o limpia los filtros.
            </div>
          )}
        </div>
      </div>
    </PageSection>
  );
};

export default CatalogSection;
