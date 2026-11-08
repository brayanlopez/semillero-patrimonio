import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Header from "../Header";

describe("Header", () => {
  it("renders branding and laboratory name", () => {
    render(<Header page="home" onNavigate={() => {}} />);

    const brandIcon = screen.getByAltText("LP");
    expect(brandIcon).toBeInTheDocument();
    expect(brandIcon).toHaveAttribute("src", "/favicon.svg");
    expect(screen.getByText(/Laboratorio de Patrimonio/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Escuela de Cine y Televisión · UNAL/i),
    ).toBeInTheDocument();
  });

  it("marks the active page with active class", () => {
    const { rerender } = render(<Header page="home" onNavigate={() => {}} />);
    const homeBtn = screen.getByRole("button", { name: "Inicio" });
    const catalogBtn = screen.getByRole("button", { name: "Catálogo" });
    const aboutBtn = screen.getByRole("button", { name: "El laboratorio" });

    expect(homeBtn).toHaveClass("active");
    expect(catalogBtn).not.toHaveClass("active");
    expect(aboutBtn).not.toHaveClass("active");

    rerender(<Header page="catalog" onNavigate={() => {}} />);
    expect(homeBtn).not.toHaveClass("active");
    expect(catalogBtn).toHaveClass("active");

    rerender(<Header page="about" onNavigate={() => {}} />);
    expect(aboutBtn).toHaveClass("active");
  });

  it("calls onNavigate with appropriate page ID on button clicks", async () => {
    const user = userEvent.setup();
    const handleNavigate = vi.fn();

    render(<Header page="home" onNavigate={handleNavigate} />);

    await user.click(screen.getByRole("button", { name: "Catálogo" }));
    expect(handleNavigate).toHaveBeenCalledWith("catalog");

    await user.click(screen.getByRole("button", { name: "El laboratorio" }));
    expect(handleNavigate).toHaveBeenCalledWith("about");

    await user.click(screen.getByRole("button", { name: "Inicio" }));
    expect(handleNavigate).toHaveBeenCalledWith("home");

    await user.click(
      screen.getByRole("button", { name: "Explorar archivo ↗" }),
    );
    expect(handleNavigate).toHaveBeenCalledWith("catalog");
  });
});
