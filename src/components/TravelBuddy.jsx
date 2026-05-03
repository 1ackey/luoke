import { useState } from 'react'
import { motion } from 'framer-motion'
import MagicCard from './MagicCard'

const BUDDIES = [
  {
    icon: '🦆',
    name: '水灵鸭',
    trait: '代步·水路',
    desc: '载你穿越溪流与湖泊，速度极快，是水路探索的最佳伙伴。',
    color: '#3A6694',
    tags: ['水系', '速度型'],
  },
  {
    icon: '⚙️',
    name: '机械精灵',
    trait: '代步·飞行',
    desc: '飞行最稳，翱翔天际，是探索高山秘境的首选。',
    color: '#7B5C3A',
    tags: ['机械系', '飞行型'],
  },
  {
    icon: '🐑',
    name: '探宝小羊',
    trait: '探索·寻宝',
    desc: '嗅觉灵敏，能感知隐藏宝箱，是陆地寻宝的利器。',
    color: '#4A7C3F',
    tags: ['自然系', '辅助型'],
  },
  {
    icon: '🔥',
    name: '火花',
    trait: '初始伙伴',
    desc: '陪伴每位新洛克踏上旅途的初始伙伴，热情而忠诚。',
    color: '#C4501A',
    tags: ['火系', '伙伴型'],
  },
]

export default function TravelBuddy() {
  const [selected, setSelected] = useState(null)

  return (
    <div>
      <div className="col-label">是旅行搭子</div>

      <div style={{ marginBottom: 10 }}>
        <p style={{ fontFamily: 'var(--font)', fontSize: 11, color: 'var(--ink-mid)', lineHeight: 1.7 }}>
          "一般般"天赋的精灵，往往是冒险路上最可靠的同伴——鸭子游得最快，机械精灵飞得最稳，小羊最敏锐。
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {BUDDIES.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            <MagicCard
              selected={selected === i}
              style={{ marginBottom: 0 }}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <div
                style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}
                onClick={() => setSelected(selected === i ? null : i)}
              >
                {/* Icon badge */}
                <motion.div
                  whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: b.color,
                    border: 'var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    flexShrink: 0,
                    boxShadow: '2px 2px 0 var(--ink)',
                  }}
                >
                  {b.icon}
                </motion.div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'var(--font)', fontWeight: 'bold', fontSize: 14, color: 'var(--blue-deep)' }}>
                      {b.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font)', fontSize: 10, color: 'var(--orange)', fontWeight: 'bold' }}>
                      {b.trait}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font)', fontSize: 10.5, color: 'var(--ink-mid)', lineHeight: 1.6, marginTop: 2 }}>
                    {b.desc}
                  </p>
                  <div style={{ marginTop: 4 }}>
                    {b.tags.map(t => (
                      <span key={t} className="tag" style={{ color: b.color, fontSize: 9 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </MagicCard>
          </motion.div>
        ))}
      </div>

      {/* Bottom notice */}
      <motion.div
        style={{
          marginTop: 8,
          padding: '8px 10px',
          background: 'var(--paper-dark)',
          border: '1.5px dashed var(--ink-mid)',
          borderRadius: 'var(--radius-sm)',
        }}
        animate={{ borderColor: ['var(--ink-mid)', 'var(--gold)', 'var(--ink-mid)'] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <p style={{ fontFamily: 'var(--font)', fontSize: 10, color: 'var(--ink-mid)', textAlign: 'center' }}>
          ✦ 点击精灵卡片查看流光边框 ✦
        </p>
      </motion.div>
    </div>
  )
}
