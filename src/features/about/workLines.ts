export type WorkLine = {
  id: string;
  title: string;
  description: string;
};

export const workLines: WorkLine[] = [
  {
    id: "01",
    title: "Identificación, inventario y catalogación",
    description:
      "Reconocimiento, organización y descripción de las colecciones audiovisuales, documentales y tecnológicas, con el propósito de facilitar su identificación, gestión y consulta.",
  },
  {
    id: "02",
    title: "Conservación y preservación",
    description:
      "Diagnóstico del estado de los materiales, limpieza, conservación preventiva y desarrollo de estrategias para preservar los soportes, las obras y los equipos tecnológicos.",
  },
  {
    id: "03",
    title: "Investigación y creación",
    description:
      "Desarrollo de investigaciones y proyectos de creación que exploran las colecciones como fuentes para el estudio de la historia del cine, las prácticas audiovisuales y sus transformaciones.",
  },
  {
    id: "04",
    title: "Formación y experimentación",
    description:
      "Espacios de aprendizaje y experimentación con archivos, soportes y tecnologías audiovisuales, mediante talleres, prácticas académicas y actividades de los semilleros de investigación.",
  },
  {
    id: "05",
    title: "Divulgación",
    description:
      "Desarrollo de herramientas de consulta, exposiciones, proyecciones y actividades de circulación que promuevan el conocimiento y la apropiación de las colecciones.",
  },
];
