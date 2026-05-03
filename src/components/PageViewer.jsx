import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Divider } from 'animal-island-ui'
import TravelBuddy from './TravelBuddy'
import MainFeature from './MainFeature'
import BattleHelper from './BattleHelper'
import GuluBallProcess from './GuluBallProcess'
import BottomSection from './BottomSection'

/*
 * PageViewer — PDF page frame + navigation.
 *
 * HOW TO INSERT YOUR PDF PAGES:
 *   Add entries to the PAGES array below.
 *   Each entry: { label: '第X版', content: <img src="/pages/pageX.jpg" ... /> }
 *   Current first page is the interactive React placeholder.
 */
function PlaceholderPage() {
  return (
    <>
      <div className="newspaper-body">
        <div className="col col-left"><TravelBuddy /></div>
        <div className="col col-center">
          <MainFeature />
          <GuluBallProcess />
        </div>
        <div className="col col-right"><BattleHelper /></div>
      </div>
      <BottomSection />
    </>
  )
}

/* ─── 在此处插入 PDF 页面 ──────────────────────────────────────────────────
 * { label: '第二版', content: <img src="/pages/page2.jpg" style={{width:'100%'}} /> }
 * ─────────────────────────────────────────────────────────────────────────── */
const PAGES = [
  { label: '第一版', content: <PlaceholderPage /> },
]

export default function PageViewer() {
  const [current,   setCurrent]   = useState(0)
  const [direction, setDirection] = useState(1)

  const go = (dir) => {
    const next = current + dir
    if (next < 0 || next >= PAGES.length) return
    setDirection(dir)
    setCurrent(next)
  }

  const pageVariants = {
    enter:  (d) => ({ x: d > 0 ? '55%' : '-55%', opacity: 0, scale: 0.96 }),
    center: {       x: 0,                          opacity: 1, scale: 1    },
    exit:   (d) => ({ x: d > 0 ? '-55%' : '55%', opacity: 0, scale: 0.96 }),
  }

  return (
    <div className="pdf-page-frame">
      {/* Page content with slide animation */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {PAGES[current].content}
        </motion.div>
      </AnimatePresence>

      {/* Navigation — only renders when there are multiple pages */}
      {PAGES.length > 1 && (
        <>
          <Divider type="line-brown" />
          <div style={{
            background: 'var(--paper-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            padding: '10px 20px',
            position: 'relative',
            zIndex: 2,
          }}>
            {/* animal-island-ui Button */}
            <Button
              type="default"
              disabled={current === 0}
              onClick={() => go(-1)}
            >
              ← 上一版
            </Button>

            {/* Page indicator dots */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {PAGES.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  whileHover={{ scale: 1.25 }}
                  style={{
                    width: i === current ? 28 : 9,
                    height: 9,
                    borderRadius: 999,
                    background: i === current ? 'var(--blue-deep)' : 'var(--paper-edge)',
                    border: '2px solid var(--ink)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'width 0.2s, background 0.2s',
                    boxShadow: i === current ? '2px 2px 0 var(--ink)' : 'none',
                  }}
                />
              ))}
            </div>

            <Button
              type="default"
              disabled={current === PAGES.length - 1}
              onClick={() => go(1)}
            >
              下一版 →
            </Button>

            {/* Page label */}
            <span style={{
              position: 'absolute',
              right: 20,
              fontFamily: 'var(--font)',
              fontSize: 12,
              color: 'var(--ink-mid)',
              letterSpacing: 1,
            }}>
              {PAGES[current].label} · {current + 1} / {PAGES.length}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
