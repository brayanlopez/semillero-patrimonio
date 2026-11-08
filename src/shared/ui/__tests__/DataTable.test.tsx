import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DataTable from "../DataTable";
import type { DataRow } from "../DataTable";

describe("DataTable", () => {
  it("renders a list of data rows with keys and values", () => {
    const rows: DataRow[] = [
      { label: "Soporte", value: "VHS" },
      { label: "Año", value: 1994 },
    ];

    render(<DataTable rows={rows} />);

    expect(screen.getByText("Soporte")).toBeInTheDocument();
    expect(screen.getByText("VHS")).toBeInTheDocument();
    expect(screen.getByText("Año")).toBeInTheDocument();
    expect(screen.getByText("1994")).toBeInTheDocument();
  });

  it("renders complex ReactNode values", () => {
    const rows: DataRow[] = [
      {
        label: "Estado",
        value: <span data-testid="custom-status">Digitalizado</span>,
      },
    ];

    render(<DataTable rows={rows} />);

    expect(screen.getByText("Estado")).toBeInTheDocument();
    expect(screen.getByTestId("custom-status")).toHaveTextContent(
      "Digitalizado",
    );
  });

  it("renders empty table container when rows are empty", () => {
    const { container } = render(<DataTable rows={[]} />);
    const dataTable = container.querySelector(".data-table");
    expect(dataTable).toBeInTheDocument();
    expect(dataTable?.children.length).toBe(0);
  });
});
