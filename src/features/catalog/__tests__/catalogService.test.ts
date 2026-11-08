import { describe, it, expect } from "vitest";
import {
  getCatalogRecords,
  getCatalogRecordById,
  filterCatalogRecords,
} from "../catalogService";
import { catalogRecords } from "../records";

describe("catalogService", () => {
  describe("getCatalogRecords", () => {
    it("returns all catalog records", () => {
      const records = getCatalogRecords();
      expect(records).toEqual(catalogRecords);
      expect(records.length).toBeGreaterThan(0);
    });
  });

  describe("getCatalogRecordById", () => {
    it("returns the corresponding record when id exists", () => {
      const target = catalogRecords[0];
      const result = getCatalogRecordById(target.id);
      expect(result).toBeDefined();
      expect(result?.title).toBe(target.title);
      expect(result?.id).toBe(target.id);
    });

    it("returns undefined when id does not exist", () => {
      const result = getCatalogRecordById(99999);
      expect(result).toBeUndefined();
    });

    it("returns undefined when id is null", () => {
      const result = getCatalogRecordById(null);
      expect(result).toBeUndefined();
    });
  });

  describe("filterCatalogRecords", () => {
    const emptyFilters = { support: "", type: "", period: "" };

    it("returns all records when query is empty and no filters are applied", () => {
      const results = filterCatalogRecords("", emptyFilters);
      expect(results).toHaveLength(catalogRecords.length);
    });

    it("filters records by title (case-insensitive and trimmed)", () => {
      const results = filterCatalogRecords("  memorias  ", emptyFilters);
      expect(results.length).toBe(1);
      expect(results[0].title).toBe("Memorias de una ciudad");
    });

    it("filters records by creator", () => {
      const results = filterCatalogRecords("María Fernanda", emptyFilters);
      expect(results.length).toBe(1);
      expect(results[0].creator).toBe("María Fernanda Rojas");
    });

    it("filters records by code", () => {
      const results = filterCatalogRecords("LPAT-0003", emptyFilters);
      expect(results.length).toBe(1);
      expect(results[0].code).toBe("LPAT-0003");
    });

    it("filters records by topics", () => {
      const results = filterCatalogRecords("territorio", emptyFilters);
      expect(results.length).toBe(1);
      expect(results[0].topics).toContain("Territorio");
    });

    it("filters records by support filter", () => {
      const results = filterCatalogRecords("", {
        ...emptyFilters,
        support: "VHS",
      });
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((r) => r.support === "VHS")).toBe(true);
    });

    it("filters records by type filter", () => {
      const results = filterCatalogRecords("", {
        ...emptyFilters,
        type: "Documental",
      });
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((r) => r.type === "Documental")).toBe(true);
    });

    it("filters records by period filter", () => {
      const results = filterCatalogRecords("", {
        ...emptyFilters,
        period: "1980",
      });
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((r) => r.period === "1980")).toBe(true);
    });

    it("combines text search with multiple filters correctly", () => {
      const results = filterCatalogRecords("ciudad", {
        support: "U-Matic",
        type: "Documental",
        period: "1980",
      });
      expect(results.length).toBe(1);
      expect(results[0].code).toBe("LPAT-0001");
    });

    it("returns empty array if no records match criteria", () => {
      const results = filterCatalogRecords(
        "nonexistent_term_xyz",
        emptyFilters,
      );
      expect(results).toHaveLength(0);
    });

    it("returns empty array when filter doesn't match query matches", () => {
      // "Memorias" exists, but with support U-Matic, not VHS
      const results = filterCatalogRecords("memorias", {
        ...emptyFilters,
        support: "VHS",
      });
      expect(results).toHaveLength(0);
    });
  });
});
