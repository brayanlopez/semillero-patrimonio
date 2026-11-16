import { useEffect, useState } from "react";
import MainLayout from "../shared/layout/MainLayout";
import HomeSection from "../features/home/HomeSection";
import CatalogSection from "../features/catalog/CatalogSection";
import DetailSection from "../features/detail/DetailSection";
import AboutSection from "../features/about/AboutSection";
import ProjectsSection from "../features/projects/ProjectsSection";
import ProjectDetailSection from "../features/projects/ProjectDetailSection";
import {
  getCatalogRecordById,
  getCatalogRecords,
} from "../features/catalog/catalogService";
import { getProjectBySlug } from "../features/projects/projectService";
import type { PageId } from "../types/navigation";

type AppState = {
  page: PageId;
  selectedId: number | null;
  projectSlug: string | null;
};

const initialState: AppState = {
  page: "home",
  selectedId: null,
  projectSlug: null,
};

const pageMetadata = {
  home: {
    title:
      "Laboratorio de Patrimonio Audiovisual y Tecnológico | Universidad Nacional de Colombia",
    description:
      "El Laboratorio de Patrimonio Audiovisual y Tecnológico de la Universidad Nacional de Colombia trabaja en la identificación, preservación, investigación y divulgación del patrimonio audiovisual.",
  },
  catalog: {
    title:
      "Catálogo audiovisual | Laboratorio de Patrimonio Audiovisual y Tecnológico",
    description:
      "Consulta el catálogo de obras y materiales audiovisuales del Laboratorio de Patrimonio Audiovisual y Tecnológico de la Universidad Nacional de Colombia.",
  },
  detail: {
    title:
      "Ficha audiovisual | Laboratorio de Patrimonio Audiovisual y Tecnológico",
    description:
      "Consulta la ficha y los datos de identificación de una obra del catálogo audiovisual de la Universidad Nacional de Colombia.",
  },
  projects: {
    title: "Proyectos | Laboratorio de Patrimonio Audiovisual y Tecnológico",
    description:
      "Conoce los proyectos de preservación, investigación y divulgación del patrimonio audiovisual de la Universidad Nacional de Colombia.",
  },
  project: {
    title: "Proyectos | Laboratorio de Patrimonio Audiovisual y Tecnológico",
    description:
      "Proyectos del Laboratorio de Patrimonio Audiovisual y Tecnológico de la Universidad Nacional de Colombia.",
  },
  about: {
    title: "Acerca del Laboratorio | Patrimonio Audiovisual y Tecnológico UNAL",
    description:
      "Conoce las líneas de trabajo del Laboratorio de Patrimonio Audiovisual y Tecnológico de la Facultad de Artes de la Universidad Nacional de Colombia.",
  },
} satisfies Record<PageId, { title: string; description: string }>;

const MainPage = () => {
  const [appState, setAppState] = useState<AppState>(initialState);
  const { page, selectedId, projectSlug } = appState;

  const selected = getCatalogRecordById(selectedId) ?? getCatalogRecords()[0];
  const selectedProject = getProjectBySlug(projectSlug);

  useEffect(() => {
    const projectTitle = selectedProject
      ? `${selectedProject.title} | Laboratorio de Patrimonio Audiovisual y Tecnológico`
      : undefined;
    const title = projectTitle ?? pageMetadata[page].title;
    const description = selectedProject
      ? selectedProject.shortDescription
      : pageMetadata[page].description;
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
  }, [page, selectedProject]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setAppState((event.state as AppState | null) ?? initialState);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const commit = (next: AppState) => {
    setAppState(next);
    window.history.pushState(next, "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showPage = (id: PageId) => {
    commit({ ...appState, page: id });
  };

  const openDetail = (id: number) => {
    commit({ ...appState, page: "detail", selectedId: id });
  };

  const openProject = (slug: string) => {
    commit({ ...appState, page: "project", projectSlug: slug });
  };

  return (
    <MainLayout page={page} onNavigate={showPage}>
      <HomeSection
        active={page === "home"}
        onNavigate={showPage}
        onOpenProject={openProject}
      />
      <CatalogSection active={page === "catalog"} onOpenDetail={openDetail} />
      <DetailSection
        active={page === "detail"}
        record={selected}
        onBack={() => showPage("catalog")}
      />
      <ProjectsSection
        active={page === "projects"}
        onOpenProject={openProject}
      />
      <ProjectDetailSection
        active={page === "project"}
        project={selectedProject}
        onBack={() => showPage("projects")}
      />
      <AboutSection active={page === "about"} onNavigate={showPage} />
    </MainLayout>
  );
};

export default MainPage;
