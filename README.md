# Laboratorio de Patrimonio Audiovisual y Tecnológico

Portal web del Laboratorio de Patrimonio Audiovisual y Tecnológico de la Escuela
de Cine y Televisión de la Universidad Nacional de Colombia. La aplicación
presenta la misión del laboratorio y ofrece un catálogo audiovisual de consulta
pública con búsqueda, filtros y fichas descriptivas.

Los registros incluidos son datos de ejemplo con fines ilustrativos. El proyecto
funciona como una propuesta de interfaz / MVP y no representa todavía un sistema
de catalogación definitivo.

## Tecnologías

- [React 19](https://react.dev/) con componentes funcionales y hooks.
- [TypeScript](https://www.typescriptlang.org/) para tipado estático.
- [Vite 8](https://vite.dev/) como servidor de desarrollo y empaquetador.
- [Vitest](https://vitest.dev/) y [React Testing Library](https://testing-library.com/) para pruebas unitarias y de integración.
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) para análisis estático.
- CSS plano organizado por capas: tokens globales en `src/styles/tokens.css`,
  base y layout compartidos, y estilos por sección en `src/styles/`.

## Instalación

Requiere Node.js 20.19+ o 22.12+ y npm.

```bash
git clone <url-del-repositorio>
cd semillero-patrimonio
npm install
```

## Comandos de desarrollo

| Comando                 | Descripción                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `npm run dev`           | Inicia el servidor de desarrollo con recarga en caliente.    |
| `npm run lint`          | Ejecuta Oxlint sobre el código.                              |
| `npm test`              | Ejecuta las pruebas unitarias una vez con Vitest.            |
| `npm run test:watch`    | Ejecuta las pruebas en modo observador continuo.             |
| `npm run test:coverage` | Ejecuta las pruebas y genera el informe de cobertura con v8. |
| `npm run build`         | Verifica tipos y genera la compilación de producción.        |
| `npm run preview`       | Sirve localmente la compilación de producción.               |

## Compilación de producción

```bash
npm run build
```

El comando ejecuta primero `tsc -b` para validar los tipos y luego `vite build`.
El resultado se genera en `dist/`.

Para revisar la compilación antes de desplegarla:

```bash
npm run preview
```

## Arquitectura del proyecto

```text
src/
├── features/
│   ├── about/
│   │   ├── AboutSection.tsx            # Sección "El laboratorio"
│   │   ├── workLines.ts                # Líneas de trabajo compartidas
│   │   └── __tests__/                  # Pruebas unitarias de About
│   ├── catalog/
│   │   ├── data/
│   │   │   └── records.json            # Dataset estático del catálogo
│   │   ├── CatalogSection.tsx          # Búsqueda, filtros y vista del catálogo
│   │   ├── FilterSidebar.tsx           # Filtros por soporte, tipo y periodo
│   │   ├── RecordCard.tsx              # Tarjeta de un registro del catálogo
│   │   ├── RecordTable.tsx             # Vista tabular de registros del catálogo
│   │   ├── catalogOptions.ts           # Opciones de filtro y variantes visuales
│   │   ├── catalogService.ts           # Acceso, búsqueda y filtrado
│   │   ├── catalogValidation.ts        # Validación del esquema del dataset
│   │   └── __tests__/                  # Pruebas de servicio y componentes
│   ├── detail/
│   │   ├── DetailSection.tsx           # Ficha descriptiva de un registro
│   │   └── __tests__/                  # Pruebas de DetailSection
│   ├── home/
│       ├── HomeSection.tsx             # Página de inicio
│       ├── FeatureCard.tsx             # Tarjeta destacada de la página de inicio
│       └── __tests__/                  # Pruebas de Home y FeatureCard
│   └── projects/
│       ├── ProjectsSection.tsx         # Listado de proyectos del laboratorio
│       ├── ProjectDetailSection.tsx    # Página de detalle de un proyecto
│       ├── ProjectCard.tsx             # Tarjeta reutilizable de proyecto
│       ├── projects.ts                 # Datos de los proyectos
│       ├── projectService.ts           # Servicio de acceso a proyectos
│       └── __tests__/                  # Pruebas de proyectos
├── shared/
│   ├── layout/
│   │   ├── Header.tsx                  # Encabezado y navegación principal
│   │   ├── Footer.tsx                  # Pie de página
│   │   ├── MainLayout.tsx              # Composición de layout principal
│   │   └── __tests__/                  # Pruebas de layout
│   └── ui/
│       ├── DataTable.tsx               # Tabla de datos reutilizable
│       ├── PageSection.tsx             # Envoltorio reutilizable de sección
│       └── __tests__/                  # Pruebas de UI compartida
├── pages/
│   ├── main.tsx                        # Orquesta páginas, navegación y selección
│   └── __tests__/                      # Pruebas de navegación e integración
├── styles/
│   ├── tokens.css                      # Fuentes, color, tipografía y espaciado
│   ├── base.css                        # Reset y estilos base del documento
│   ├── layout.css                      # Header, navegación, main y footer
│   ├── components.css                  # Botones, tarjetas y primitivas compartidas
│   ├── home.css                        # Estilos de la página de inicio
│   ├── about.css                       # Estilos de la sección del laboratorio
│   ├── catalog.css                     # Estilos del catálogo y sus filtros
│   ├── detail.css                      # Estilos de la ficha de un registro
│   └── projects.css                    # Estilos de proyectos y su detalle
├── test/
│   └── setup.ts                        # Configuración global de pruebas y matchers
├── types/
│   ├── catalog.ts                      # Tipos CatalogRecord y CatalogFilters
│   └── navigation.ts                   # Tipos de navegación PageId
├── App.tsx
└── main.tsx                            # Punto de entrada de React
```

Los componentes compartidos viven en `src/shared/` (`layout` para la estructura
de la aplicación y `ui` para primitivas reutilizables). Los componentes
específicos de cada sección viven en `src/features/`.

`MainPage` conserva el estado de navegación y del registro seleccionado. Las
secciones se montan una sola vez y se muestran u ocultan mediante la clase
`active`, de modo que los filtros del catálogo se mantienen al cambiar de
página.

## Datos del catálogo

Los registros del catálogo viven en un dataset JSON independiente de la lógica
de la aplicación:

```text
src/features/catalog/data/records.json
```

El archivo contiene un arreglo de objetos `CatalogRecord`. Cada registro
conserva los campos que usa la ficha pública:

| Campo         | Tipo       | Obligatorio | Descripción                                      |
| ------------- | ---------- | ----------- | ------------------------------------------------ |
| `id`          | `number`   | Sí          | Identificador numérico único del registro.       |
| `code`        | `string`   | Sí          | Código o signatura del material.                 |
| `title`       | `string`   | Sí          | Título del registro.                             |
| `creator`     | `string`   | Sí          | Autor, realizador o entidad responsable.         |
| `type`        | `string`   | Sí          | Tipo de obra o documento.                        |
| `support`     | `string`   | Sí          | Soporte físico o digital.                        |
| `year`        | `number`   | Sí          | Año del material; puede ser `0` si no se conoce. |
| `period`      | `string`   | Sí          | Década usada por el filtro de periodo.           |
| `duration`    | `string`   | Sí          | Duración del material.                           |
| `language`    | `string`   | Sí          | Idioma o indicación de ausencia de diálogo.      |
| `format`      | `string`   | Sí          | Formato técnico del material.                    |
| `description` | `string`   | Sí          | Descripción archivística o descriptiva.          |
| `topics`      | `string[]` | Sí          | Temas asociados usados por la búsqueda.          |
| `color`       | `string`   | No          | Indicación de color del material.                |

Los valores pueden ser cadenas vacías o `0` cuando el material no tiene el dato,
como ocurre en algunos de los registros existentes. No se deben inventar valores
para completar campos faltantes.

### Tipos TypeScript

La forma de cada registro y de los filtros se define en:

```text
src/types/catalog.ts
```

Allí viven los tipos `CatalogRecord` y `CatalogFilters`. El archivo
`tsconfig.app.json` habilita `resolveJsonModule` para que el dataset JSON se
importe con comprobación de tipos.

### Validación del dataset

`src/features/catalog/catalogValidation.ts` comprueba que el JSON sea un arreglo
de registros y que cada registro tenga los campos obligatorios con los tipos
esperados, incluyendo `topics` como arreglo de cadenas y `color` como cadena
opcional. También verifica que los `id` sean únicos. Si un registro está
malformado o repite un identificador, se omite y se informa la novedad en la
consola; los registros válidos restantes siguen disponibles.

### Acceso mediante el servicio

Los componentes no importan el archivo JSON directamente. El acceso pasa por
`src/features/catalog/catalogService.ts`, que expone:

```ts
import type { CatalogFilters, CatalogRecord } from "../../types/catalog";

type CatalogDataSource = {
  getAll: () => CatalogRecord[];
  getById: (id: number | null) => CatalogRecord | undefined;
};

getCatalogRecords(): CatalogRecord[]
getCatalogRecordById(id: number | null): CatalogRecord | undefined
filterCatalogRecords(query: string, filters: CatalogFilters): CatalogRecord[]
```

- `getCatalogRecords()` devuelve todos los registros validados.
- `getCatalogRecordById(id)` busca un registro por su identificador.
- `filterCatalogRecords(query, filters)` aplica la búsqueda de texto y los
  filtros por soporte, tipo de obra y periodo.

La búsqueda, los filtros combinados y la consulta por identificador se
implementan en `catalogService.ts`. Las opciones de los filtros y las variantes
visuales de las tarjetas se mantienen en `catalogOptions.ts`, porque son
configuración de presentación y no forman parte del dataset archivístico.

`CatalogSection` usa `filterCatalogRecords` para construir la grilla, mientras
que `MainPage` usa `getCatalogRecordById` y `getCatalogRecords` para resolver la
ficha seleccionada. El servicio local implementa la interfaz `CatalogDataSource`;
si en el futuro los datos provienen de una API, una base de datos o un sistema
de gestión archivística, basta con reemplazar esa implementación sin cambiar los
componentes ni la interfaz de acceso.

### Cómo agregar un nuevo registro

1. Abre `src/features/catalog/data/records.json`.
2. Agrega un objeto al arreglo con un `id` único y todos los campos obligatorios
   de `CatalogRecord`. Por ejemplo:

```json
{
  "id": 7,
  "code": "LPAT-0007",
  "title": "Título del nuevo registro",
  "creator": "Nombre del autor o realizador",
  "type": "Documental",
  "support": "VHS",
  "year": 2001,
  "period": "2000",
  "duration": "15 min",
  "language": "Español",
  "color": "Color",
  "format": "VHS",
  "description": "Descripción breve del material. Recuerda indicar que se trata de un registro de ejemplo.",
  "topics": ["Tema uno", "Tema dos"]
}
```

3. Si el registro usa un soporte, tipo o periodo que aún no aparece en los
   filtros, agrega la opción correspondiente en `supportOptions`, `typeOptions`
   o `periodOptions` de `src/features/catalog/catalogOptions.ts`.

No se requieren cambios adicionales: el servicio y los componentes toman el
nuevo registro automáticamente después de validarlo.

### Naturaleza de los datos

Los registros incluidos actualmente son datos de ejemplo con fines ilustrativos.
No son registros archivísticos verificados ni representan todavía el fondo real
del laboratorio. Antes de incorporar información de materiales reales se debe
confirmar cada dato con la fuente archivística correspondiente y registrar la
procedencia de la descripción.

## Proyectos del laboratorio

La sección "Proyectos" presenta las iniciativas del laboratorio y enlaza con una
página de detalle propia para cada una. Los datos viven en:

```text
src/features/projects/projects.ts
```

Allí se exporta `projects`, un arreglo de objetos `Project`. El acceso pasa por
`src/features/projects/projectService.ts`, que expone:

```ts
getProjects(): Project[]
getProjectBySlug(slug: string | null | undefined): Project | undefined
```

`ProjectsSection` construye el listado con `getProjects()` y `MainPage` resuelve
el proyecto seleccionado con `getProjectBySlug`. Si el identificador no existe,
la página de detalle muestra un mensaje de respaldo en lugar de fallar.

### Cómo agregar un nuevo proyecto

1. Abre `src/features/projects/projects.ts`.
2. Agrega un objeto `Project` al arreglo `projects` con un `slug` único. Por
   ejemplo:

```ts
{
  slug: "nuevo-proyecto",
  title: "Título del proyecto",
  subtitle: "Subtítulo del proyecto",
  category: "Área o línea de trabajo",
  status: "En desarrollo",
  shortDescription: "Descripción breve para el listado y la página de inicio.",
  description: ["Primer párrafo.", "Segundo párrafo."],
  scope: ["Alcance uno.", "Alcance dos."],
  affiliation: ["Laboratorio de Patrimonio Audiovisual y Tecnológico"],
  acknowledgment: ["Texto de agradecimiento o financiación."],
  logo: { src: "/ruta-del-logo.png", alt: "Texto alternativo del logo" },
}
```

Los campos `status`, `scope`, `acknowledgment`, `logo` e `image` son opcionales.
La sección de agradecimiento solo se muestra cuando el proyecto declara
`acknowledgment`.

### Recursos de imagen

Los logos oficiales del Ministerio de las Culturas, las Artes y los Saberes se
encuentran en `public/` (`logo_mincultura_blanco.png`,
`logo_mincultura_gris.png` y `logo_mincultura_violeta.png`). El proyecto
"Redescubrir la memoria" usa la versión blanca sobre el fondo oscuro de la
sección de agradecimientos. Si el
archivo no estuviera disponible, debe reponerse el logo oficial en esa carpeta
y actualizar la ruta en `src/features/projects/projects.ts`; no debe sustituirse
por una representación textual ni por otro logo.
