import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CatalogSection from "../CatalogSection";

describe("CatalogSection", () => {
  it("renders catalog head, search input, initial record count, and view toggle button", () => {
    render(<CatalogSection active={true} onOpenDetail={() => {}} />);

    expect(
      screen.getByRole("heading", { name: "Catálogo audiovisual" }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Buscar por título, autor, tema o código…"),
    ).toBeInTheDocument();
    expect(screen.getByText("06 REGISTROS")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cambiar a vista de tabla" }),
    ).toBeInTheDocument();
  });

  it("filters items when query text is entered", async () => {
    const user = userEvent.setup();
    render(<CatalogSection active={true} onOpenDetail={() => {}} />);

    const searchInput = screen.getByPlaceholderText(
      "Buscar por título, autor, tema o código…",
    );
    await user.type(searchInput, "Memorias");

    expect(screen.getByText("01 REGISTROS")).toBeInTheDocument();
    expect(screen.getByText("Memorias de una ciudad")).toBeInTheDocument();
    expect(screen.queryByText("Ejercicios de luz")).not.toBeInTheDocument();
  });

  it("shows empty state message when no results match", async () => {
    const user = userEvent.setup();
    render(<CatalogSection active={true} onOpenDetail={() => {}} />);

    const searchInput = screen.getByPlaceholderText(
      "Buscar por título, autor, tema o código…",
    );
    await user.type(searchInput, "TerminoQueNoExiste123");

    expect(screen.getByText("00 REGISTROS")).toBeInTheDocument();
    expect(
      screen.getByText(/No encontramos registros con esos criterios/i),
    ).toBeInTheDocument();
  });

  it("filters by selecting an option in the sidebar and resets with clear button", async () => {
    const user = userEvent.setup();
    render(<CatalogSection active={true} onOpenDetail={() => {}} />);

    const supportSelect = screen.getByLabelText("Soporte");
    await user.selectOptions(supportSelect, "VHS");

    expect(screen.getByText("01 REGISTROS")).toBeInTheDocument();
    expect(screen.getByText("Ejercicios de luz")).toBeInTheDocument();

    const clearBtn = screen.getByRole("button", { name: "Limpiar filtros" });
    await user.click(clearBtn);

    expect(screen.getByText("06 REGISTROS")).toBeInTheDocument();
  });

  it("calls onOpenDetail when clicking a record card", async () => {
    const user = userEvent.setup();
    const handleOpenDetail = vi.fn();
    render(<CatalogSection active={true} onOpenDetail={handleOpenDetail} />);

    const card = screen.getByRole("button", {
      name: /Ver ficha de Memorias de una ciudad/i,
    });
    await user.click(card);

    expect(handleOpenDetail).toHaveBeenCalledWith(1);
  });

  it("switches to table layout when toggle button is clicked and returns to card layout", async () => {
    const user = userEvent.setup();
    const handleOpenDetail = vi.fn();
    render(<CatalogSection active={true} onOpenDetail={handleOpenDetail} />);

    // Initially in card layout
    expect(
      screen.getByRole("button", { name: "Cambiar a vista de tabla" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();

    // Toggle to table layout
    const toggleBtn = screen.getByRole("button", {
      name: "Cambiar a vista de tabla",
    });
    await user.click(toggleBtn);

    // Now in table layout
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cambiar a vista de tarjetas" }),
    ).toBeInTheDocument();

    // Test opening detail from table action button
    const openTableBtn = screen.getByRole("button", {
      name: "Ver ficha de Memorias de una ciudad",
    });
    await user.click(openTableBtn);
    expect(handleOpenDetail).toHaveBeenCalledWith(1);

    // Toggle back to card layout
    const toggleBackBtn = screen.getByRole("button", {
      name: "Cambiar a vista de tarjetas",
    });
    await user.click(toggleBackBtn);

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Ver ficha de Memorias de una ciudad/i,
      }),
    ).toBeInTheDocument();
  });
});
