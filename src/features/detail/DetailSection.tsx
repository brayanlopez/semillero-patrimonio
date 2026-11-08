import PageSection from "../../shared/ui/PageSection";
import DataTable from "../../shared/ui/DataTable";
import type { DataRow } from "../../shared/ui/DataTable";
import type { CatalogRecord } from "../../types/catalog";

type DetailSectionProps = {
  active: boolean;
  record: CatalogRecord;
  onBack: () => void;
};

const DetailSection = ({ active, record, onBack }: DetailSectionProps) => {
  const rows: DataRow[] = [
    { label: "Código", value: record.code },
    { label: "Autor / realizador", value: record.creator },
    { label: "Tipo de obra", value: record.type },
    { label: "Año", value: record.year },
    { label: "Soporte", value: record.support },
    { label: "Formato", value: record.format },
    { label: "Duración", value: record.duration },
    { label: "Idioma", value: record.language },
    { label: "Cromía", value: record.color },
  ];

  return (
    <PageSection id="detail" active={active}>
      <div className="detail">
        <button className="back" onClick={onBack}>
          ← Volver al catálogo
        </button>
        <div className="detail-layout">
          <div className="detail-art">
            <div className="code">LPAT / {record.code}</div>
            <div className="vertical">FONDO AUDIOVISUAL · UNAL</div>
          </div>
          <div className="detail-copy">
            <div className="kicker">
              {record.type.toUpperCase()} / {record.support.toUpperCase()}
            </div>
            <h1>{record.title}</h1>
            <p className="lead">{record.description}</p>
            <div className="detail-tags">
              {record.topics.map((topic) => (
                <span key={topic} className="pill">
                  {topic}
                </span>
              ))}
            </div>
            <DataTable rows={rows} />
            <div className="notice">
              Esta ficha presenta información descriptiva de consulta pública.
              La disponibilidad de los materiales y las condiciones de acceso
              deben confirmarse con el Laboratorio.
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  );
};

export default DetailSection;
