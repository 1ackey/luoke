import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Typewriter } from 'animal-island-ui'

/* CSS-drawn 咕噜球 */
function GuluBallSVG({ size = 90 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="46" fill="#F5E642" stroke="#1E1A14" strokeWidth="3" />
      <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#2D4B73" />
      <line x1="4" y1="50" x2="96" y2="50" stroke="#1E1A14" strokeWidth="3" />
      <circle cx="50" cy="50" r="13" fill="#E8E3CA" stroke="#1E1A14" strokeWidth="3" />
      <circle cx="50" cy="50" r="7" fill="white" stroke="#1E1A14" strokeWidth="2" />
      <circle cx="35" cy="30" r="5" fill="rgba(255,255,255,0.5)" />
    </svg>
  )
}

export default function Preloader({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--paper)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99990,
        }}
        exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.45 }}
      >
        {/* Shadow under ball */}
        <motion.div
          style={{
            width: 70,
            height: 10,
            borderRadius: '50%',
            background: 'rgba(30,26,20,0.18)',
            marginBottom: 4,
          }}
          animate={{ scaleX: [1, 1.35, 1, 0.8, 1] }}
          transition={{ duration: 0.85, repeat: 3, ease: 'easeInOut' }}
        />

        {/* Ball squash-and-stretch */}
        <motion.div
          style={{ marginBottom: 10, originY: 1 }}
          animate={{
            y: [0, -110, 0, -55, 0, -28, 0],
            scaleY: [1, 1.1, 0.6, 1, 0.78, 1, 1],
            scaleX: [1, 0.9, 1.4, 1, 1.22, 1, 1],
          }}
          transition={{ duration: 2.0, ease: 'easeInOut',
            times: [0, 0.2, 0.38, 0.54, 0.68, 0.84, 1] }}
        >
          <GuluBallSVG size={90} />
        </motion.div>

        {/* animal-island-ui Typewriter for the loading text */}
        <div style={{
          fontFamily: 'var(--font)',
          fontSize: 20,
          color: 'var(--blue-deep)',
          marginTop: 20,
          letterSpacing: '3px',
        }}>
          <Typewriter speed={80}>魔法学院快报 加载中…</Typewriter>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
