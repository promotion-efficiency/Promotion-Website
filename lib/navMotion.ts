import type { Transition } from 'framer-motion'

export const liquidEase = [0.22, 1, 0.36, 1] as [number, number, number, number]

export const liquidTransition: Transition = {
  duration: 0.55,
  ease: liquidEase,
}

export const navSmoothEase = [0.4, 0, 0.2, 1] as [number, number, number, number]

export const navSmoothTransition: Transition = {
  duration: 0.38,
  ease: navSmoothEase,
}

export const navLayoutTransition: Transition = {
  layout: { duration: 0.38, ease: navSmoothEase },
}

export const liquidSpring: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 34,
  mass: 0.85,
}

export const liquidLayoutTransition: Transition = {
  layout: { duration: 0.55, ease: liquidEase },
}
