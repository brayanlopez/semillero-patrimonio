import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders institution details and footer copyright information", () => {
    render(<Footer />);

    expect(
      screen.getByText("Laboratorio de Patrimonio Audiovisual y Tecnológico"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Escuela de Cine y Televisión · Facultad de Artes/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Universidad Nacional de Colombia/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Propuesta de interfaz \/ MVP/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/© 2026 · Bogotá, Colombia/i)).toBeInTheDocument();
  });
});
