import { useId } from "react";

const SCALES = [
  [20, -10],
  [0, 0],
  [40, 0],
  [20, 10],
  [0, 20],
  [40, 20],
  [20, 30],
];

const RADII = [20, 13.5, 7];

/** Japanese wave pattern. Colour and opacity come from the parent class. */
export function Seigaiha({ className = "" }: { className?: string }) {
  const id = useId();

  return (
    <svg className={className} aria-hidden>
      <defs>
        <pattern id={id} width="40" height="20" patternUnits="userSpaceOnUse">
          {SCALES.map(([cx, cy]) => RADII.map((r) => <circle key={`${cx}-${cy}-${r}`} cx={cx} cy={cy} r={r} />))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
