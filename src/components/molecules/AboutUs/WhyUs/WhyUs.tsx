import styles from "./WhyUs.module.scss";
import Frame from "../../../atoms/Frame/Frame";
import Image1 from "../../../../assets/images/WhyUs.png";
import Image2 from "../../../../assets/images/Luz2.png";
import Image3 from "../../../../assets/images/WhyUs3.png";

const WhyUs = () => (
  <section className={styles.whyUs}>
    <h2 className={styles.backgroundTitle}>Bienvenidos a Akali</h2>

    {/* TOP ROW */}
    <div className={styles.rowTop}>
      <Frame src={Image1} size={180} height={210} />
      <p className={styles.cellTextTop}>
        ¿Es tu primer piercing? Te acompaño en el proceso paso a paso.
      </p>
      <Frame src={Image2} size={180} height={210} />
    </div>

    {/* BOTTOM ROW */}
    <div className={styles.rowBottom}>
      <p className={styles.cellTextLeft}>
        Trabajo con materiales seguros, técnica profesional y un enfoque humano.
        Me tomo el tiempo que cada persona necesita.
      </p>
      <Frame src={Image3} size={300} height={400} />
      <p className={styles.cellTextRight}>
        Reflejá autenticidad y esencia en tu piercing; me aseguro que el foco
        esté en la dedicación a cada detalle.
      </p>
    </div>
  </section>
);

export default WhyUs;
