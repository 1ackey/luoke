import { motion } from 'framer-motion'

/* Stripped-down scene — no floating leaf animations (performance) */
export default function SceneBackground({ visible }) {
  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* Soft vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(30,26,20,0.16) 100%)',
      }} />
    </motion.div>
  )
}
