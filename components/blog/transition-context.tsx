"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { useRouter } from "next/navigation"

interface TransitionContextType {
  isExiting: boolean
  navigateTo: (href: string) => void
}

const TransitionContext = createContext<TransitionContextType>({
  isExiting: false,
  navigateTo: () => {},
})

export function usePageTransition() {
  return useContext(TransitionContext)
}

interface TransitionContextProviderProps {
  children: ReactNode
}

export function TransitionContextProvider({ children }: TransitionContextProviderProps) {
  const router = useRouter()
  const [isExiting, setIsExiting] = useState(false)

  const navigateTo = useCallback((href: string) => {
    // 如果是锚点链接，直接滚动
    if (href.startsWith("#") || href.startsWith("/#")) {
      const id = href.replace("/#", "").replace("#", "")
      if (window.location.pathname === "/" || href.startsWith("#")) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
        return
      }
    }

    // 开始退场动画
    setIsExiting(true)
    
    // 等待退场动画完成后再导航
    setTimeout(() => {
      router.push(href)
      // 在导航后重置状态（让新页面的入场动画生效）
      setTimeout(() => {
        setIsExiting(false)
      }, 50)
    }, 300) // 退场动画时长
  }, [router])

  return (
    <TransitionContext.Provider value={{ isExiting, navigateTo }}>
      {children}
    </TransitionContext.Provider>
  )
}
