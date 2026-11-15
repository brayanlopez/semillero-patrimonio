import recordsData from "./data/records.json";
import { validateCatalogRecords } from "./catalogValidation";
import type { CatalogFilters, CatalogRecord } from "../../types/catalog";

export type CatalogDataSource = {
  getAll: () => CatalogRecord[];
  getById: (id: number | null) => CatalogRecord | undefined;
};

const { records, issues } = validateCatalogRecords(recordsData);

if (issues.length > 0) {
  console.warn(
    `[catálogo] Se omitieron registros inválidos del dataset: ${issues.join(" ")}`,
  );
}

const localCatalogDataSource: CatalogDataSource = {
  getAll: () => records,
  getById: (id) =>
    id === null ? undefined : records.find((record) => record.id === id),
};

export const getCatalogRecords = (): CatalogRecord[] =>
  localCatalogDataSource.getAll();

export const getCatalogRecordById = (
  id: number | null,
): CatalogRecord | undefined => localCatalogDataSource.getById(id);

export const filterCatalogRecords = (
  query: string,
  filters: CatalogFilters,
): CatalogRecord[] => {
  const normalizedQuery = query.trim().toLowerCase();

  return localCatalogDataSource
    .getAll()
    .filter(
      (record) =>
        (!filters.support || record.support === filters.support) &&
        (!filters.type || record.type === filters.type) &&
        (!filters.period || record.period === filters.period) &&
        (!normalizedQuery ||
          [
            record.title,
            record.creator,
            record.code,
            record.type,
            record.support,
            ...record.topics,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)),
    );
};
