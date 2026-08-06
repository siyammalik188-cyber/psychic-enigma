// Shared, stable motion configs. Defined once at module scope so they are not
// re-created on every render (new object identities force child re-renders).
export const FADE_UP = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

export const TRANSITION = {
  base: { duration: 0.5 },
  delay05: { duration: 0.5, delay: 0.05 },
  delay10: { duration: 0.5, delay: 0.1 },
  delay15: { duration: 0.5, delay: 0.15 },
  delay18: { duration: 0.5, delay: 0.18 },
  delay20: { duration: 0.5, delay: 0.2 },
  delay25: { duration: 0.5, delay: 0.25 },
  delay30: { duration: 0.5, delay: 0.3 },
  hero: { duration: 0.55 },
  heroDelay12: { duration: 0.55, delay: 0.12 },
  heroDelay22: { duration: 0.55, delay: 0.22 },
};

export const PROGRESS_TRANSITION = { ease: "easeOut", duration: 0.35 };
