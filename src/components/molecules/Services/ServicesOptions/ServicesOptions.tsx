import Frame from "../../../atoms/Frame/Frame";
import { motion } from "framer-motion";
import styles from "./ServicesOptions.module.scss";
import ProductOption2 from "../../../../assets/images/ProductsOption.jpg";
import ProductOption from "../../../../assets/images/ProductsOption2.jpg";

const ServicesOptions = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.ServicesOptions}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.ServicesOptionsContainer}
      >
        <div className={styles.textWrapper}>
          <div className={styles.backSquare}>
            <div className={styles.frontSquare}>
              <h2 className={styles.title}>¿DÓNDE{"\n"}COMENZÁS?</h2>
              <p className={styles.description}>
                {" "}
                Sumergite en nuestra colección de joyería, cada pieza pensada
                para resaltar tu estilo, o conocé nuestro servicio de piercings,
                realizado con dedicación, paciencia y guía constante. Elegí qué
                ruta explorar y elevá tu brillo personal.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.optionsWrapper}>
          <div
            className={styles.optionProduct}
            onClick={() => scrollTo("productos")}
            style={{ cursor: "pointer" }}
          >
            <Frame src={ProductOption} size={250} height={300} />
            <span className={styles.optionTitle}>PRODUCTOS</span>
          </div>
          <div
            className={styles.optionService}
            onClick={() => scrollTo("servicios")}
            style={{ cursor: "pointer" }}
          >
            <Frame src={ProductOption2} size={250} height={300} />
            <span className={styles.optionTitle}>SERVICIOS</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default ServicesOptions;
