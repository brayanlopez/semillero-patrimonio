import type { CatalogFilters } from "../../types/catalog";
import { periodOptions, supportOptions, typeOptions } from "./records";

type FilterSidebarProps = {
  filters: CatalogFilters;
  onChange: (key: keyof CatalogFilters, value: string) => void;
  onClear: () => void;
};

type FilterGroupProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  allLabel: string;
};

const FilterGroup = ({
  id,
  label,
  value,
  onChange,
  options,
  allLabel,
}: FilterGroupProps) => {
  return (
    <div className="filter-group">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{allLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const FilterSidebar = ({ filters, onChange, onClear }: FilterSidebarProps) => {
  return (
    <aside className="filters">
      <div className="filter-title">Refinar búsqueda</div>
      <FilterGroup
        id="supportFilter"
        label="Soporte"
        value={filters.support}
        onChange={(value) => onChange("support", value)}
        options={supportOptions.map((option) => ({
          value: option,
          label: option,
        }))}
        allLabel="Todos los soportes"
      />
      <FilterGroup
        id="typeFilter"
        label="Tipo de obra"
        value={filters.type}
        onChange={(value) => onChange("type", value)}
        options={typeOptions.map((option) => ({
          value: option,
          label: option,
        }))}
        allLabel="Todos los tipos"
      />
      <FilterGroup
        id="periodFilter"
        label="Periodo"
        value={filters.period}
        onChange={(value) => onChange("period", value)}
        options={periodOptions}
        allLabel="Todos los periodos"
      />
      <button className="clear" onClick={onClear}>
        Limpiar filtros
      </button>
    </aside>
  );
};

export default FilterSidebar;
