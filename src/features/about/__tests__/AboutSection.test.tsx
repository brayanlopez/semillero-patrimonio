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

    // Check work lines
    expect(
      screen.getByText("01 / Identificación, inventario y catalogación"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("02 / Conservación y preservación"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("03 / Investigación y creación"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("04 / Formación y experimentación"),
    ).toBeInTheDocument();
    expect(screen.getByText("05 / Divulgación")).toBeInTheDocument();
  });
});
