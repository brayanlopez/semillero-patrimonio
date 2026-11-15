import PageSection from "../../shared/ui/PageSection";
import DataTable from "../../shared/ui/DataTable";
import type { DataRow } from "../../shared/ui/DataTable";
import { workLines } from "./workLines";

type AboutSectionProps = {
  active: boolean;
};

const workLineRows: DataRow[] = workLines.map((line) => ({
  label: `${line.id} / ${line.title}`,
  value: line.description,
}));

const AboutSection = ({ active }: AboutSectionProps) => {
  return (
    <PageSection id="about" active={active}>
      <div className="catalog-head">
        <div className="kicker">Universidad Nacional de Colombia</div>
        <h1>El laboratorio</h1>
      </div>
      <div className="about-band about-band-standalone">
        <div className="about-inner">
          <div>
            <div className="kicker">Misión</div>
            <h2>Preservar las huellas de nuestra memoria audiovisual.</h2>
          </div>
          <div className="about-copy">
            <p>
              El Laboratorio de Patrimonio Audiovisual y Tecnológico de la
              Facultad de Artes de la Universidad Nacional de Colombia reúne,
              organiza, conserva y facilita el acceso a colecciones
              audiovisuales, documentales y tecnológicas que dan cuenta de la
              historia y de las transformaciones de la cultura audiovisual del
              país.
            </p>
            <p>
              A través de la preservación, la investigación, la formación y la
              divulgación, busca reconocer el valor histórico, cultural y
              pedagógico de estas colecciones y promover su consulta y
              apropiación como fuentes de conocimiento, memoria y creación.
            </p>
          </div>
        </div>
      </div>
      <div className="about-lines-block">
        <div className="kicker">Líneas de trabajo</div>
        <h2 className="about-lines-title">
          Del inventario a la investigación.
        </h2>
        <DataTable rows={workLineRows} />
      </div>
    </PageSection>
  );
};

export default AboutSection;
