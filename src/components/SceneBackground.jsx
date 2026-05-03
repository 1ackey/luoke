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
        contain: 'layout style',   /* reduce browser repaint scope */
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Sky → wall → desk gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(170deg, #B8D8EE 0%, #CAE8C0 25%, #EEE0C8 58%, #C8A070 100%)',
      }} />

      {/* Window-light glow from the right */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 92% 35%, rgba(255,240,160,0.40) 0%, transparent 50%)',
      }} />

      {/* Wooden desk surface */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '28%',
        background: 'linear-gradient(180deg, #C8A070 0%, #9A7040 100%)',
        borderTop: '4px solid rgba(60,30,0,0.30)',
      }} />

      {/* Wood grain lines */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '26%',
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 90px, rgba(0,0,0,0.045) 90px, rgba(0,0,0,0.045) 92px)',
      }} />

      {/* ── Window frame (right edge) ── */}
      <div style={{
        position: 'absolute',
        right: 0, top: 0, bottom: '28%',
        width: 64,
        background: '#8B6035',
        borderLeft: '3px solid #5A3A10',
        boxShadow: '-4px 0 12px rgba(0,0,0,0.22)',
      }} />
      {/* Glass */}
      <div style={{
        position: 'absolute',
        right: 3, top: 3, width: 58,
        bottom: 'calc(28% + 3px)',
        background: 'linear-gradient(135deg, rgba(190,225,250,0.60), rgba(160,210,240,0.38))',
      }} />
      {/* Horizontal bar */}
      <div style={{
        position: 'absolute',
        right: 0, top: '28%', width: 64, height: 5,
        background: '#8B6035',
        borderTop: '1px solid #5A3A10', borderBottom: '1px solid #5A3A10',
      }} />
      {/* Vertical bar */}
      <div style={{
        position: 'absolute',
        right: 29, top: 0, bottom: '28%', width: 5,
        background: '#8B6035',
      }} />
      {/* Static curtain */}
      <div style={{
        position: 'absolute',
        right: 64, top: 0, bottom: '28%', width: 26,
        background: 'linear-gradient(180deg, #E8C8A0, #C09050)',
        borderLeft: '2px solid #A07040',
        borderRadius: '0 0 10px 10px',
      }} />

      {/* Desk items — static, no animation */}
      <div style={{ position: 'absolute', bottom: '29%', left: '4%', fontSize: 32, lineHeight: 1 }}>🌺</div>
      <div style={{ position: 'absolute', bottom: '30%', left: '9%', fontSize: 24, lineHeight: 1 }}>📚</div>
      <div style={{ position: 'absolute', bottom: '29%', right: '10%', fontSize: 28, lineHeight: 1 }}>☕</div>

      {/* Soft vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(30,26,20,0.16) 100%)',
      }} />
    </motion.div>
  )
}
