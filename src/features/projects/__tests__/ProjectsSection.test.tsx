import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import ProjectsSection from "../ProjectsSection";

describe("ProjectsSection", () => {
  it("renders the section heading and the published project", () => {
    render(<ProjectsSection active={true} onOpenProject={() => {}} />);

    expect(
      screen.getByRole("heading", { name: "Proyectos" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Redescubrir la memoria" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Archivo de trabajos de grado de la Escuela de Cine y Televisión",
      ),
    ).toBeInTheDocument();
  });

  it("opens a project when its card is clicked", async () => {
    const user = userEvent.setup();
    const handleOpen = vi.fn();

    render(<ProjectsSection active={true} onOpenProject={handleOpen} />);

    await user.click(
      screen.getByRole("button", {
        name: "Ver proyecto Redescubrir la memoria",
      }),
    );

    expect(handleOpen).toHaveBeenCalledWith("redescubrir-la-memoria");
  });

  it("opens a project with the keyboard", async () => {
    const user = userEvent.setup();
    const handleOpen = vi.fn();

    render(<ProjectsSection active={true} onOpenProject={handleOpen} />);

    const card = screen.getByRole("button", {
      name: "Ver proyecto Redescubrir la memoria",
    });
    card.focus();
    await user.keyboard("{Enter}");

    expect(handleOpen).toHaveBeenCalledWith("redescubrir-la-memoria");
  });
});
