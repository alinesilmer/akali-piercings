import { SprayCan, Hand, ShieldCheck, AlertCircle } from "lucide-react";
import styles from "./PostTreatment.module.scss";
import PostCare from "../../../../assets/images/PostCare.png";

export default function PostTreatment() {
  const cards = [
    {
      Icon: SprayCan,
      title: "Limpiá regularmente",
      text: "Limpiá tu piercing dos veces al día con solución salina estéril.",
    },
    {
      Icon: Hand,
      title: "No tocar",
      text: "Evitá tocar tu piercing con las manos sin lavar para prevenir infecciones.",
    },
    {
      Icon: ShieldCheck,
      title: "Protegé y evitá",
      text: "Protegé de impactos de golpes, roces o enganches. Evitá piletas y retirar la joyería antes de tiempo.",
    },
    {
      Icon: AlertCircle,
      title: "Controlá la cicatrización",
      text: "Observá signos de infección; contactá a tu piercer o médico si tenés alguna duda.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          Cuidado Post-Tratamiento{" "}
          <span className={styles.highlight}>Piercing</span>
        </h1>
        <div className={styles.grid}>
          {cards.map(({ Icon, title, text }) => (
            <div key={title} className={styles.card}>
              <Icon className={styles.icon} />
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.text}>{text}</p>
            </div>
          ))}
        </div>
        <div className={styles.imageWrapper}>
          <img
            src={PostCare}
            alt="Kit de cuidado para piercing"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
