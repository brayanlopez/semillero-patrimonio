import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AboutSection from "../AboutSection";

describe("AboutSection", () => {
  it("renders mission and work lines", () => {
    render(<AboutSection active={true} />);

    expect(
      screen.getByRole("heading", { name: "El laboratorio" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Preservar las huellas de nuestra memoria audiovisual.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Del inventario a la investigación.",
      }),
    ).toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(5);
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Identificación, inventario y catalogación",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Conservación y preservación",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Investigación y creación",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Formación y experimentación",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Divulgación" }),
    ).toBeInTheDocument();
  });
});
