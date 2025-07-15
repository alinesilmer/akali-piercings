import { Utensils, Droplet, Ban, HeartPulse } from "lucide-react";
import styles from "./PreRecomendations.module.scss";
import PreCare from "../../../../assets/images/PreCare.png";

export default function PreRecomendations() {
  const cards = [
    {
      Icon: Droplet,
      title: "Descanso e hidratación",
      text: "Asegurate de estar bien descansado e hidratado antes de tu cita para mayor comodidad.",
    },
    {
      Icon: Ban,
      title: "Evitá sustancias",
      text: "Evitá alcohol, cafeína y anticoagulantes 24 horas antes de tu piercing.",
    },
    {
      Icon: Utensils,
      title: "Comida ligera",
      text: "Comé algo ligero antes de tu sesión para mantener estable tu nivel de azúcar en sangre.",
    },
    {
      Icon: HeartPulse,
      title: "Información médica",
      text: "Informá a tu piercer sobre alergias, condiciones médicas o medicamentos que tomes.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Recomendaciones{" "}
          <span className={styles.highlight}>Previas al Piercing</span>
        </h2>
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
            src={PreCare}
            alt="Consulta de piercing"
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
