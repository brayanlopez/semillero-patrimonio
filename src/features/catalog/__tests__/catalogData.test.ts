import { describe, it, expect } from "vitest";
import recordsData from "../data/records.json";
import {
  getCatalogRecordErrors,
  validateCatalogRecords,
} from "../catalogValidation";
import {
  filterCatalogRecords,
  getCatalogRecordById,
  getCatalogRecords,
} from "../catalogService";
import type { CatalogFilters } from "../../../types/catalog";

const emptyFilters: CatalogFilters = { support: "", type: "", period: "" };

describe("catalog dataset", () => {
  it("loads the JSON dataset as an array of records", () => {
    expect(Array.isArray(recordsData)).toBe(true);
    expect(recordsData).toHaveLength(6);
  });

  it("preserves every original record and its identifiers", () => {
    expect(recordsData.map((record) => record.id)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(recordsData.map((record) => record.code)).toEqual([
      "F_0001",
      "LPAT-0002",
      "LPAT-0003",
      "LPAT-0004",
      "LPAT-0005",
      "LPAT-0006",
    ]);
  });

  it("validates every record against the catalog schema", () => {
    const { issues } = validateCatalogRecords(recordsData);

    expect(issues).toHaveLength(0);
    expect(
      recordsData.every(
        (record) => getCatalogRecordErrors(record).length === 0,
      ),
    ).toBe(true);
  });

  it("keeps record identifiers unique", () => {
    const ids = recordsData.map((record) => record.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("serves the validated records through the catalog service", () => {
    expect(getCatalogRecords()).toEqual(recordsData);
  });

  it("resolves the full detail metadata of an individual record", () => {
    const record = getCatalogRecordById(2);

    expect(record?.title).toBe("Ejercicios de luz");
    expect(record?.creator).toBe("Colectivo de realización");
    expect(record?.format).toBe("VHS");
    expect(record?.duration).toBe("12 min");
    expect(record?.topics).toEqual(["Experimentación", "Imagen", "Luz"]);
  });

  it("searches and combines filters with the migrated dataset", () => {
    expect(filterCatalogRecords("territorio", emptyFilters)[0]?.code).toBe(
      "LPAT-0003",
    );
    expect(
      filterCatalogRecords("luz", {
        support: "VHS",
        type: "Experimental",
        period: "1990",
      })[0]?.code,
    ).toBe("LPAT-0002");
  });
});

describe("catalog validation", () => {
  it("reports a malformed dataset that is not an array", () => {
    const result = validateCatalogRecords({});

    expect(result.records).toHaveLength(0);
    expect(result.issues).toHaveLength(1);
  });

  it("omits records with missing required fields", () => {
    const result = validateCatalogRecords([
      { ...recordsData[0], title: undefined },
    ]);

    expect(result.records).toHaveLength(0);
    expect(result.issues[0]).toContain("title");
  });

  it("omits records with invalid field types", () => {
    const result = validateCatalogRecords([
      { ...recordsData[0], year: "1990", topics: "memoria" },
    ]);

    expect(result.records).toHaveLength(0);
    expect(result.issues[0]).toContain("year");
    expect(result.issues[0]).toContain("topics");
  });

  it("omits records with duplicate identifiers", () => {
    const result = validateCatalogRecords([recordsData[0], recordsData[0]]);

    expect(result.records).toHaveLength(1);
    expect(result.issues[0]).toContain("duplicado");
  });

  it("accepts records without the optional color field", () => {
    const recordWithoutColor: Partial<(typeof recordsData)[number]> = {
      ...recordsData[1],
    };
    delete recordWithoutColor.color;

    expect(getCatalogRecordErrors(recordWithoutColor)).toHaveLength(0);
  });
});
