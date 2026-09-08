export default function Kicker({
  children,
  className = "",
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] ${
        light ? "text-ivory/60" : "text-charcoal/50"
      } ${className}`}
    >
      <span className="h-px w-8 bg-gold" />
      {children}
    </div>
  );
}
