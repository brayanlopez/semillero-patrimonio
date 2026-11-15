import PageSection from "../../shared/ui/PageSection";
import DataTable from "../../shared/ui/DataTable";
import type { DataRow } from "../../shared/ui/DataTable";

type AboutSectionProps = {
  active: boolean;
};

const workLines: DataRow[] = [
  {
    label: "01 / Identificación, inventario y catalogación",
    value:
      "Reconocimiento, organización y descripción de las colecciones audiovisuales, documentales y tecnológicas, con el propósito de facilitar su identificación, gestión y consulta.",
  },
  {
    label: "02 / Conservación y preservación",
    value:
      "Diagnóstico del estado de los materiales, limpieza, conservación preventiva y desarrollo de estrategias para preservar los soportes, las obras y los equipos tecnológicos.",
  },
  {
    label: "03 / Investigación y creación",
    value:
      "Desarrollo de investigaciones y proyectos de creación que exploran las colecciones como fuentes para el estudio de la historia del cine, las prácticas audiovisuales y sus transformaciones.",
  },
  {
    label: "04 / Formación y experimentación",
    value:
      "Espacios de aprendizaje y experimentación con archivos, soportes y tecnologías audiovisuales, mediante talleres, prácticas académicas y actividades de los semilleros de investigación.",
  },
  {
    label: "05 / Divulgación",
    value:
      "Desarrollo de herramientas de consulta, exposiciones, proyecciones y actividades de circulación que promuevan el conocimiento y la apropiación de las colecciones.",
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
        <DataTable rows={workLines} />
      </div>
    </PageSection>
  );
};

export default AboutSection;
