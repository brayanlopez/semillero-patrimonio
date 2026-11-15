import type { Project } from "./projects";

type ProjectCardProps = {
  project: Project;
  onOpen: (slug: string) => void;
};

const ProjectCard = ({ project, onOpen }: ProjectCardProps) => {
  const open = () => onOpen(project.slug);

  return (
    <article
      className="project-card card card-interactive"
      tabIndex={0}
      role="button"
      aria-label={`Ver proyecto ${project.title}`}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      }}
    >
      <div className="project-visual">
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
        {project.status && (
          <span className="project-status">{project.status}</span>
        )}
      </div>
      <div className="project-body">
        <div className="meta">{project.category}</div>
        <h3>{project.title}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-short">{project.shortDescription}</p>
        <div className="project-foot">
          <span>Explorar proyecto</span>
          <span aria-hidden="true">↗</span>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
