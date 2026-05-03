import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* Magic circle SVG shown on hover */
function MagicCircle() {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      style={{
        position: 'absolute',
        bottom: -30,
        left: '50%',
        translateX: '-50%',
        width: 120,
        height: 120,
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      whileHover={{ opacity: 0.25 }}
    >
      <motion.circle
        cx="60" cy="60" r="52"
        fill="none"
        stroke="var(--blue-mid)"
        strokeWidth="1.5"
        strokeDasharray="8 4"
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '60px', originY: '60px' }}
      />
      <motion.circle
        cx="60" cy="60" r="38"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1"
        strokeDasharray="4 6"
        animate={{ rotate: -360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '60px', originY: '60px' }}
      />
      {[0, 60, 120, 180, 240, 300].map(deg => {
        const rad = (deg * Math.PI) / 180
        const x = 60 + 44 * Math.cos(rad)
        const y = 60 + 44 * Math.sin(rad)
        return <circle key={deg} cx={x} cy={y} r="3" fill="var(--gold)" />
      })}
    </motion.svg>
  )
}

export default function MagicCard({
  children,
  style,
  className = '',
  enableTilt = true,
  enableMagicCircle = true,
  selected = false,
}) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!enableTilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -12
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 12
    setTilt({ x: rx, y: ry })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  const handleMouseEnter = () => setHovered(true)

  return (
    <div
      style={{ perspective: 800, position: 'relative', ...style }}
    >
      {/* Flowing border wrapper when selected */}
      {selected && (
        <div style={{
          position: 'absolute',
          inset: -3,
          borderRadius: 'calc(var(--radius-card) + 3px)',
          background: 'conic-gradient(from var(--gradient-angle, 0deg), var(--blue-deep), var(--gold), var(--orange), var(--teal), var(--blue-deep))',
          animation: 'flowing-border 2s linear infinite',
          zIndex: 0,
        }} />
      )}

      <motion.div
        ref={ref}
        className={`card ${className}`}
        style={{
          position: 'relative',
          zIndex: 1,
          overflow: 'visible',
        }}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        whileTap={{ scale: 0.97 }}
      >
        {children}

        {/* Shimmer overlay on hover */}
        {hovered && (
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)',
              borderRadius: 'inherit',
              pointerEvents: 'none',
              zIndex: 2,
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        )}
      </motion.div>

      {/* Magic circle */}
      {enableMagicCircle && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: -30,
            left: '50%',
            translateX: '-50%',
            width: 120,
            height: 120,
            pointerEvents: 'none',
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 0.25 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <MagicCircle />
        </motion.div>
      )}
    </div>
  )
}
