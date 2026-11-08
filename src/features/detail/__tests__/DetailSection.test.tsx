import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import DetailSection from "../DetailSection";
import type { CatalogRecord } from "../../../types/catalog";

const mockRecord: CatalogRecord = {
  id: 1,
  code: "LPAT-0001",
  title: "Memorias de una ciudad",
  creator: "María Fernanda Rojas",
  type: "Documental",
  support: "U-Matic",
  year: 1986,
  period: "1980",
  duration: "24 min",
  language: "Español",
  color: "Color",
  format: "¾ de pulgada",
  description: "Registro documental sobre transformaciones urbanas.",
  topics: ["Bogotá", "Memoria urbana", "Vida cotidiana"],
};

describe("DetailSection", () => {
  it("renders all record information and metadata", () => {
    render(
      <DetailSection active={true} record={mockRecord} onBack={() => {}} />,
    );

    expect(
      screen.getByRole("heading", { name: "Memorias de una ciudad" }),
    ).toBeInTheDocument();
    expect(screen.getByText("DOCUMENTAL / U-MATIC")).toBeInTheDocument();
    expect(screen.getByText("LPAT / LPAT-0001")).toBeInTheDocument();
    expect(
      screen.getByText("Registro documental sobre transformaciones urbanas."),
    ).toBeInTheDocument();

    // Topics pills
    expect(screen.getByText("Bogotá")).toBeInTheDocument();
    expect(screen.getByText("Memoria urbana")).toBeInTheDocument();
    expect(screen.getByText("Vida cotidiana")).toBeInTheDocument();

    // Data table entries
    expect(screen.getByText("Autor / realizador")).toBeInTheDocument();
    expect(screen.getByText("María Fernanda Rojas")).toBeInTheDocument();
    expect(screen.getByText("¾ de pulgada")).toBeInTheDocument();
    expect(screen.getByText("24 min")).toBeInTheDocument();
    expect(screen.getByText("1986")).toBeInTheDocument();

    // Notice
    expect(
      screen.getByText(
        /Esta ficha presenta información descriptiva de consulta pública/i,
      ),
    ).toBeInTheDocument();
  });

  it("calls onBack when clicking the return button", async () => {
    const user = userEvent.setup();
    const handleBack = vi.fn();

    render(
      <DetailSection active={true} record={mockRecord} onBack={handleBack} />,
    );

    const backButton = screen.getByRole("button", {
      name: "← Volver al catálogo",
    });
    await user.click(backButton);

    expect(handleBack).toHaveBeenCalledTimes(1);
  });
});
