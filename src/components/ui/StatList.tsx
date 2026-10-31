import { CountUp } from "../motion";

export interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export function StatList({ stats }: { stats: Stat[] }) {
  return (
    <ul className="stats">
      {stats.map((stat) => (
        <li key={stat.label} className="stat">
          <strong>
            <CountUp to={stat.value} suffix={stat.suffix} />
          </strong>
          <span>{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}
