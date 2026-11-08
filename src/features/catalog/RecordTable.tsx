import type { CatalogRecord } from "../../types/catalog";

type RecordTableProps = {
  records: CatalogRecord[];
  onOpen: (id: number) => void;
};

const RecordTable = ({ records, onOpen }: RecordTableProps) => {
  return (
    <div className="catalog-table-wrap">
      <table
        className="catalog-table"
        aria-label="Tabla de registros audiovisuales"
      >
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Título</th>
            <th scope="col">Autor / Realizador</th>
            <th scope="col">Tipo</th>
            <th scope="col">Soporte</th>
            <th scope="col">Año</th>
            <th scope="col">Duración</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                <span className="table-code">{record.code}</span>
              </td>
              <td>
                <span className="table-title">{record.title}</span>
              </td>
              <td>{record.creator}</td>
              <td>{record.type}</td>
              <td>{record.support}</td>
              <td>{record.year}</td>
              <td>{record.duration}</td>
              <td>
                <button
                  type="button"
                  className="table-btn"
                  onClick={() => onOpen(record.id)}
                  aria-label={`Ver ficha de ${record.title}`}
                >
                  Ver ficha ↗
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;
