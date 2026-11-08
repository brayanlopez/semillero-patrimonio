import type { ReactNode } from "react";

type PageSectionProps = {
  id: string;
  active: boolean;
  children: ReactNode;
};

const PageSection = ({ id, active, children }: PageSectionProps) => {
  return (
    <section id={id} className={`page${active ? " active" : ""}`}>
      {children}
    </section>
  );
};

export default PageSection;
