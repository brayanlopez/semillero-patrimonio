import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App", () => {
  it("renders without crashing and displays initial home view", () => {
    render(<App />);

    expect(screen.getByAltText("LP")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Un archivo vivo para mirar nuestra memoria audiovisual\./i,
      }),
    ).toBeInTheDocument();
  });
});
