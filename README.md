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
- CSS plano con tokens globales en `src/styles/tokens.css` y estilos de la
  aplicación en `src/App.css`.

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
│   │   ├── CatalogSection.tsx          # Búsqueda, filtros y vista del catálogo
│   │   ├── FilterSidebar.tsx           # Filtros por soporte, tipo y periodo
│   │   ├── RecordCard.tsx              # Tarjeta de un registro del catálogo
│   │   ├── RecordTable.tsx             # Vista tabular de registros del catálogo
│   │   ├── catalogService.ts           # Servicio de acceso y filtrado
│   │   ├── records.ts                  # Datos de ejemplo y opciones de filtro
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
│   └── tokens.css                      # Fuentes y variables globales de diseño
├── test/
│   └── setup.ts                        # Configuración global de pruebas y matchers
├── types/
│   ├── catalog.ts                      # Tipos CatalogRecord y CatalogFilters
│   └── navigation.ts                   # Tipos de navegación PageId
├── App.tsx
├── App.css
└── main.tsx                            # Punto de entrada de React
```

Los componentes compartidos viven en `src/shared/` (`layout` para la estructura
de la aplicación y `ui` para primitivas reutilizables). Los componentes
específicos de cada sección viven en `src/features/`.

`MainPage` conserva el estado de navegación y del registro seleccionado. Las
secciones se montan una sola vez y se muestran u ocultan mediante la clase
`active`, de modo que los filtros del catálogo se mantienen al cambiar de
página.

## Ubicación de los datos del catálogo

Los registros de ejemplo y las opciones de los filtros viven en:

```text
src/features/catalog/records.ts
```

Allí se exportan:

- `catalogRecords`: arreglo de objetos `CatalogRecord`.
- `visualClasses`: variantes visuales usadas por las tarjetas.
- `supportOptions`, `typeOptions` y `periodOptions`: opciones de los filtros.

La forma de cada registro se define en `src/types/catalog.ts`.

## Acceso a los datos mediante el servicio

Los componentes no leen `catalogRecords` directamente. El acceso pasa por
`src/features/catalog/catalogService.ts`, que expone:

```ts
import type { CatalogFilters, CatalogRecord } from "../../types/catalog";

getCatalogRecords(): CatalogRecord[]
getCatalogRecordById(id: number | null): CatalogRecord | undefined
filterCatalogRecords(query: string, filters: CatalogFilters): CatalogRecord[]
```

- `getCatalogRecords()` devuelve todos los registros.
- `getCatalogRecordById(id)` busca un registro por su identificador.
- `filterCatalogRecords(query, filters)` aplica la búsqueda de texto y los
  filtros por soporte, tipo de obra y periodo.

`CatalogSection` usa `filterCatalogRecords` para construir la grilla, mientras
que `MainPage` usa `getCatalogRecordById` y `getCatalogRecords` para resolver la
ficha seleccionada. Si en el futuro los datos provienen de una API, basta con
modificar el servicio sin cambiar los componentes.

## Cómo agregar un nuevo registro ilustrativo

1. Abre `src/features/catalog/records.ts`.
2. Agrega un objeto al arreglo `catalogRecords` con un `id` único y todos los campos de
   `CatalogRecord`. Por ejemplo:

```ts
{
  id: 7,
  code: "LPAT-0007",
  title: "Título del nuevo registro",
  creator: "Nombre del autor o realizador",
  type: "Documental",
  support: "VHS",
  year: 2001,
  period: "2000",
  duration: "15 min",
  language: "Español",
  color: "Color",
  format: "VHS",
  description:
    "Descripción breve del material. Recuerda indicar que se trata de un registro de ejemplo.",
  topics: ["Tema uno", "Tema dos"],
},
```

3. Si el registro usa un soporte, tipo o periodo que aún no aparece en los
   filtros, agrega la opción correspondiente en `supportOptions`, `typeOptions`
   o `periodOptions` del mismo archivo.

No se requieren cambios adicionales: el servicio y los componentes toman el
nuevo registro automáticamente.

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
