import { render, screen, within } from "@testing-library/react";
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
    const desktopNav = screen.getByRole("navigation", {
      name: "Navegación principal",
    });
    const homeBtn = within(desktopNav).getByRole("button", { name: "Inicio" });
    const catalogBtn = within(desktopNav).getByRole("button", {
      name: "Catálogo",
    });
    const aboutBtn = within(desktopNav).getByRole("button", {
      name: "El laboratorio",
    });

    expect(homeBtn).toHaveClass("active");
    expect(catalogBtn).not.toHaveClass("active");
    expect(aboutBtn).not.toHaveClass("active");

    rerender(<Header page="catalog" onNavigate={() => {}} />);
    expect(homeBtn).not.toHaveClass("active");
    expect(catalogBtn).toHaveClass("active");

    rerender(<Header page="about" onNavigate={() => {}} />);
    expect(aboutBtn).toHaveClass("active");
  });

  it("toggles the mobile menu and updates its accessible state", async () => {
    const user = userEvent.setup();

    render(<Header page="home" onNavigate={() => {}} />);
    const mobileNav = screen.getByRole("navigation", {
      name: "Navegación móvil",
    });
    const toggle = screen.getByRole("button", {
      name: "Abrir menú de navegación",
    });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(mobileNav).not.toHaveClass("open");

    await user.click(toggle);

    const closeButton = screen.getByRole("button", {
      name: "Cerrar menú de navegación",
    });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");
    expect(mobileNav).toHaveClass("open");

    await user.click(closeButton);
    expect(closeButton).toHaveAttribute("aria-expanded", "false");
    expect(mobileNav).not.toHaveClass("open");
  });

  it("closes the mobile menu when Escape is pressed", async () => {
    const user = userEvent.setup();

    render(<Header page="home" onNavigate={() => {}} />);
    await user.click(
      screen.getByRole("button", { name: "Abrir menú de navegación" }),
    );

    await user.keyboard("a");
    expect(
      screen.getByRole("button", { name: "Cerrar menú de navegación" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(
      screen.getByRole("button", { name: "Abrir menú de navegación" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu when clicking outside the header", async () => {
    const user = userEvent.setup();

    render(<Header page="home" onNavigate={() => {}} />);
    await user.click(
      screen.getByRole("button", { name: "Abrir menú de navegación" }),
    );

    await user.click(document.body);

    expect(
      screen.getByRole("button", { name: "Abrir menú de navegación" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu after navigating", async () => {
    const user = userEvent.setup();
    const handleNavigate = vi.fn();

    render(<Header page="home" onNavigate={handleNavigate} />);
    await user.click(
      screen.getByRole("button", { name: "Abrir menú de navegación" }),
    );

    const mobileNav = screen.getByRole("navigation", {
      name: "Navegación móvil",
    });
    await user.click(
      within(mobileNav).getByRole("button", { name: "Proyectos" }),
    );

    expect(handleNavigate).toHaveBeenCalledWith("projects");
    expect(
      screen.getByRole("button", { name: "Abrir menú de navegación" }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("calls onNavigate with appropriate page ID on button clicks", async () => {
    const user = userEvent.setup();
    const handleNavigate = vi.fn();

    render(<Header page="home" onNavigate={handleNavigate} />);
    const desktopNav = screen.getByRole("navigation", {
      name: "Navegación principal",
    });

    await user.click(
      within(desktopNav).getByRole("button", { name: "Catálogo" }),
    );
    expect(handleNavigate).toHaveBeenCalledWith("catalog");

    await user.click(
      within(desktopNav).getByRole("button", { name: "El laboratorio" }),
    );
    expect(handleNavigate).toHaveBeenCalledWith("about");

    await user.click(
      within(desktopNav).getByRole("button", { name: "Inicio" }),
    );
    expect(handleNavigate).toHaveBeenCalledWith("home");
  });
});
