import type { PageId } from "../../types/navigation";

type HeaderProps = {
  page: PageId;
  onNavigate: (id: PageId) => void;
};

const Header = ({ page, onNavigate }: HeaderProps) => {
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
        <nav aria-label="Navegación principal">
          <button
            className={page === "home" ? "active" : undefined}
            onClick={() => onNavigate("home")}
          >
            Inicio
          </button>
          <button
            className={page === "catalog" ? "active" : undefined}
            onClick={() => onNavigate("catalog")}
          >
            Catálogo
          </button>
          <button
            className={page === "about" ? "active" : undefined}
            onClick={() => onNavigate("about")}
          >
            El laboratorio
          </button>
          <button className="nav-cta" onClick={() => onNavigate("catalog")}>
            Explorar archivo ↗
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
