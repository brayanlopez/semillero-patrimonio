import { useState, useEffect } from "react";
import type { PageId } from "../../types/navigation";

type HeaderProps = {
  page: PageId;
  onNavigate: (id: PageId) => void;
};

const Header = ({ page, onNavigate }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu when navigation happens
  const handleNavigate = (id: PageId) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [mobileMenuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const header = document.querySelector("header");
      if (mobileMenuOpen && header && !header.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [mobileMenuOpen]);

  return (
    <header>
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

        {/* Hamburger menu button (mobile only) */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menú de navegación"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          <span className="hamburger">
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </span>
        </button>

        {/* Desktop navigation */}
        <nav
          className="desktop-nav"
          aria-label="Navegación principal"
        >
          <button
            className={page === "home" ? "active" : undefined}
            onClick={() => handleNavigate("home")}
          >
            Inicio
          </button>
          <button
            className={page === "catalog" ? "active" : undefined}
            onClick={() => handleNavigate("catalog")}
          >
            Catálogo
          </button>
          <button
            className={page === "about" ? "active" : undefined}
            onClick={() => handleNavigate("about")}
          >
            El laboratorio
          </button>
          <button className="nav-cta" onClick={() => handleNavigate("catalog")}>
            Explorar archivo ↗
          </button>
        </nav>

        {/* Mobile navigation */}
        <nav
          id="mobile-nav"
          className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}
          aria-label="Navegación móvil"
        >
          <button
            className={page === "home" ? "active" : undefined}
            onClick={() => handleNavigate("home")}
          >
            Inicio
          </button>
          <button
            className={page === "catalog" ? "active" : undefined}
            onClick={() => handleNavigate("catalog")}
          >
            Catálogo
          </button>
          <button
            className={page === "about" ? "active" : undefined}
            onClick={() => handleNavigate("about")}
          >
            El laboratorio
          </button>
          <button className="nav-cta" onClick={() => handleNavigate("catalog")}>
            Explorar archivo ↗
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
