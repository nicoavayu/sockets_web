type SectionTitleProps = {
  index: string;
  label: string;
  title: string;
  light?: boolean;
};

export function SectionTitle({
  index,
  label,
  title,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`section-title ${light ? "section-title--light" : ""}`}>
      <p>
        <span>{index}</span>
        {label}
      </p>
      <h2>{title}</h2>
    </div>
  );
}
