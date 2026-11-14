import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import MainLayout from "../MainLayout";

describe("MainLayout", () => {
  it("renders header, main content, and footer", () => {
    const handleNavigate = vi.fn();
    render(
      <MainLayout page="home" onNavigate={handleNavigate}>
        <div data-testid="main-content">Test Layout Child</div>
      </MainLayout>,
    );

    expect(screen.getByAltText("LP")).toBeInTheDocument();
    expect(screen.getByTestId("main-content")).toBeInTheDocument();
    expect(
      screen.getByText(/Escuela de Cine y Televisión · Facultad de Artes/i),
    ).toBeInTheDocument();
  });

  it("propagates navigation events from Header", async () => {
    const user = userEvent.setup();
    const handleNavigate = vi.fn();

    render(
      <MainLayout page="home" onNavigate={handleNavigate}>
        <div>Content</div>
      </MainLayout>,
    );

    const desktopNav = screen.getByRole("navigation", {
      name: "Navegación principal",
    });
    await user.click(
      within(desktopNav).getByRole("button", { name: "Catálogo" }),
    );
    expect(handleNavigate).toHaveBeenCalledWith("catalog");
  });
});
