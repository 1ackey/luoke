import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

let nextId = 0
/* Reduced to 3 emoji types; max 5 particles per click */
const EMOJIS = ['⭐', '✦', '✨']

function Particle({ x, y, emoji, angle, id, onDone }) {
  const dist = 50 + Math.random() * 50
  const dx = Math.cos(angle) * dist
  const dy = Math.sin(angle) * dist

  return (
    <motion.div
      key={id}
      style={{
        position: 'fixed',
        left: x,
        top: y,
        fontSize: 14 + Math.random() * 8,
        pointerEvents: 'none',
        zIndex: 99998,
        userSelect: 'none',
        willChange: 'transform, opacity',
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x: dx, y: dy, opacity: 0, scale: 0.4 }}
      transition={{ duration: 0.55 + Math.random() * 0.25, ease: 'easeOut' }}
      onAnimationComplete={onDone}
    >
      {emoji}
    </motion.div>
  )
}

export default function ClickParticles() {
  const [particles, setParticles] = useState([])

  const handleClick = useCallback((e) => {
    const count = 5
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: ++nextId,
      x: e.clientX,
      y: e.clientY,
      emoji: EMOJIS[i % EMOJIS.length],
      angle: (Math.PI * 2 * i) / count,
    }))
    setParticles(prev => [...prev, ...newParticles])
  }, [])

  // Attach once at mount
  useEffect(() => {
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [handleClick])

  const remove = (id) => setParticles(prev => prev.filter(p => p.id !== id))

  return (
    <AnimatePresence>
      {particles.map(p => (
        <Particle key={p.id} {...p} onDone={() => remove(p.id)} />
      ))}
    </AnimatePresence>
  )
}
