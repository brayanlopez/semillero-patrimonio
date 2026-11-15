import type { CatalogRecord } from "../../types/catalog";

const requiredStringFields = [
  "code",
  "title",
  "creator",
  "type",
  "support",
  "period",
  "duration",
  "language",
  "format",
  "description",
] as const;

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const collectRecordErrors = (value: unknown): string[] => {
  if (!isObject(value)) {
    return ["el registro debe ser un objeto."];
  }

  const errors: string[] = [];

  if (typeof value.id !== "number" || !Number.isInteger(value.id)) {
    errors.push("id debe ser un número entero.");
  }

  requiredStringFields.forEach((field) => {
    if (typeof value[field] !== "string") {
      errors.push(`${field} debe ser una cadena de texto.`);
    }
  });

  if (typeof value.year !== "number" || !Number.isFinite(value.year)) {
    errors.push("year debe ser un número válido.");
  }

  if (!isStringArray(value.topics)) {
    errors.push("topics debe ser un arreglo de cadenas de texto.");
  }

  if (value.color !== undefined && typeof value.color !== "string") {
    errors.push("color debe ser una cadena de texto cuando está presente.");
  }

  return errors;
};

export const getCatalogRecordErrors = (value: unknown): string[] =>
  collectRecordErrors(value);

export const isCatalogRecord = (value: unknown): value is CatalogRecord =>
  collectRecordErrors(value).length === 0;

export type CatalogValidationResult = {
  records: CatalogRecord[];
  issues: string[];
};

export const validateCatalogRecords = (
  raw: unknown,
): CatalogValidationResult => {
  if (!Array.isArray(raw)) {
    return {
      records: [],
      issues: ["el dataset debe ser un arreglo de registros."],
    };
  }

  const items: unknown[] = raw;
  const records: CatalogRecord[] = [];
  const issues: string[] = [];
  const seenIds = new Set<number>();

  items.forEach((item, index) => {
    if (!isCatalogRecord(item)) {
      issues.push(
        `Registro ${index + 1}: ${collectRecordErrors(item).join(" ")}`,
      );
      return;
    }

    if (seenIds.has(item.id)) {
      issues.push(`Registro ${index + 1}: el id ${item.id} está duplicado.`);
      return;
    }

    seenIds.add(item.id);
    records.push(item);
  });

  return { records, issues };
};
