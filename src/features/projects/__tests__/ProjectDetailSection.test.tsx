import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ProjectDetailSection from "../ProjectDetailSection";
import { getProjectBySlug } from "../projectService";

const project = getProjectBySlug("redescubrir-la-memoria");

describe("ProjectDetailSection", () => {
  it("renders the project description, scope and affiliation", () => {
    render(
      <ProjectDetailSection
        active={true}
        project={project}
        onBack={() => {}}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Redescubrir la memoria" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Archivo de trabajos de grado de la Escuela de Cine y Televisión",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Redescubrir la memoria es un proyecto del Laboratorio de Patrimonio Audiovisual y Tecnológico/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Alcance" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Facultad de Artes")).toBeInTheDocument();
  });

  it("displays the funding acknowledgment and the ministry logo", () => {
    render(
      <ProjectDetailSection
        active={true}
        project={project}
        onBack={() => {}}
      />,
    );

    expect(
      screen.getByText(
        /cuenta con el apoyo del Ministerio de las Culturas, las Artes y los Saberes/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Semillero de Patrimonio Audiovisual/),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Ministerio de las Culturas, las Artes y los Saberes",
      ),
    ).toBeInTheDocument();
  });

  it("returns to the projects listing when the back action is used", async () => {
    const user = userEvent.setup();
    const handleBack = vi.fn();

    render(
      <ProjectDetailSection
        active={true}
        project={project}
        onBack={handleBack}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "← Volver a proyectos" }),
    );

    expect(handleBack).toHaveBeenCalled();
  });

  it("shows a fallback for an unknown project identifier", async () => {
    const user = userEvent.setup();
    const handleBack = vi.fn();

    render(
      <ProjectDetailSection
        active={true}
        project={undefined}
        onBack={handleBack}
      />,
    );

    expect(
      screen.getByText(/No encontramos el proyecto solicitado/),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "← Volver a proyectos" }),
    );

    expect(handleBack).toHaveBeenCalled();
  });
});
