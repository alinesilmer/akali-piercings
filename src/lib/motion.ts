export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const IN_VIEW = { once: true, margin: "0px 0px -10% 0px" };

export const DRAW = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.4, ease: EASE } },
};

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
});
