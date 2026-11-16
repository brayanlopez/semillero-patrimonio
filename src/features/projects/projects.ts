export type ProjectAsset = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  status?: string;
  shortDescription: string;
  description: string[];
  scope?: string[];
  affiliation: string[];
  acknowledgment?: string[];
  logo?: ProjectAsset;
  image?: ProjectAsset;
};

export const projects: Project[] = [
  {
    slug: "redescubrir-la-memoria",
    title: "Redescubrir la memoria",
    subtitle: "Archivo de trabajos de grado de la Escuela de Cine y Televisión",
    category: "Preservación y catalogación de archivo audiovisual",
    status: "En desarrollo",
    shortDescription:
      "Un proyecto de organización, preservación y catalogación de la memoria audiovisual de la Universidad Nacional de Colombia.",
    description: [
      "Redescubrir la memoria es un proyecto del Laboratorio de Patrimonio Audiovisual y Tecnológico de la Facultad de Artes de la Universidad Nacional de Colombia.",
      "A través de la identificación, conservación y catalogación de los trabajos de grado de la Escuela de Cine y Televisión, busca recuperar y facilitar el acceso a una colección que reúne varias décadas de creación cinematográfica y memoria audiovisual universitaria.",
    ],
    scope: [
      "Identificación y organización de los trabajos de grado de la Escuela de Cine y Televisión.",
      "Conservación y catalogación de la colección audiovisual.",
      "Recuperación y acceso a varias décadas de creación cinematográfica y memoria audiovisual universitaria.",
    ],
    affiliation: [
      "Laboratorio de Patrimonio Audiovisual y Tecnológico",
      "Facultad de Artes",
      "Universidad Nacional de Colombia",
    ],
    acknowledgment: [
      "Redescubrir la memoria, proyecto de organización, preservación y catalogación del archivo de trabajos de grado de la Escuela de Cine y Televisión de la Universidad Nacional de Colombia, cuenta con el apoyo del Ministerio de las Culturas, las Artes y los Saberes, a través de la Beca para la gestión de la memoria audiovisual colombiana 2026.",
      "El proyecto es desarrollado por el Laboratorio de Patrimonio Audiovisual y Tecnológico de la Facultad de Artes, con la participación del Semillero de Patrimonio Audiovisual.",
    ],
    logo: {
      src: import.meta.env.BASE_URL + "/logo_mincultura_blanco.png",
      alt: "Ministerio de las Culturas, las Artes y los Saberes",
    },
  },
];
