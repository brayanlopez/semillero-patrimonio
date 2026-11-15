import { describe, it, expect } from "vitest";
import { getProjects, getProjectBySlug } from "../projectService";

describe("projectService", () => {
  it("returns the registered projects", () => {
    const projects = getProjects();

    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].slug).toBe("redescubrir-la-memoria");
  });

  it("finds a project by its slug", () => {
    expect(getProjectBySlug("redescubrir-la-memoria")?.title).toBe(
      "Redescubrir la memoria",
    );
  });

  it("returns undefined for unknown or empty identifiers", () => {
    expect(getProjectBySlug("no-existe")).toBeUndefined();
    expect(getProjectBySlug(null)).toBeUndefined();
    expect(getProjectBySlug(undefined)).toBeUndefined();
  });
});
