import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { Cursor, Footer } from 'animal-island-ui'
import Preloader from './components/Preloader'
import NewspaperHeader from './components/NewspaperHeader'
import PageViewer from './components/PageViewer'
import FloatingNotification from './components/FloatingNotification'
import ClickParticles from './components/ClickParticles'
import SceneBackground from './components/SceneBackground'

/* Wind lines that shoot across the screen as the newspaper arrives */
function WindEffect({ active }) {
  if (!active) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none' }}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: `${12 + i * 13}%`,
            left: '110%',
            width: `${70 + i * 25}px`,
            height: 2,
            background: `rgba(180,220,255,${0.3 + i * 0.04})`,
            borderRadius: 2,
          }}
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: '-130vw', opacity: [0, 0.65, 0] }}
          transition={{ duration: 0.55 + i * 0.07, delay: i * 0.05, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}

export default function App() {
  const [loading,  setLoading]  = useState(true)
  const [settling, setSettling] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    if (loading) return

    setSettling(true)

    const t = setTimeout(async () => {
      setSettling(false)

      /* Stage 1 — fly in from the right window (spring) */
      await controls.start({
        x: 0,
        y: 0,
        rotate: -1.5,
        scale: 1,
        opacity: 1,
        transition: {
          type: 'spring',
          stiffness: 68,
          damping: 14,
          mass: 1.4,
          opacity: { duration: 0.25 },
        },
      })
    }, 500)

    return () => clearTimeout(t)
  }, [loading, controls])

  return (
    /* animal-island-ui Cursor wraps everything — applies AC finger-cursor to all children */
    <Cursor>
      <ClickParticles />
      <SceneBackground visible={!loading} />
      <WindEffect active={settling} />

      {/* Preloader */}
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Newspaper — flies in from the right window */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            className="newspaper-stage"
            initial={{ x: '115vw', y: '-18vh', rotate: 32, scale: 0.62, opacity: 0 }}
            animate={controls}
          >
            <div className="newspaper-paper">
              <NewspaperHeader />
              <PageViewer />

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && <FloatingNotification />}
    </Cursor>
  )
}
