import PageSection from "../../shared/ui/PageSection";
import FeatureCard from "./FeatureCard";
import type { PageId } from "../../types/navigation";

type HomeSectionProps = {
  active: boolean;
  onNavigate: (id: PageId) => void;
};

const stats = [
  { number: "01", label: "Memoria audiovisual" },
  { number: "02", label: "Conservación y tecnología" },
  { number: "03", label: "Consulta e investigación" },
];

const features = [
  {
    imageClass: "",
    small: "01 / SOPORTES",
    meta: "Materialidad",
    title: "Los soportes cuentan historias",
    description:
      "De los formatos magnéticos a los medios ópticos: cada soporte conserva una parte de la historia técnica de la imagen.",
    foot: "U-MATIC · VHS · DVD",
  },
  {
    imageClass: "red",
    small: "02 / OBRAS",
    meta: "Creación audiovisual",
    title: "Obras, autores y contextos",
    description:
      "Un recorrido por materiales de creación, registro y memoria, relacionados con sus autores y contextos.",
    foot: "DOCUMENTAL · FICCIÓN",
  },
  {
    imageClass: "ochre",
    small: "03 / PATRIMONIO",
    meta: "Preservación",
    title: "Conservar para consultar",
    description:
      "La descripción documental permite reconocer los materiales y facilitar su búsqueda e investigación.",
    foot: "DESCRIPCIÓN · ACCESO",
  },
];

const HomeSection = ({ active, onNavigate }: HomeSectionProps) => {
  return (
    <PageSection id="home" active={active}>
      <div className="hero">
        <div>
          <div className="kicker">Memoria · Imagen · Tecnología</div>
          <h1>
            Un archivo vivo para <em>mirar</em> nuestra memoria audiovisual.
          </h1>
          <p className="hero-copy">
            El Laboratorio conserva, estudia y pone en diálogo materiales
            audiovisuales y tecnológicos. Un espacio para explorar los soportes,
            las obras y las huellas materiales de nuestra cultura visual.
          </p>
          <div className="actions">
            <button className="btn" onClick={() => onNavigate("catalog")}>
              Explorar el catálogo ↗
            </button>
            <button
              className="btn secondary"
              onClick={() => onNavigate("about")}
            >
              Conocer el laboratorio
            </button>
          </div>
        </div>
        <div className="hero-art">
          <div className="art-label">COLECCIÓN / ARCHIVO AUDIOVISUAL</div>
          <div className="reel">
            <div className="reel-hole"></div>
          </div>
          <div className="hero-note">ESCUELA DE CINE Y TELEVISIÓN · BOGOTÁ</div>
          <div className="art-bottom">
            <div>
              <strong>La memoria también tiene soporte.</strong>Un patrimonio
              que se conserva, consulta y transforma.
            </div>
            <span>UNAL / 2026</span>
          </div>
        </div>
      </div>
      <div className="stats">
        {stats.map((stat) => (
          <div className="stat" key={stat.number}>
            <strong>{stat.number}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
      <section className="featured">
        <div className="section-head">
          <div>
            <div className="kicker">Una ventana al archivo</div>
            <h2>Explorar la colección</h2>
          </div>
          <button className="text-link" onClick={() => onNavigate("catalog")}>
            Ver catálogo completo ↗
          </button>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <FeatureCard key={feature.small} {...feature} />
          ))}
        </div>
      </section>
      <section className="about-band">
        <div className="about-inner">
          <div>
            <div className="kicker">El laboratorio</div>
            <h2>Investigar también es una forma de preservar.</h2>
          </div>
          <p>
            El Laboratorio de Patrimonio Audiovisual y Tecnológico de la Escuela
            de Cine y Televisión de la Universidad Nacional de Colombia trabaja
            alrededor de la identificación, organización, conservación y
            consulta de materiales vinculados con la memoria audiovisual. Este
            portal es una puerta de entrada a sus colecciones y procesos.
          </p>
        </div>
      </section>
    </PageSection>
  );
};

export default HomeSection;
