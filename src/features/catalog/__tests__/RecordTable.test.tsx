import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import RecordTable from "../RecordTable";
import type { CatalogRecord } from "../../../types/catalog";

const mockRecords: CatalogRecord[] = [
  {
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
    description: "Registro documental.",
    topics: ["Bogotá"],
  },
  {
    id: 2,
    code: "LPAT-0002",
    title: "Ejercicios de luz",
    creator: "Colectivo de realización",
    type: "Experimental",
    support: "VHS",
    year: 1994,
    period: "1990",
    duration: "12 min",
    language: "Español",
    color: "Color",
    format: "VHS",
    description: "Pieza experimental.",
    topics: ["Luz"],
  },
];

describe("RecordTable", () => {
  it("renders table headers correctly", () => {
    render(<RecordTable records={mockRecords} onOpen={() => {}} />);

    expect(
      screen.getByRole("columnheader", { name: "Código" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Título" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Autor / Realizador" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Tipo" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Soporte" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Año" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Duración" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Acción" }),
    ).toBeInTheDocument();
  });

  it("renders all records and their metadata in rows", () => {
    render(<RecordTable records={mockRecords} onOpen={() => {}} />);

    expect(screen.getByText("LPAT-0001")).toBeInTheDocument();
    expect(screen.getByText("Memorias de una ciudad")).toBeInTheDocument();
    expect(screen.getByText("María Fernanda Rojas")).toBeInTheDocument();
    expect(screen.getByText("U-Matic")).toBeInTheDocument();
    expect(screen.getByText("1986")).toBeInTheDocument();
    expect(screen.getByText("24 min")).toBeInTheDocument();

    expect(screen.getByText("LPAT-0002")).toBeInTheDocument();
    expect(screen.getByText("Ejercicios de luz")).toBeInTheDocument();
  });

  it("triggers onOpen when clicking action button", async () => {
    const user = userEvent.setup();
    const handleOpen = vi.fn();

    render(<RecordTable records={mockRecords} onOpen={handleOpen} />);

    const openBtn = screen.getByRole("button", {
      name: "Ver ficha de Memorias de una ciudad",
    });
    await user.click(openBtn);

    expect(handleOpen).toHaveBeenCalledTimes(1);
    expect(handleOpen).toHaveBeenCalledWith(1);
  });
});
