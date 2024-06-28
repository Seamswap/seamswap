export const riseWithFadeIn = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};

export const imageAnimation = {
  initial: {
    y: 100,
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};
export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

export const wordsAnimation = {
  initial: {
    y: 100,
    opacity:0
  },
  animate: {
    y: 0,
    opacity:1,
    transition: {
      ease: [0.6, 0.01, 0.05, 0.95],
    },
  },
};
