import type { ReactNode } from "react";

export type DataRow = {
  label: string;
  value: ReactNode;
};

type DataTableProps = {
  rows: DataRow[];
};

const DataTable = ({ rows }: DataTableProps) => {
  return (
    <div className="data-table">
      {rows.map((row) => (
        <div className="data-row" key={row.label}>
          <div className="key">{row.label}</div>
          <div>{row.value}</div>
        </div>
      ))}
    </div>
  );
};

export default DataTable;
