import PageSection from "../../shared/ui/PageSection";
import ProjectCard from "./ProjectCard";
import { getProjects } from "./projectService";

type ProjectsSectionProps = {
  active: boolean;
  onOpenProject: (slug: string) => void;
};

const ProjectsSection = ({ active, onOpenProject }: ProjectsSectionProps) => {
  const projects = getProjects();

  return (
    <PageSection id="projects" active={active}>
      <div className="catalog-head">
        <div className="kicker">Laboratorio / Iniciativas</div>
        <h1>Proyectos</h1>
      </div>
      {projects.length ? (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onOpen={onOpenProject}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          Aún no hay proyectos publicados.
          <br />
          Vuelve pronto para conocer las iniciativas del Laboratorio.
        </div>
      )}
    </PageSection>
  );
};

export default ProjectsSection;
