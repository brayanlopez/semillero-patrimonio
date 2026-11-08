export type CatalogRecord = {
  id: number;
  code: string;
  title: string;
  creator: string;
  type: string;
  support: string;
  year: number;
  period: string;
  duration: string;
  language: string;
  color: string;
  format: string;
  description: string;
  topics: string[];
};

export type CatalogFilters = {
  support: string;
  type: string;
  period: string;
};
