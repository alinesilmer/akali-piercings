import Frame from "../../../atoms/Frame/Frame";
import { motion } from "framer-motion";
import styles from "./Presentation.module.scss";
import CounterTag from "../../../atoms/CounterTag/CounterTag";
import LuzImage from "../../../../assets/images/Luz.png";
import LuzImage2 from "../../../../assets/images/Luz2.png";

const Presentation = () => (
  <section className={styles.presentation}>
    <motion.div
      className={styles.image}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Frame src={LuzImage} size={500} height={600} />
      <Frame src={LuzImage2} size={250} />
    </motion.div>
    <motion.div
      className={styles.text}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className={styles.title}>Soy Luz</h2>
      <p className={styles.description}>
        Me dedico al bodypiercing desde el respeto profundo por cada cuerpo.
        {"\n"}Creo en el detalle, en los rituales personales, en hacer de cada
        perforación una experiencia amable. Mi forma de trabajar está guiada por
        el amor, la precisión y la escucha. Acá encontrás un espacio seguro para
        expresarte como so
      </p>
      <motion.div />
      <div className={styles.counterTags}>
        <CounterTag
          number={5}
          pill="Años de Experiencia"
          text="En constante formación para brindar el mejor servicio"
        />
        <CounterTag
          number={100}
          pill="Clientes Satisfechos"
          text="Trabajando con técnicas profesionales y un enfoque humano"
        />
      </div>
    </motion.div>
  </section>
);

export default Presentation;
