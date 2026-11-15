import PageSection from "../../shared/ui/PageSection";
import FeatureCard from "./FeatureCard";
import { workLines } from "../about/workLines";
import { getProjects } from "../projects/projectService";
import type { PageId } from "../../types/navigation";

type HomeSectionProps = {
  active: boolean;
  onNavigate: (id: PageId) => void;
  onOpenProject: (slug: string) => void;
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

const HomeSection = ({
  active,
  onNavigate,
  onOpenProject,
}: HomeSectionProps) => {
  const projects = getProjects();

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
      <section className="work-lines">
        <div className="section-head">
          <div>
            <div className="kicker">Qué hacemos</div>
            <h2>Líneas de trabajo</h2>
          </div>
          <button className="text-link" onClick={() => onNavigate("about")}>
            Conocer el laboratorio ↗
          </button>
        </div>
        <div className="work-lines-grid">
          {workLines.map((line) => (
            <article className="work-line" key={line.id}>
              <div className="index">{line.id}</div>
              <h3>{line.title}</h3>
            </article>
          ))}
        </div>
      </section>
      <section className="featured-projects">
        <div className="section-head">
          <div>
            <div className="kicker">Investigación en curso</div>
            <h2>Proyectos en desarrollo</h2>
          </div>
          <button className="text-link" onClick={() => onNavigate("projects")}>
            Ver todos los proyectos ↗
          </button>
        </div>
        {projects.map((project) => (
          <article className="project-feature" key={project.slug}>
            <div className="project-feature-visual">
              {project.image ? (
                <img
                  className="project-image"
                  src={project.image.src}
                  alt={project.image.alt}
                />
              ) : (
                <div className="project-reel" aria-hidden="true"></div>
              )}
              <span className="project-visual-tag">{project.category}</span>
            </div>
            <div className="project-feature-body">
              <div className="meta">{project.status ?? project.category}</div>
              <h3>{project.title}</h3>
              <p className="project-feature-subtitle">{project.subtitle}</p>
              <p className="project-feature-copy">{project.shortDescription}</p>
              <button
                className="btn"
                onClick={() => onOpenProject(project.slug)}
              >
                Conocer el proyecto ↗
              </button>
            </div>
          </article>
        ))}
      </section>
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
          <div className="about-copy">
            <p>
              El Laboratorio de Patrimonio Audiovisual y Tecnológico de la
              Facultad de Artes de la Universidad Nacional de Colombia articula
              preservación, investigación, formación y divulgación en torno a
              las colecciones audiovisuales y tecnológicas de la Universidad.
            </p>
            <button className="text-link" onClick={() => onNavigate("about")}>
              Ir al laboratorio ↗
            </button>
          </div>
        </div>
      </section>
    </PageSection>
  );
};

export default HomeSection;
