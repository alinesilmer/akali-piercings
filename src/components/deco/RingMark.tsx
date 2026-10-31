export function RingMark({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="11" r="8.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="19.5" r="2.4" fill="currentColor" />
    </svg>
  );
}
