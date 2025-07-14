import styles from "./GeneralHero.module.scss";
import Video from "../../../../assets/videos/EjemploVID1.mp4";

export default function GeneralHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroVideoContainer}>
        {/* Using a <video> tag instead of <img> */}
        <video
          src={Video}
          autoPlay
          loop
          muted
          playsInline
          className={styles.heroVideo}
          aria-label="Background"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={styles.heroContent}>
        <div className={styles.heroTextTop}>
          <p>Cuidarte es parte del proceso</p>
          <p>estamos para acompañarte</p>
        </div>
        <h1 className={styles.heroTitle}>
          QUIÉN <span className={styles.heroTitleEs}>es</span> AKALI
        </h1>
        <div className={styles.heroTextBottom}>
          <p>Hecho con amor</p>
          <p>y paciencia</p>
        </div>
      </div>
    </section>
  );
}
