import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [cursorState, setCursorState] = useState('default') // 'default'|'hover'|'text'|'view'
  
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  // Outer trail
  const trailX = useSpring(mouseX, { stiffness: 150, damping: 25 })
  const trailY = useSpring(mouseY, { stiffness: 150, damping: 25 })
  
  // Inner dot
  const springX = useSpring(mouseX, { stiffness: 500, damping: 40 })
  const springY = useSpring(mouseY, { stiffness: 500, damping: 40 })

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)')
    const sync = () => setEnabled(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const onMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [enabled, mouseX, mouseY])

  useEffect(() => {
    if (!enabled) return
    const handleMouseOver = (e) => {
      const el = e.target.closest('[data-cursor]')
      const next = el?.getAttribute('data-cursor')
      if (next === 'hover' || next === 'view') setCursorState(next)
      else setCursorState('default')
    }
    const handleMouseOut = (e) => {
      // Only reset if we are not moving into another data-cursor element
      if (e.relatedTarget && e.relatedTarget.closest && e.relatedTarget.closest('[data-cursor]')) {
        return;
      }
      setCursorState('default')
    }
    
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    
    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [enabled])

  if (!enabled) return null

  // Variants for the inner tracker (usually text or specific shape)
  const variants = {
    default: {
      width: 12,
      height: 12,
      x: "-50%",
      y: "-50%",
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      opacity: 1
    },
    hover: {
      width: 48,
      height: 48,
      x: "-50%",
      y: "-50%",
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      opacity: 1
    },
    view: {
      width: 64,
      height: 64,
      x: "-50%",
      y: "-50%",
      borderRadius: "50%",
      backgroundColor: "transparent",
      border: "1px solid #ffffff",
      opacity: 1
    }
  }

  // Define trailing ring states
  const trailingVariants = {
    default: {
      width: 32,
      height: 32,
      opacity: 0.3,
      border: "1px solid #ffffff",
      backgroundColor: "transparent"
    },
    hover: { opacity: 0 },
    view: { opacity: 0 }
  }

  // Using a portal or just fixed positioning
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex justify-center items-center text-ink-950 font-mono text-[10px] tracking-widest font-bold overflow-hidden"
        style={{
          x: springX,
          y: springY,
          mixBlendMode: 'difference'
        }}
        variants={variants}
        animate={cursorState === 'view' ? 'view' : cursorState === 'hover' ? 'hover' : 'default'}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />

      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full flex justify-center items-center"
        style={{
          x: trailX,
          y: trailY,
          xOffset: "-50%",
          yOffset: "-50%",
          transform: "translate(-50%, -50%)",
          mixBlendMode: 'difference'
        }}
        variants={trailingVariants}
        animate={cursorState}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
