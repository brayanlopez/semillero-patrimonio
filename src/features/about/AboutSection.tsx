import PageSection from "../../shared/ui/PageSection";
import DataTable from "../../shared/ui/DataTable";
import type { DataRow } from "../../shared/ui/DataTable";

type AboutSectionProps = {
  active: boolean;
};

const workLines: DataRow[] = [
  {
    label: "01 / Identificación",
    value:
      "Reconocimiento y descripción de materiales, obras, soportes y formatos.",
  },
  {
    label: "02 / Conservación",
    value: "Seguimiento de condiciones materiales y riesgos de deterioro.",
  },
  {
    label: "03 / Investigación",
    value:
      "Consulta, contextualización y generación de conocimiento sobre las colecciones.",
  },
  {
    label: "04 / Divulgación",
    value:
      "Acceso a información pública y circulación del patrimonio audiovisual.",
  },
];

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
            <h2>Preservar las huellas de nuestra cultura audiovisual.</h2>
          </div>
          <p>
            El Laboratorio de Patrimonio Audiovisual y Tecnológico de la Escuela
            de Cine y Televisión de la Facultad de Artes de la Universidad
            Nacional de Colombia promueve el reconocimiento y la valoración de
            los materiales audiovisuales, sus soportes y sus contextos de
            producción. A través de procesos de documentación, investigación y
            conservación, busca facilitar su consulta y contribuir a la
            construcción de memoria.
          </p>
        </div>
      </div>
      <div className="about-lines-block">
        <div className="kicker">Líneas de trabajo</div>
        <h2 className="about-lines-title">
          Del inventario a la investigación.
        </h2>
        <DataTable rows={workLines} />
      </div>
    </PageSection>
  );
};

export default AboutSection;
