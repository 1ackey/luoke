import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* ── Animal Crossing style cursor SVG ── */
function ACCursorShape({ isPointer, isClick }) {
  return (
    <svg
      width="34"
      height="40"
      viewBox="0 0 34 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', filter: 'drop-shadow(1px 2px 2px rgba(44,95,46,0.30))' }}
    >
      {/* Main cursor body */}
      <path
        d="M 6 4 L 6 28 L 12 22 L 16 34 L 21 32 L 17 20 L 26 20 Z"
        fill={isClick ? '#FFD700' : isPointer ? '#E8F5E8' : '#FEF9E7'}
        stroke={isPointer ? '#1B7A82' : '#2C5F2E'}
        strokeWidth="2.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Leaf accent at tip */}
      <ellipse
        cx="7" cy="5.5" rx="5" ry="3"
        fill="#4A7C3F"
        transform="rotate(-42 7 5.5)"
        opacity="0.9"
      />
      <ellipse
        cx="7" cy="5.5" rx="2.2" ry="1.3"
        fill="#7AB355"
        transform="rotate(-42 7 5.5)"
        opacity="0.7"
      />
      {/* Specular highlight */}
      <ellipse
        cx="10.5" cy="9.5" rx="3" ry="1.8"
        fill="rgba(255,255,255,0.6)"
        transform="rotate(-20 10.5 9.5)"
      />
    </svg>
  )
}

export default function CustomCursor() {
  const cursorRef  = useRef(null)
  const trailRef   = useRef(null)
  const pos        = useRef({ x: 0, y: 0 })
  const trailPos   = useRef({ x: 0, y: 0 })
  const rafId      = useRef(null)
  const [isPointer, setIsPointer] = useState(false)
  const [isClick,   setIsClick]   = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      const el = e.target
      setIsPointer(
        window.getComputedStyle(el).cursor === 'pointer' ||
        el.tagName === 'BUTTON' || el.tagName === 'A'
      )
    }
    const onDown = () => setIsClick(true)
    const onUp   = () => setIsClick(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    const animate = () => {
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.13
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.13

      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${pos.current.x - 6}px, ${pos.current.y - 4}px)`
      }
      if (trailRef.current) {
        trailRef.current.style.transform =
          `translate(${trailPos.current.x - 12}px, ${trailPos.current.y - 12}px)`
      }
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      {/* Trail ring */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: '2px solid rgba(74,124,63,0.5)',
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'opacity 0.15s',
          willChange: 'transform',
        }}
      />

      {/* Main AC cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 100000,
          willChange: 'transform',
          transition: 'filter 0.08s',
          filter: isClick ? 'brightness(1.25) saturate(1.3)' : 'none',
          transform: `scale(${isClick ? 0.9 : isPointer ? 1.12 : 1})`,
        }}
      >
        <ACCursorShape isPointer={isPointer} isClick={isClick} />
      </div>
    </>
  )
}
