"use client"

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react"
import { MessageCircle, Minus, Sparkles, X } from "lucide-react"

const MODEL_URL = "/live2d/dusk-companion/model.model3.json"

const companionMessages = [
  "要去看看最新文章吗？",
  "右下角值班中，抓到可疑流量就喊我。",
  "今天也要记得保存证据喵。",
  "PWN、RE、DFIR，都可以慢慢啃。",
]

const idleMessages = [
  "我在这里，随时可以点我。",
  "鼠标靠近会看过去哦。",
  "想搜索文章可以点顶部放大镜。",
]

type Mood = "idle" | "happy" | "curious"
type LoadState = "idle" | "loading" | "ready" | "error"

type Live2DInstance = import("l2d").L2D

const faceParamIds = [
  "ParamAngleX",
  "ParamAngleY",
  "ParamAngleZ",
  "ParamBodyAngleX",
  "ParamEyeBallX",
  "ParamEyeBallY",
  "ParamEyeLOpen",
  "ParamEyeROpen",
  "ParamEyeLSmile",
  "ParamEyeRSmile",
  "ParamMouthForm",
  "ParamMouthOpenY",
  "ParamBrowLAngle",
  "ParamBrowRAngle",
  "ParamBrowLY",
  "ParamBrowRY",
] as const

function getMoodParams(mood: Mood, gaze: { x: number; y: number }, availableParams: Set<string>) {
  const nextParams: Record<string, number> = {}
  const setParam = (id: (typeof faceParamIds)[number], value: number) => {
    if (availableParams.has(id)) nextParams[id] = value
  }

  setParam("ParamAngleX", gaze.x * 18)
  setParam("ParamAngleY", -gaze.y * 12)
  setParam("ParamAngleZ", -gaze.x * gaze.y * 8)
  setParam("ParamBodyAngleX", gaze.x * 7)
  setParam("ParamEyeBallX", gaze.x)
  setParam("ParamEyeBallY", -gaze.y)

  if (mood === "happy") {
    setParam("ParamEyeLSmile", 1)
    setParam("ParamEyeRSmile", 1)
    setParam("ParamMouthForm", 1)
    setParam("ParamMouthOpenY", 0.26)
    setParam("ParamBrowLY", 0.35)
    setParam("ParamBrowRY", 0.35)
  } else if (mood === "curious") {
    setParam("ParamEyeLOpen", 1)
    setParam("ParamEyeROpen", 1)
    setParam("ParamMouthOpenY", 0.08)
    setParam("ParamBrowLAngle", -0.28)
    setParam("ParamBrowRAngle", 0.28)
  }

  return nextParams
}

