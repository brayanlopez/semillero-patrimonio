import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PageSection from "../PageSection";

describe("PageSection", () => {
  it("renders children properly", () => {
    render(
      <PageSection id="test-section" active={false}>
        <p>Section Content</p>
      </PageSection>,
    );

    expect(screen.getByText("Section Content")).toBeInTheDocument();
  });

  it("applies the specified id attribute", () => {
    const { container } = render(
      <PageSection id="home-section" active={false}>
        <div>Content</div>
      </PageSection>,
    );

    const section = container.querySelector("section");
    expect(section).toHaveAttribute("id", "home-section");
  });

  it("does not have active class when active is false", () => {
    const { container } = render(
      <PageSection id="inactive" active={false}>
        <div>Content</div>
      </PageSection>,
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("page");
    expect(section).not.toHaveClass("active");
  });

  it("has active class when active is true", () => {
    const { container } = render(
      <PageSection id="active" active={true}>
        <div>Content</div>
      </PageSection>,
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("page");
    expect(section).toHaveClass("active");
  });
});
