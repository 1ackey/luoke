import { useState } from 'react'
import { motion } from 'framer-motion'
import MagicCard from './MagicCard'

const FIGHTERS = [
  {
    icon: '🐉',
    name: '冰龙王',
    rank: '传奇',
    power: 98,
    desc: '王国顶级战力，冰系魔法至强，曾独自守护北境三年。',
    color: '#1B7A82',
    tags: ['冰系', '传奇级'],
  },
  {
    icon: '⚡',
    name: '迪莫',
    rank: '传奇',
    power: 95,
    desc: '雷电速攻型精灵，战场反应极快，是竞技场的常胜将军。',
    color: '#7B5C3A',
    tags: ['雷系', '速攻型'],
  },
  {
    icon: '🐺',
    name: '恶魔狼',
    rank: '稀有',
    power: 82,
    desc: '"胆小"性格意外爆发出超强战意，与梦魇月熊完成了王国记录中最意外的配对。',
    color: '#5C2D91',
    tags: ['暗系', '物攻型'],
  },
  {
    icon: '🐻',
    name: '梦魇月熊',
    rank: '稀有',
    power: 80,
    desc: '"悠闲"性格不代表实力弱，防御超群，是团队坚实的盾牌。',
    color: '#2C5F2E',
    tags: ['自然系', '防御型'],
  },
]

function PowerBar({ value }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 3,
    }}>
      <span style={{ fontFamily: 'var(--font)', fontSize: 9, color: 'var(--ink-mid)', width: 24 }}>战力</span>
      <div style={{ flex: 1, height: 5, background: 'var(--paper-dark)', borderRadius: 3, border: '1px solid var(--paper-edge)', overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', background: 'linear-gradient(90deg, var(--blue-mid), var(--gold))', borderRadius: 3 }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        />
      </div>
      <span style={{ fontFamily: 'var(--font)', fontSize: 9, color: 'var(--blue-deep)', width: 20 }}>{value}</span>
    </div>
  )
}

export default function BattleHelper() {
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <div className="col-label">是战斗帮手</div>

      <div style={{ marginBottom: 10 }}>
        <p style={{ fontFamily: 'var(--font)', fontSize: 11, color: 'var(--ink-mid)', lineHeight: 1.7 }}>
          竞技场山姆森配发专业对战护具。传奇精灵并肩作战，王国全境守护者，随时备战。
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FIGHTERS.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            <MagicCard
              selected={selected === i}
              style={{ marginBottom: 0 }}
            >
              <div
                style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}
                onClick={() => setSelected(selected === i ? null : i)}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: [-5, 5, -5, 0] }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: f.color,
                    border: 'var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    flexShrink: 0,
                    boxShadow: '2px 2px 0 var(--ink)',
                    position: 'relative',
                  }}
                >
                  {f.icon}
                  {/* Rank badge */}
                  <div style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    background: f.rank === '传奇' ? 'var(--gold)' : 'var(--paper)',
                    border: '1.5px solid var(--ink)',
                    borderRadius: 4,
                    padding: '0 3px',
                    fontSize: 7,
                    fontFamily: 'var(--font)',
                    color: 'var(--ink)',
                    fontWeight: 'bold',
                  }}>
                    {f.rank}
                  </div>
                </motion.div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'var(--font)', fontWeight: 'bold', fontSize: 14, color: 'var(--blue-deep)' }}>
                      {f.name}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font)', fontSize: 10.5, color: 'var(--ink-mid)', lineHeight: 1.55, marginTop: 2 }}>
                    {f.desc}
                  </p>
                  <PowerBar value={f.power} />
                  <div style={{ marginTop: 3 }}>
                    {f.tags.map(t => (
                      <span key={t} className="tag" style={{ color: f.color, fontSize: 9 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </MagicCard>
          </motion.div>
        ))}
      </div>

      {/* Arena notice */}
      <motion.div
        style={{
          marginTop: 8,
          padding: '8px 10px',
          background: 'var(--blue-deep)',
          border: 'var(--border)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow)',
        }}
        whileHover={{ scale: 1.02 }}
      >
        <p style={{ fontFamily: 'var(--font)', fontSize: 10, color: 'var(--gold-light)', textAlign: 'center', lineHeight: 1.6 }}>
          🏟️ 竞技场山姆森<br />
          <span style={{ color: 'var(--paper)' }}>配发专业护具与战略补给</span>
        </p>
      </motion.div>
    </div>
  )
}
