import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

let id = 0

function Sparkle({ x, y, delay, onDone }) {
  const offsetX = (Math.random() - 0.5) * 80
  const offsetY = -30 - Math.random() * 60
  const rotate = (Math.random() - 0.5) * 120

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0,
        rotate: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0.6],
        x: offsetX,
        y: offsetY,
        rotate,
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      onAnimationComplete={onDone}
      style={{
        position: 'fixed',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.9)',
          boxShadow: `
            0 0 8px rgba(255,255,255,0.8),
            0 0 18px rgba(255,255,255,0.5)
          `,
          backdropFilter: 'blur(2px)',
        }}
      />
    </motion.div>
  )
}

export default function ClickSparkles() {
  const [particles, setParticles] = useState([])

  const handleClick = useCallback((e) => {
    const amount = 6

    const newParticles = Array.from({ length: amount }, (_, i) => ({
      id: id++,
      x: e.clientX,
      y: e.clientY,
      delay: i * 0.03,
    }))

    setParticles(prev => [...prev, ...newParticles])
  }, [])

  useEffect(() => {
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [handleClick])

  const remove = (targetId) => {
    setParticles(prev => prev.filter(p => p.id !== targetId))
  }

  return (
    <AnimatePresence>
      {particles.map(p => (
        <Sparkle
          key={p.id}
          {...p}
          onDone={() => remove(p.id)}
        />
      ))}
    </AnimatePresence>
  )
}