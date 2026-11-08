import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FeatureCard from "../FeatureCard";

describe("FeatureCard", () => {
  it("renders card content properly", () => {
    render(
      <FeatureCard
        imageClass="red"
        small="01 / SOPORTES"
        meta="Materialidad"
        title="Los soportes cuentan historias"
        description="Descripción del soporte audiovisual."
        foot="U-MATIC · VHS"
      />,
    );

    expect(screen.getByText("01 / SOPORTES")).toBeInTheDocument();
    expect(screen.getByText("Materialidad")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Los soportes cuentan historias" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Descripción del soporte audiovisual."),
    ).toBeInTheDocument();
    expect(screen.getByText("U-MATIC · VHS")).toBeInTheDocument();
    expect(screen.getByText("↗")).toBeInTheDocument();
  });

  it("applies the imageClass when provided", () => {
    const { container } = render(
      <FeatureCard
        imageClass="ochre"
        small="02 / OBRAS"
        meta="Creación"
        title="Obras"
        description="Desc"
        foot="Foot"
      />,
    );

    const imageElement = container.querySelector(".feature-image");
    expect(imageElement).toHaveClass("ochre");
  });
});
