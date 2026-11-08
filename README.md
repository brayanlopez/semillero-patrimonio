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
│   └── home/
│       ├── HomeSection.tsx             # Página de inicio
│       ├── FeatureCard.tsx             # Tarjeta destacada de la página de inicio
│       └── __tests__/                  # Pruebas de Home y FeatureCard
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
