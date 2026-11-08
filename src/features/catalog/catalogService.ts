import { catalogRecords } from "./records";
import type { CatalogFilters, CatalogRecord } from "../../types/catalog";

export const getCatalogRecords = (): CatalogRecord[] => catalogRecords;

export const getCatalogRecordById = (
  id: number | null,
): CatalogRecord | undefined =>
  catalogRecords.find((record) => record.id === id);

export const filterCatalogRecords = (
  query: string,
  filters: CatalogFilters,
): CatalogRecord[] => {
  const normalizedQuery = query.trim().toLowerCase();

  return catalogRecords.filter(
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
