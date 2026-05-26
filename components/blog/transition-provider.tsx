"use client"

import { ReactNode, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { motion, useReducedMotion } from "framer-motion"
import { usePageTransition } from "./transition-context"

interface TransitionProviderProps {
  children: ReactNode
}

export function TransitionProvider({ children }: TransitionProviderProps) {
  const pathname = usePathname()
  const { isExiting } = usePageTransition()
  const shouldReduceMotion = useReducedMotion()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isEntering, setIsEntering] = useState(true)

  // 当路径变化时，更新子组件并触发入场动画
  useEffect(() => {
    setDisplayChildren(children)
    setIsEntering(true)
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "instant" })
    
    const timer = requestAnimationFrame(() => {
      setIsEntering(false)
    })
    return () => cancelAnimationFrame(timer)
  }, [pathname, children])

  // 如果用户偏好减少动画，返回无动画版本
  if (shouldReduceMotion) {
    return <>{displayChildren}</>
  }

  return (
    <>
      {/* 页面内容层 */}
      <motion.div
        initial={false}
        animate={{
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 0.98 : 1,
          filter: isExiting ? "blur(8px)" : "blur(0px)",
          y: isEntering ? 20 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{ 
          minHeight: "100vh",
          transformOrigin: "center top",
        }}
      >
        {displayChildren}
      </motion.div>

      {/* 过渡遮罩层 */}
      <motion.div
        initial={false}
        animate={{
          opacity: isExiting ? 1 : 0,
          pointerEvents: isExiting ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-background"
        style={{ backdropFilter: "blur(20px)" }}
      />
    </>
  )
}
