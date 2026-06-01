"use client"

import { motion, AnimatePresence, useReducedMotion, type Transition, type Variants } from "framer-motion"
import { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

// 优化的页面进入动画
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -6,
  }
}

const pageTransition: Transition = {
  duration: 0.18,
  ease: [0.22, 1, 0.36, 1],
}

export function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion()
  
  if (shouldReduceMotion) {
    return <>{children}</>
  }
  
  return (
    <motion.div
      initial={false}
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}

// 优化的交错动画容器
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.04
    }
  }
}

// 快速淡入上滑动画
export const fadeUpVariant: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
    }
  }
}

// 平滑淡入左滑
export const fadeLeftVariant: Variants = {
  initial: {
    opacity: 0,
    x: -14,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    }
  }
}

// 平滑淡入右滑
export const fadeRightVariant: Variants = {
  initial: {
    opacity: 0,
    x: 14,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    }
  }
}

// 弹性缩放动画
export const scaleUpVariant: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1],
    }
  }
}

// 遮罩揭示动画
export const revealVariant: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

// 平滑淡入动画（无位移）
export const fadeInVariant: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

// 列表项动画
export const listItemVariant: Variants = {
  initial: {
    opacity: 0,
    x: -10,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.18,
      ease: [0.22, 1, 0.36, 1],
    }
  }
}
