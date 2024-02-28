interface HeaderProps {
  header: string;
  paragraph: string;
}

export default function Header({ header, paragraph }: HeaderProps) {
  return (
    <section className="text-center md:text-start">
      <h2 className="font-bold text-2xl leading-10">{header}</h2>
      <p>{paragraph}</p>
    </section>
  );
}
