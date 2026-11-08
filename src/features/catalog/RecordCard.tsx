import type { CatalogRecord } from "../../types/catalog";
import { visualClasses } from "./records";

type RecordCardProps = {
  record: CatalogRecord;
  index: number;
  onOpen: (id: number) => void;
};

const RecordCard = ({ record, index, onOpen }: RecordCardProps) => {
  const open = () => onOpen(record.id);

  return (
    <article
      className="item-card"
      tabIndex={0}
      role="button"
      aria-label={`Ver ficha de ${record.title}`}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
    >
      <div
        className={`item-visual ${visualClasses[index % visualClasses.length]}`}
      >
        <span className="tag">{record.code}</span>
      </div>
      <div className="item-info">
        <div className="meta">
          {record.type} / {record.support}
        </div>
        <h3>{record.title}</h3>
        <p>
          {record.creator} · {record.year}
        </p>
        <div className="bottom">
          <span>{record.duration}</span>
          <span>VER FICHA ↗</span>
        </div>
      </div>
    </article>
  );
};

export default RecordCard;