export function InteractiveCompanion() {
  const [isHidden, setIsHidden] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [mood, setMood] = useState<Mood>("idle")
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [gaze, setGaze] = useState({ x: 0, y: 0 })
  const [loadState, setLoadState] = useState<LoadState>("idle")
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const stageRef = useRef<HTMLButtonElement | null>(null)
  const live2dModelRef = useRef<Live2DInstance | null>(null)
  const moodRef = useRef<Mood>("idle")
  const availableParamsRef = useRef<Set<string>>(new Set())
  const dragStateRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    originX: number
    originY: number
  } | null>(null)

  const message = useMemo(() => {
    if (loadState === "loading") return "Live2D 模型加载中。"
    if (loadState === "error") return "Live2D runtime 加载失败，请检查网络或 Cubism Core。"
    if (mood === "curious") return idleMessages[messageIndex % idleMessages.length]

    return companionMessages[messageIndex % companionMessages.length]
  }, [loadState, messageIndex, mood])

  useEffect(() => {
    moodRef.current = mood
  }, [mood])

  useEffect(() => {
    if (isHidden || isMinimized) return

    const timer = window.setInterval(() => {
      setMood("curious")
      setMessageIndex((index) => index + 1)
      window.setTimeout(() => setMood("idle"), 2200)
    }, 12000)

    return () => window.clearInterval(timer)
  }, [isHidden, isMinimized])

  useEffect(() => {
    if (isHidden || isMinimized) return

    let frame = 0
    const handlePointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current
      if (dragState) {
        if (event.pointerId !== dragState.pointerId) return

        const nextX = dragState.originX + event.clientX - dragState.startX
        const nextY = dragState.originY + event.clientY - dragState.startY
        setIsDragging(true)
        setOffset({
          x: Math.max(-window.innerWidth + 190, Math.min(48, nextX)),
          y: Math.max(-window.innerHeight + 230, Math.min(48, nextY)),
        })
        return
      }

      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const rect = stageRef.current?.getBoundingClientRect()
        if (!rect) return

        const centerX = rect.left + rect.width * 0.5
        const centerY = rect.top + rect.height * 0.32
        const x = Math.max(-1, Math.min(1, (event.clientX - centerX) / (window.innerWidth * 0.34)))
        const y = Math.max(-1, Math.min(1, (event.clientY - centerY) / (window.innerHeight * 0.3)))
        setGaze({ x: Number(x.toFixed(3)), y: Number(y.toFixed(3)) })

        const model = live2dModelRef.current
        const availableParams = availableParamsRef.current
        if (model && loadState === "ready") {
          model.setParams(getMoodParams(moodRef.current, { x, y }, availableParams))
        }
      })
    }

    const stopDrag = () => {
      dragStateRef.current = null
      window.setTimeout(() => setIsDragging(false), 0)
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", stopDrag)
    window.addEventListener("pointercancel", stopDrag)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", stopDrag)
      window.removeEventListener("pointercancel", stopDrag)
    }
  }, [isHidden, isMinimized, loadState])

  useEffect(() => {
    if (loadState !== "ready") return

    live2dModelRef.current?.setParams(getMoodParams(mood, gaze, availableParamsRef.current))
  }, [gaze, loadState, mood])

  useEffect(() => {
    if (isHidden || isMinimized) return

    const currentCanvas = canvasRef.current
    const currentStage = stageRef.current
    if (!currentCanvas || !currentStage) return

    const canvas = currentCanvas
    const stage = currentStage
    let disposed = false
    let resizeObserver: ResizeObserver | null = null
    let live2dModel: Live2DInstance | null = null

    async function setupLive2D() {
      setLoadState("loading")

      try {
        const { init } = await import("l2d")
        if (disposed) return

        canvas.width = Math.max(1, Math.round(stage.clientWidth * window.devicePixelRatio))
        canvas.height = Math.max(1, Math.round(stage.clientHeight * window.devicePixelRatio))

        const model = init(canvas)
        if (!model) throw new Error("Live2D canvas 初始化失败")

        live2dModel = model
        live2dModelRef.current = model

        await model.load({
          path: MODEL_URL,
          scale: 0.92,
          position: [0, -0.04],
          volume: 0,
          logLevel: "warn",
        })
        if (disposed) {
          model.destroy()
          return
        }

        availableParamsRef.current = new Set(model.getParams().map((param) => param.id))
        model.setParams(getMoodParams(moodRef.current, { x: 0, y: 0 }, availableParamsRef.current))

        const fitModel = () => {
          model.resize()
          model.setScale(0.92)
          model.setPosition(0, -0.04)
        }

        resizeObserver = new ResizeObserver(fitModel)
        resizeObserver.observe(stage)

        setLoadState("ready")
      } catch (error) {
        console.error("Live2D companion failed to load:", error)
        if (!disposed) setLoadState("error")
      }
    }

    setupLive2D()

    return () => {
      disposed = true
      resizeObserver?.disconnect()

      live2dModel?.destroy()
      availableParamsRef.current = new Set()
      live2dModelRef.current = null
    }
  }, [isHidden, isMinimized])

  const stageStyle = {
    "--look-x": gaze.x,
    "--look-y": gaze.y,
  } as CSSProperties

  if (isHidden) {
    return (
      <button
        type="button"
        className="companion-return fixed bottom-5 right-5 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[rgba(17,12,28,0.72)] text-primary shadow-[0_14px_38px_rgba(0,0,0,0.28)] backdrop-blur-md transition-transform hover:-translate-y-1"
        onClick={() => setIsHidden(false)}
        aria-label="唤回 Live2D 互动角色"
      >
        <Sparkles className="h-5 w-5" />
      </button>
    )
  }

  if (isMinimized) {
    return (
      <div className="companion-dock fixed bottom-5 right-5 z-[70]">
        <button
          type="button"
          className="companion-dock-button group relative h-16 w-16 overflow-hidden rounded-full border border-white/12 bg-[rgba(17,12,28,0.68)] text-xs font-black uppercase tracking-[0.18em] text-primary shadow-[0_18px_44px_rgba(0,0,0,0.28)] backdrop-blur-md"
          onClick={() => setIsMinimized(false)}
          aria-label="展开 Live2D 互动角色"
        >
          L2D
        </button>
      </div>
    )
  }

  return (
    <aside
      className={`interactive-companion live2d-companion fixed bottom-4 right-3 z-[70] select-none md:bottom-6 md:right-6 is-${mood} is-${loadState}`}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      aria-label="Live2D 互动角色挂件"
    >
      <div className="companion-bubble pointer-events-none absolute w-56 rounded-[1.15rem] border border-white/12 bg-[rgba(16,11,28,0.72)] px-4 py-3 text-sm leading-6 text-white/86 shadow-[0_18px_44px_rgba(0,0,0,0.25)] backdrop-blur-md">
        <span className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
          <MessageCircle className="h-3.5 w-3.5" />
          QAQ helper
        </span>
        {message}
      </div>

      <div className="companion-actions absolute right-1 top-1 z-30 flex gap-2 opacity-80 transition-opacity hover:opacity-100">
        <button type="button" className="companion-action" onClick={() => setIsMinimized(true)} aria-label="最小化 Live2D 互动角色">
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button type="button" className="companion-action" onClick={() => setIsHidden(true)} aria-label="关闭 Live2D 互动角色">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        ref={stageRef}
        type="button"
        className="live2d-stage group relative block h-[260px] w-[210px] overflow-visible rounded-[2rem] md:h-[360px] md:w-[292px]"
        style={stageStyle}
        onPointerDown={(event) => {
          const target = event.target
          if (target instanceof HTMLElement && target.closest(".companion-action")) return

          dragStateRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            originX: offset.x,
            originY: offset.y,
          }
        }}
        onMouseEnter={() => setMood("curious")}
        onMouseLeave={() => {
          setMood("idle")
          setGaze({ x: 0, y: 0 })
          live2dModelRef.current?.setParams(getMoodParams("idle", { x: 0, y: 0 }, availableParamsRef.current))
        }}
        onClick={() => {
          if (isDragging) return

          setMood("happy")
          setMessageIndex((index) => index + 1)
          window.setTimeout(() => setMood("idle"), 1800)
        }}
        aria-label="和 Live2D 互动角色打招呼"
      >
        <span className="companion-shadow pointer-events-none absolute bottom-0 left-1/2 h-10 w-32 -translate-x-1/2 rounded-full bg-black/30 blur-xl" />
        <span className="companion-glow pointer-events-none absolute bottom-10 left-1/2 h-44 w-36 -translate-x-1/2 rounded-full bg-primary/18 blur-2xl" />
        <span className="live2d-halo live2d-halo--back" />
        <canvas ref={canvasRef} className="live2d-canvas pointer-events-none absolute inset-0 z-10 h-full w-full" />
        {loadState !== "ready" ? <span className="live2d-loading pointer-events-none absolute inset-x-8 bottom-16 z-20 rounded-full border border-white/10 bg-black/24 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">{loadState === "error" ? "Runtime Error" : "Loading Live2D"}</span> : null}
        <span className="companion-spark companion-spark--one" />
        <span className="companion-spark companion-spark--two" />
        <span className="companion-spark companion-spark--three" />
      </button>
    </aside>
  )
}
