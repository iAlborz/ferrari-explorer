export function Header({ brandName }: { brandName: string }) {
  return (
    <header className="relative z-10 px-6 pt-12 pb-6 text-center md:px-12 md:pt-16">
      <img
        src="/ferrari_logo.png"
        alt="Ferrari"
        className="mx-auto mb-6 h-24 w-auto md:h-32"
        draggable={false}
      />
    </header>
  );
}
