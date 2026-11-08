type FeatureCardProps = {
  imageClass: string;
  small: string;
  meta: string;
  title: string;
  description: string;
  foot: string;
};

const FeatureCard = ({
  imageClass,
  small,
  meta,
  title,
  description,
  foot,
}: FeatureCardProps) => {
  return (
    <article className="feature-card">
      <div className={`feature-image${imageClass ? ` ${imageClass}` : ""}`}>
        <small>{small}</small>
        <div className="shape"></div>
      </div>
      <div className="feature-body">
        <div className="meta">{meta}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="feature-foot">
          <span>{foot}</span>
          <span>↗</span>
        </div>
      </div>
    </article>
  );
};

export default FeatureCard;
