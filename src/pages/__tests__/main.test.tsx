import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import MainPage from "../main";

describe("MainPage Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders home page by default and scrolls to top on navigation", async () => {
    const user = userEvent.setup();
    render(<MainPage />);

    // Check home section is active
    const homeSection = document.getElementById("home");
    expect(homeSection).toHaveClass("active");

    // Click catalog button in navigation
    const catalogNavBtn = screen.getByRole("button", { name: "Catálogo" });
    await user.click(catalogNavBtn);

    const catalogSection = document.getElementById("catalog");
    expect(catalogSection).toHaveClass("active");
    expect(homeSection).not.toHaveClass("active");
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("navigates to detail when a record card is clicked and returns on back click", async () => {
    const user = userEvent.setup();
    render(<MainPage />);

    // Go to catalog
    await user.click(screen.getByRole("button", { name: "Catálogo" }));

    // Click on a record card
    const card = screen.getByRole("button", {
      name: /Ver ficha de Memorias de una ciudad/i,
    });
    await user.click(card);

    // Detail section should be active
    const detailSection = document.getElementById("detail");
    expect(detailSection).toHaveClass("active");
    expect(screen.getByText("LPAT / LPAT-0001")).toBeInTheDocument();

    // Click back to catalog
    const backBtn = screen.getByRole("button", {
      name: "← Volver al catálogo",
    });
    await user.click(backBtn);

    const catalogSection = document.getElementById("catalog");
    expect(catalogSection).toHaveClass("active");
    expect(detailSection).not.toHaveClass("active");
  });

  it("navigates to about page from navigation", async () => {
    const user = userEvent.setup();
    render(<MainPage />);

    await user.click(screen.getByRole("button", { name: "El laboratorio" }));

    const aboutSection = document.getElementById("about");
    expect(aboutSection).toHaveClass("active");
  });
});
