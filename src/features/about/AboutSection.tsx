import PageSection from "../../shared/ui/PageSection";
import type { PageId } from "../../types/navigation";
import { workLines } from "./workLines";

type AboutSectionProps = {
  active: boolean;
  onNavigate?: (id: PageId) => void;
};

const AboutSection = ({ active, onNavigate }: AboutSectionProps) => {
  return (
    <PageSection id="about" active={active}>
      <div className="about-hero">
        <div className="about-hero-copy">
          <p className="about-index">Archivo / investigación / memoria</p>
          <h1>El laboratorio</h1>
          <h2 className="about-hero-title">
            Patrimonio
            <br />
            <em>audiovisual</em>
            <br />y tecnológico
          </h2>
        </div>
        <div
          className="about-archive-plate"
          role="img"
          aria-label="Composición gráfica inspirada en una ficha de archivo audiovisual"
        >
          <div className="about-plate-top">
            <span>ESTUDIO VISUAL</span>
            <span>ENSAYO / 01</span>
          </div>
          <div className="about-frame" aria-hidden="true">
            <div className="about-frame-image">
              <span className="about-frame-mark">A</span>
              <span className="about-frame-cross">+</span>
            </div>
            <div className="about-sprockets" />
          </div>
          <div className="about-plate-caption">
            <span>Soportes · imágenes · tecnologías</span>
            <span>IMAGEN / SOPORTE / TIEMPO</span>
          </div>
          <div className="about-plate-note">
            Memoria en movimiento
            <br />
            Colecciones para consultar, cuidar y estudiar
          </div>
        </div>
        <span className="about-hero-index" aria-hidden="true">
          01 / 05
        </span>
      </div>

      <section className="about-mission" aria-labelledby="about-mission-title">
        <div className="about-mission-label">
          <span className="kicker">01 — Propósito</span>
          <span className="about-vertical-note">
            MEMORIA / PRESERVACIÓN / ACCESO
          </span>
        </div>
        <h2 id="about-mission-title">
          Preservar las huellas de nuestra <em>memoria audiovisual.</em>
        </h2>
        <div className="about-copy">
          <p>
            El Laboratorio de Patrimonio Audiovisual y Tecnológico de la
            Facultad de Artes de la Universidad Nacional de Colombia reúne,
            organiza, conserva y facilita el acceso a colecciones audiovisuales,
            documentales y tecnológicas que dan cuenta de la historia y de las
            transformaciones de la cultura audiovisual del país.
          </p>
          <p>
            A través de la preservación, la investigación, la formación y la
            divulgación, busca reconocer el valor histórico, cultural y
            pedagógico de estas colecciones y promover su consulta y apropiación
            como fuentes de conocimiento, memoria y creación.
          </p>
        </div>
      </section>

      <section className="about-work" aria-labelledby="about-work-title">
        <div className="about-work-heading">
          <div>
            <span className="kicker">02 — Áreas de trabajo</span>
            <h2 id="about-work-title">Del inventario a la investigación.</h2>
          </div>
          <p>
            Cinco líneas que articulan el cuidado de los materiales con nuevas
            formas de leer, aprender y compartir la memoria audiovisual.
          </p>
        </div>
        <ol className="about-work-list">
          {workLines.map((line, index) => (
            <li
              className={`about-work-item about-work-item-${line.id}`}
              key={line.id}
            >
              <span className="about-work-number">
                {line.id}
                <span aria-hidden="true"> / 05</span>
              </span>
              <div className="about-work-content">
                <h3>
                  <span>{line.title}</span>
                </h3>
                <p>{line.description}</p>
              </div>
              <span className="about-work-mark" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-closing" aria-label="Explorar el catálogo">
        <div className="about-closing-index">
          <span className="kicker">03 — Consulta</span>
          <span>ACCESO AL ARCHIVO</span>
        </div>
        <div className="about-closing-copy">
          <p>Conservar también es hacer posible el encuentro.</p>
          <span>Un patrimonio vivo se estudia, se consulta y se comparte.</span>
        </div>
        {onNavigate && (
          <button
            className="about-catalog-link"
            type="button"
            onClick={() => onNavigate("catalog")}
          >
            Explorar el catálogo <span aria-hidden="true">↗</span>
          </button>
        )}
      </section>
    </PageSection>
  );
};

export default AboutSection;
