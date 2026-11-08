import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import FilterSidebar from "../FilterSidebar";
import type { CatalogFilters } from "../../../types/catalog";

describe("FilterSidebar", () => {
  const initialFilters: CatalogFilters = {
    support: "",
    type: "",
    period: "",
  };

  it("renders all filter groups and clear button", () => {
    render(
      <FilterSidebar
        filters={initialFilters}
        onChange={() => {}}
        onClear={() => {}}
      />,
    );

    expect(screen.getByText("Refinar búsqueda")).toBeInTheDocument();
    expect(screen.getByLabelText("Soporte")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo de obra")).toBeInTheDocument();
    expect(screen.getByLabelText("Periodo")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Limpiar filtros" }),
    ).toBeInTheDocument();
  });

  it("calls onChange when selecting a support option", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <FilterSidebar
        filters={initialFilters}
        onChange={handleChange}
        onClear={() => {}}
      />,
    );

    const supportSelect = screen.getByLabelText("Soporte");
    await user.selectOptions(supportSelect, "VHS");

    expect(handleChange).toHaveBeenCalledWith("support", "VHS");
  });

  it("calls onChange when selecting a type option", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <FilterSidebar
        filters={initialFilters}
        onChange={handleChange}
        onClear={() => {}}
      />,
    );

    const typeSelect = screen.getByLabelText("Tipo de obra");
    await user.selectOptions(typeSelect, "Experimental");

    expect(handleChange).toHaveBeenCalledWith("type", "Experimental");
  });

  it("calls onChange when selecting a period option", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <FilterSidebar
        filters={initialFilters}
        onChange={handleChange}
        onClear={() => {}}
      />,
    );

    const periodSelect = screen.getByLabelText("Periodo");
    await user.selectOptions(periodSelect, "1980");

    expect(handleChange).toHaveBeenCalledWith("period", "1980");
  });

  it("calls onClear when clear button is clicked", async () => {
    const user = userEvent.setup();
    const handleClear = vi.fn();

    render(
      <FilterSidebar
        filters={{ support: "VHS", type: "Documental", period: "1990" }}
        onChange={() => {}}
        onClear={handleClear}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Limpiar filtros" }));
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
