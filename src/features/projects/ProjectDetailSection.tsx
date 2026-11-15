import PageSection from "../../shared/ui/PageSection";
import type { Project } from "./projects";

type ProjectDetailSectionProps = {
  active: boolean;
  project: Project | undefined;
  onBack: () => void;
};

const ProjectDetailSection = ({
  active,
  project,
  onBack,
}: ProjectDetailSectionProps) => {
  if (!project) {
    return (
      <PageSection id="project" active={active}>
        <div className="detail">
          <button className="back" onClick={onBack}>
            ← Volver a proyectos
          </button>
          <div className="empty">
            No encontramos el proyecto solicitado.
            <br />
            Vuelve al listado para elegir otra iniciativa del Laboratorio.
          </div>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection id="project" active={active}>
      <div className="detail project-detail">
        <button className="back" onClick={onBack}>
          ← Volver a proyectos
        </button>
        <nav className="breadcrumb" aria-label="Ruta de navegación">
          <button className="breadcrumb-link" onClick={onBack}>
            Proyectos
          </button>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>
        <div className="project-detail-head">
          <div className="kicker">
            {project.category}
            {project.status ? ` · ${project.status}` : ""}
          </div>
          <h1>{project.title}</h1>
          <p className="lead">{project.subtitle}</p>
        </div>
        <div className="project-detail-layout">
          <div className="project-detail-art">
            {project.image ? (
              <img
                className="project-image"
                src={project.image.src}
                alt={project.image.alt}
              />
            ) : (
              <div className="project-reel" aria-hidden="true"></div>
            )}
            <span className="vertical">MEMORIA AUDIOVISUAL · UNAL</span>
          </div>
          <div className="project-detail-copy">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {project.scope && project.scope.length > 0 && (
              <div className="project-scope">
                <h2>Alcance</h2>
                <ul>
                  {project.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="project-affiliation">
              <div className="kicker">Adscripción institucional</div>
              <ul className="project-affiliation-list">
                {project.affiliation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {project.acknowledgment && project.acknowledgment.length > 0 && (
          <section className="project-ack" aria-labelledby="project-ack-title">
            <div className="project-ack-copy">
              <div className="kicker">Financiación y agradecimientos</div>
              <h2 id="project-ack-title">Con el apoyo de</h2>
              {project.acknowledgment.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {project.logo && (
              <div className="project-ack-logo-wrap">
                <img
                  className="project-ack-logo"
                  src={project.logo.src}
                  alt={project.logo.alt}
                />
              </div>
            )}
          </section>
        )}
      </div>
    </PageSection>
  );
};

export default ProjectDetailSection;
