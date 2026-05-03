import { motion } from 'framer-motion'

export default function FloatingNotification() {
  return (
    <motion.div
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 9990,
      }}
      initial={{ opacity: 0, scale: 0.5, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2.5, type: 'spring', stiffness: 250, damping: 18 }}
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.93 }}
    >
      {/* Single breathing ring — no shimmer, simpler */}
      <motion.div
        style={{
          position: 'absolute',
          inset: -5,
          borderRadius: 22,
          border: '2px solid rgba(212,160,23,0.5)',
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.03, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={{
          background: 'var(--blue-deep)',
          border: 'var(--border)',
          borderRadius: 20,
          boxShadow: 'var(--shadow-lg)',
          padding: '10px 14px',
          minWidth: 120,
          textAlign: 'center',
          position: 'relative',
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{ fontSize: 20, marginBottom: 2 }}>📰</div>
        <div style={{ fontFamily: 'var(--font)', fontSize: 11, color: 'var(--gold-light)', fontWeight: 'bold', letterSpacing: 2 }}>
          皮卡月刊
        </div>
        <div style={{ fontFamily: 'var(--font)', fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
          本期特辑 · 绩点大赛
        </div>
        {/* Notification dot */}
        <motion.div
          style={{
            position: 'absolute', top: 6, right: 8,
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--orange)', border: '1.5px solid var(--ink)',
          }}
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  )
}
