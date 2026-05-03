import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from 'animal-island-ui'

/* Inline magnifier on paragraph hover */
function Magnifier({ active, text }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.88 }}
          transition={{ duration: 0.18 }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 4,
            zIndex: 50,
            background: 'var(--cream)',
            border: 'var(--border)',
            borderRadius: 'var(--radius-card)',
            padding: '12px 14px',
            boxShadow: '6px 6px 0 var(--ink)',
            filter: 'contrast(1.12) brightness(1.04)',
            pointerEvents: 'none',
          }}
        >
          <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)',
            background: 'var(--blue-deep)', color: 'var(--gold-light)', fontFamily: 'var(--font)',
            fontSize: 9, padding: '2px 8px', borderRadius: 999, border: 'var(--border)', letterSpacing: 2 }}>
            🔍 放大
          </div>
          <p style={{ fontFamily: 'var(--font)', fontSize: 15, color: 'var(--ink)', lineHeight: 1.9 }}>
            {text}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function MainFeature() {
  const [magnifyParagraph, setMagnifyParagraph] = useState(null)

  const paras = [
    '由格里芬院长主导的"四大分院之旅"正式向全境开放，核心项目"绩点大赛"随之启动。王国各地迅速掀起了重返学院、钻研魔法的热潮。',
    '本次大赛打破招生限制，鼓励所有居民参与。课表每周一更新，随机包含4项任务，分为"主课"与"选修"，涵盖基础魔法到实地调研等领域。',
    '最受瞩目的奖励：累计600分可获得"专属分院服套装"。由皇家研究院参与设计，是各分院学术精神与荣誉的象征。',
  ]

  return (
    <div>
      {/* Feature banner — using animal-island-ui Card */}
      <Card color="app-blue" style={{ marginBottom: 'var(--gap)', textAlign: 'center', fontFamily: 'var(--font)' }}>
        <div style={{ fontSize: 44, lineHeight: 1, marginBottom: 6 }}>🌳</div>
        <h2 style={{ fontSize: 18, letterSpacing: 3, textShadow: '1px 1px 0 rgba(0,0,0,0.25)' }}>
          精灵是最好的伙伴
        </h2>
        <p style={{ fontSize: 11, marginTop: 4, opacity: 0.85 }}>—— 洛克王国精灵学者 · 艾拉</p>
      </Card>

      {/* Main article */}
      <div style={{
        background: 'var(--cream)', border: 'var(--border)',
        borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow)',
        padding: '12px', marginBottom: 'var(--gap)',
      }}>
        <div className="article-title">
          🎓 绩点大赛 · 全境开放
          <div style={{ fontSize: 10, fontWeight: 'normal', color: 'var(--ink-mid)', marginTop: 2 }}>
            本报记者 麦斯威尔
          </div>
        </div>

        {paras.map((p, i) => (
          <div
            key={i}
            style={{ position: 'relative', marginBottom: 6 }}
            onMouseEnter={() => setMagnifyParagraph(i)}
            onMouseLeave={() => setMagnifyParagraph(null)}
          >
            <p style={{
              fontFamily: 'var(--font)', fontSize: 11.5, color: 'var(--ink-mid)', lineHeight: 1.85,
              padding: '3px 4px', borderRadius: 4,
              background: magnifyParagraph === i ? 'rgba(212,160,23,0.08)' : 'transparent',
              transition: 'background 0.2s',
            }}>
              {p}
            </p>
            <Magnifier active={magnifyParagraph === i} text={p} />
          </div>
        ))}
      </div>

      {/* Exchange hubs */}
      <div style={{
        background: 'var(--cream)', border: 'var(--border)',
        borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow)',
        padding: '10px 12px', marginBottom: 'var(--gap)',
      }}>
        <div className="article-title" style={{ fontSize: 13 }}>绩点兑换枢纽</div>
        {[
          { icon: '🌱', name: '露比',   place: '生态园', desc: '稀有植物种苗', color: 'var(--green-deep)' },
          { icon: '🔮', name: '瓦雷莉', place: '仪式厅', desc: '神秘学材料',   color: 'var(--blue-mid)'  },
          { icon: '⚔️', name: '山姆森', place: '竞技场', desc: '对战护具与补给', color: 'var(--orange)'   },
        ].map((hub) => (
          <motion.div
            key={hub.name}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '4px 0', borderBottom: '1px solid var(--paper-edge)',
            }}
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <span style={{ fontSize: 16 }}>{hub.icon}</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: 'var(--font)', fontSize: 11, fontWeight: 'bold', color: hub.color }}>
                {hub.name}
              </span>
              <span style={{ fontFamily: 'var(--font)', fontSize: 10, color: 'var(--ink-mid)', marginLeft: 6 }}>
                {hub.place} · {hub.desc}
              </span>
            </div>
            <span style={{ fontSize: 10, color: 'var(--blue-mid)' }}>→</span>
          </motion.div>
        ))}
      </div>

      {/* Section divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0' }}>
        <div style={{ flex: 1, height: 1, background: 'var(--ink)' }} />
        <span style={{ fontFamily: 'var(--font)', fontSize: 11, color: 'var(--ink-mid)', whiteSpace: 'nowrap' }}>
          收集可可集 · 养成没烦恼
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--ink)' }} />
      </div>
    </div>
  )
}
