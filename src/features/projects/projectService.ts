import { projects } from "./projects";
import type { Project } from "./projects";

export const getProjects = (): Project[] => projects;

export const getProjectBySlug = (
  slug: string | null | undefined,
): Project | undefined => projects.find((project) => project.slug === slug);
