import { useEffect, useRef, useState } from "react";
import type { PageId } from "../../types/navigation";

type HeaderProps = {
  page: PageId;
  onNavigate: (id: PageId) => void;
};

type NavigationMenuProps = {
  page: PageId;
  onNavigate: (id: PageId) => void;
};

const NAV_ITEMS: ReadonlyArray<{ id: PageId; label: string }> = [
  { id: "home", label: "Inicio" },
  { id: "catalog", label: "Catálogo" },
  { id: "projects", label: "Proyectos" },
  { id: "about", label: "El laboratorio" },
];

const NavigationMenu = ({ page, onNavigate }: NavigationMenuProps) => (
  <>
    {NAV_ITEMS.map(({ id, label }) => (
      <button
        key={id}
        className={page === id ? "active" : undefined}
        aria-current={page === id ? "page" : undefined}
        onClick={() => onNavigate(id)}
      >
        {label}
      </button>
    ))}
    <button className="nav-cta" onClick={() => onNavigate("catalog")}>
      Explorar archivo ↗
    </button>
  </>
);

const Header = ({ page, onNavigate }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const handleNavigate = (id: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header ref={headerRef}>
      <div className="header-inner">
        <div className="brand">
          <img src="/favicon.svg" alt="LP" className="brand-mark" />
          <div className="brand-name">
            Laboratorio de Patrimonio
            <br />
            Audiovisual y Tecnológico
            <span>Escuela de Cine y Televisión · UNAL</span>
          </div>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={
            mobileMenuOpen
              ? "Cerrar menú de navegación"
              : "Abrir menú de navegación"
          }
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          <span className="hamburger">
            <span className="line line-1" />
            <span className="line line-2" />
            <span className="line line-3" />
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <NavigationMenu page={page} onNavigate={handleNavigate} />
        </nav>

        <nav
          id="mobile-nav"
          className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}
          aria-label="Navegación móvil"
        >
          <NavigationMenu page={page} onNavigate={handleNavigate} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
