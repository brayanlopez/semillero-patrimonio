import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import RecordCard from "../RecordCard";
import type { CatalogRecord } from "../../../types/catalog";

const mockRecord: CatalogRecord = {
  id: 42,
  code: "LPAT-0042",
  title: "Cine y Archivo",
  creator: "Realizador Ejemplo",
  type: "Documental",
  support: "VHS",
  year: 1999,
  period: "1990",
  duration: "30 min",
  language: "Español",
  color: "Color",
  format: "VHS",
  description: "Descripción de prueba.",
  topics: ["Cine", "Archivo"],
};

describe("RecordCard", () => {
  it("renders card metadata, title, creator, year and duration", () => {
    render(<RecordCard record={mockRecord} index={0} onOpen={() => {}} />);

    expect(screen.getByText("LPAT-0042")).toBeInTheDocument();
    expect(screen.getByText("Cine y Archivo")).toBeInTheDocument();
    expect(screen.getByText("Documental / VHS")).toBeInTheDocument();
    expect(screen.getByText("Realizador Ejemplo · 1999")).toBeInTheDocument();
    expect(screen.getByText("30 min")).toBeInTheDocument();
    expect(screen.getByText("VER FICHA ↗")).toBeInTheDocument();
  });

  it("applies the visual class according to the index", () => {
    const { container, rerender } = render(
      <RecordCard record={mockRecord} index={1} onOpen={() => {}} />,
    );

    let visual = container.querySelector(".item-visual");
    expect(visual).toHaveClass("v2");

    rerender(<RecordCard record={mockRecord} index={2} onOpen={() => {}} />);
    visual = container.querySelector(".item-visual");
    expect(visual).toHaveClass("v3");
  });

  it("triggers onOpen when clicked", async () => {
    const user = userEvent.setup();
    const handleOpen = vi.fn();

    render(<RecordCard record={mockRecord} index={0} onOpen={handleOpen} />);

    await user.click(screen.getByRole("button"));
    expect(handleOpen).toHaveBeenCalledTimes(1);
    expect(handleOpen).toHaveBeenCalledWith(42);
  });

  it("triggers onOpen on Enter and Space key presses", () => {
    const handleOpen = vi.fn();
    render(<RecordCard record={mockRecord} index={0} onOpen={handleOpen} />);

    const card = screen.getByRole("button");

    fireEvent.keyDown(card, { key: "Enter" });
    expect(handleOpen).toHaveBeenCalledWith(42);

    fireEvent.keyDown(card, { key: " " });
    expect(handleOpen).toHaveBeenCalledWith(42);
    expect(handleOpen).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(card, { key: "Escape" });
    expect(handleOpen).toHaveBeenCalledTimes(2);
  });

  it("has accessible role and aria-label", () => {
    render(<RecordCard record={mockRecord} index={0} onOpen={() => {}} />);
    const card = screen.getByRole("button", {
      name: `Ver ficha de ${mockRecord.title}`,
    });
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("tabindex", "0");
  });
});
