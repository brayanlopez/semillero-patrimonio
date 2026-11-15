export type CatalogFilterOption = {
  value: string;
  label: string;
};

export const visualClasses = ["", "v2", "v3", "v4", "v5"];

export const supportOptions: string[] = [
  "Filmico",
  "U-Matic",
  "DVD",
  "DVCAM",
  "VHS",
  "miniDV",
  "Beta",
  "Digital",
];

export const typeOptions: string[] = [
  "Audiovisual",
  "Texto",
  "Carpeta de producción",
  "Documento/Audiovisual",
  "Documento-Carpeta TG",
  "Documento",
  "Carpetas (Texto y Audiovisual)",
  "Documental",
  "Ficción",
  "Registro",
  "Experimental",
  "Animación",
];

export const periodOptions: CatalogFilterOption[] = [
  { value: "1980", label: "1980–1989" },
  { value: "1990", label: "1990–1999" },
  { value: "2000", label: "2000–2009" },
  { value: "2010", label: "2010–2019" },
  { value: "2020", label: "2020–presente" },
];
