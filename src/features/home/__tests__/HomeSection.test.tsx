import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import HomeSection from "../HomeSection";

describe("HomeSection", () => {
  it("renders hero titles, copy, stats, and features", () => {
    render(<HomeSection active={true} onNavigate={() => {}} />);

    expect(
      screen.getByText("Memoria · Imagen · Tecnología"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Un archivo vivo para mirar nuestra memoria audiovisual\./i,
      }),
    ).toBeInTheDocument();

    // Stats
    expect(screen.getByText("Memoria audiovisual")).toBeInTheDocument();
    expect(screen.getByText("Conservación y tecnología")).toBeInTheDocument();
    expect(screen.getByText("Consulta e investigación")).toBeInTheDocument();

    // Features
    expect(
      screen.getByText("Los soportes cuentan historias"),
    ).toBeInTheDocument();
    expect(screen.getByText("Obras, autores y contextos")).toBeInTheDocument();
    expect(screen.getByText("Conservar para consultar")).toBeInTheDocument();
  });

  it("navigates to catalog when clicking explore catalog button", async () => {
    const user = userEvent.setup();
    const handleNavigate = vi.fn();

    render(<HomeSection active={true} onNavigate={handleNavigate} />);

    const cta = screen.getByRole("button", {
      name: "Explorar el catálogo ↗",
    });
    await user.click(cta);

    expect(handleNavigate).toHaveBeenCalledWith("catalog");
  });

  it("navigates to about when clicking conocer el laboratorio button", async () => {
    const user = userEvent.setup();
    const handleNavigate = vi.fn();

    render(<HomeSection active={true} onNavigate={handleNavigate} />);

    const aboutBtn = screen.getByRole("button", {
      name: "Conocer el laboratorio",
    });
    await user.click(aboutBtn);

    expect(handleNavigate).toHaveBeenCalledWith("about");
  });

  it("navigates to catalog when clicking ver catálogo completo button", async () => {
    const user = userEvent.setup();
    const handleNavigate = vi.fn();

    render(<HomeSection active={true} onNavigate={handleNavigate} />);

    const link = screen.getByRole("button", {
      name: "Ver catálogo completo ↗",
    });
    await user.click(link);

    expect(handleNavigate).toHaveBeenCalledWith("catalog");
  });
});
