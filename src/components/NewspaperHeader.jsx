import { motion } from 'framer-motion'
import { Divider } from 'animal-island-ui'

export default function NewspaperHeader() {
  return (
    <header style={{
      borderBottom: 'var(--border)',
      position: 'relative',
      zIndex: 1,
      background: 'var(--paper)',
    }}>
      {/* Top bar */}
      <div style={{
        background: 'var(--blue-deep)',
        color: 'var(--gold-light)',
        fontFamily: 'var(--font)',
        fontSize: 11,
        padding: '5px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        letterSpacing: '2px',
      }}>
        <span>洛克王国 · 魔法学院</span>
        <span>◆ ROCO KINGDOM OFFICIAL PRESS ◆</span>
        <span>2026年5月4日 · 第七十八期</span>
      </div>

      {/* Masthead */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: '10px 24px 0',
      }}>
        {/* Left crest — static, no constant rotation */}
        <div style={{ fontSize: 40, lineHeight: 1 }}>🔮</div>

        {/* Title block */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <motion.h1
            style={{
              fontFamily: 'var(--font)',
              fontSize: 'clamp(30px, 5vw, 52px)',
              color: 'var(--blue-deep)',
              letterSpacing: '8px',
              lineHeight: 1,
              textShadow: '3px 3px 0 var(--paper-dark)',
            }}
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            魔法学院快报
          </motion.h1>
          <motion.p
            style={{
              fontFamily: 'var(--font)',
              fontSize: 11,
              color: 'var(--ink-mid)',
              letterSpacing: '3px',
              marginTop: 2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            MAGIC ACADEMY EXPRESS · 洛克王国官方发行
          </motion.p>
        </div>

        {/* Right crest — static */}
        <div style={{ fontSize: 40, lineHeight: 1 }}>⚡</div>
      </div>

      {/* animal-island-ui wave divider */}
      <div style={{ margin: '4px 0 0' }}>
        <Divider type="wave-yellow" />
      </div>

      {/* Sub-headline bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        borderTop: '1.5px solid var(--ink)',
        background: 'var(--paper-dark)',
      }}>
        <Subhead text="精灵是最好的伙伴"       align="left"  />
        <Subhead text="【绩点大赛 · 全境开放】" align="center" bold highlight />
        <Subhead text="咕噜球技术再升级"        align="right" />
      </div>
    </header>
  )
}

function Subhead({ text, align, bold, highlight }) {
  return (
    <div style={{
      padding: '5px 16px',
      fontFamily: 'var(--font)',
      fontSize: 12,
      fontWeight: bold ? 'bold' : 'normal',
      color: highlight ? 'var(--orange)' : 'var(--ink-mid)',
      textAlign: align,
      letterSpacing: '1px',
      borderLeft:  align === 'center' ? 'var(--border)' : 'none',
      borderRight: align === 'center' ? 'var(--border)' : 'none',
    }}>
      {text}
    </div>
  )
}
