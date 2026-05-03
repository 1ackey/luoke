import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ARTICLES = [
  {
    id: 0,
    icon: '🐛',
    label: '寻虫启事',
    color: 'var(--orange)',
    title: '紧急寻虫！燃薪虫小黑走丢了',
    body: '昨晚因帮朋友刷异色虫，一时疏忽没给她上锁，困得神志不清时不小心把她放生了。她身上带着橙红色的纹路，眼睛是暖黄色的。',
    reward: '确认信息：2000 拾光代币',
    contact: '@#1234567',
  },
  {
    id: 1,
    icon: '💌',
    label: '读者来信',
    color: 'var(--green-mid)',
    title: '菊花梨的信徒告白',
    body: '那只圆滚滚的小东西。它站在那里，头上顶着一朵小菊花，我就走不动路了。我给它起了名字，叫它"菊宝"。我朋友说你有病吧，我说嗯。',
    extra: '菊花梨😍😍😍菊花梨😍😍😍',
    credit: '一位不愿意透露姓名的小洛克',
  },
  {
    id: 2,
    icon: '🦎',
    label: '寻宠启事',
    color: 'var(--teal)',
    title: '紧急寻宠！卡瓦重，你跑哪去了？',
    body: '失踪一只绿色蜥蜴，手里两根摇锤，表情凶狠。最后目击：昨天下午在王城竞技场，大吼一声"践踏他们！！"扭头就跑。沙锤有一个还落在竞技场了。',
    reward: '2000 拾光代币 + 亲录铃声',
    contact: '一个还在竞技场等它回来的洛克',
  },
]

function ArticleCard({ article, expanded, onToggle }) {
  return (
    <motion.div
      layout
      style={{
        background: 'var(--cream)',
        border: 'var(--border)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow)',
        padding: 12,
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      whileHover={{ y: -2, boxShadow: 'var(--shadow-lg)' }}
      onClick={onToggle}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{
          background: article.color,
          border: 'var(--border)',
          borderRadius: 8,
          padding: '3px 8px',
          fontFamily: 'var(--font)',
          fontSize: 9,
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '1px 1px 0 var(--ink)',
          flexShrink: 0,
        }}>
          {article.label}
        </span>
        <motion.span style={{ fontSize: 20 }} whileHover={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 0.3 }}>
          {article.icon}
        </motion.span>
      </div>

      <div className="article-title" style={{ fontSize: 13 }}>{article.title}</div>
      <p className="article-body">{article.body}</p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {article.extra && (
              <p style={{ fontFamily: 'var(--font)', fontSize: 13, color: 'var(--green-mid)', marginTop: 6 }}>
                {article.extra}
              </p>
            )}
            {article.reward && (
              <div style={{
                marginTop: 8,
                padding: '6px 10px',
                background: 'var(--paper-dark)',
                borderRadius: 'var(--radius-xs)',
                border: '1.5px solid var(--gold)',
              }}>
                <p style={{ fontFamily: 'var(--font)', fontSize: 10, color: 'var(--ink-mid)' }}>
                  🎁 酬谢：<span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>{article.reward}</span>
                </p>
                {article.contact && (
                  <p style={{ fontFamily: 'var(--font)', fontSize: 10, color: 'var(--blue-mid)', marginTop: 2 }}>
                    📬 联系：{article.contact}
                  </p>
                )}
              </div>
            )}
            {article.credit && (
              <p className="article-author">—— {article.credit}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ textAlign: 'right', marginTop: 4 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span style={{ fontFamily: 'var(--font)', fontSize: 9, color: 'var(--blue-mid)' }}>
          {expanded ? '▲ 收起' : '▼ 点击展开'}
        </span>
      </motion.div>
    </motion.div>
  )
}

/* Enzo feature */
function EnzoFeature() {
  return (
    <div style={{
      background: 'var(--cream)',
      border: 'var(--border)',
      borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow)',
      padding: 12,
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <motion.div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: 'var(--blue-deep)',
            border: 'var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            flexShrink: 0,
            boxShadow: 'var(--shadow)',
          }}
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🧙
        </motion.div>
        <div>
          <div className="article-title" style={{ fontSize: 13 }}>王国之光：恩佐·卡尔维诺</div>
          <p className="article-body">
            二十岁之前同时达成三项成就：改良咕噜球技术、编写通用魔法教材、化解王国百年一遇的魔力紊乱危机。每位洛克手中的咕噜球，都沿用着他的技术标准。
          </p>
          <p className="article-author">—— 本报记者 麦斯威尔</p>
        </div>
      </div>
    </div>
  )
}

export default function BottomSection() {
  const [expanded, setExpanded] = useState(null)

  const toggle = (id) => setExpanded(prev => prev === id ? null : id)

  return (
    <div className="bottom-section">
      {/* Left: Lost notices */}
      <div className="bottom-col" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="col-label">王国公告栏</div>
        {ARTICLES.slice(0, 2).map(a => (
          <ArticleCard
            key={a.id}
            article={a}
            expanded={expanded === a.id}
            onToggle={() => toggle(a.id)}
          />
        ))}
      </div>

      {/* Center: Enzo interview + spirit science */}
      <div className="bottom-col" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="col-label">人物专访</div>
        <EnzoFeature />

        <div style={{
          background: 'var(--paper-dark)',
          border: 'var(--border)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow)',
          padding: 12,
        }}>
          <div className="article-title" style={{ fontSize: 13 }}>📚 科普角：天赋"一般般"也精彩</div>
          <p className="article-body" style={{ lineHeight: 1.75 }}>
            精灵面板天赋评级从高到低：<span className="bold text-blue">"了不起""相当好""还不错""一般般"</span>。事实上，王国绝大多数精灵都是"一般般"天赋，但这并不代表平庸——它们的优势，从来不在面板的数值上。
          </p>
          <p className="article-author">—— 精灵学者 艾拉</p>
        </div>
      </div>

      {/* Right: Remaining notices + reader letter */}
      <div className="bottom-col" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="col-label">趣闻角落</div>
        <ArticleCard
          article={ARTICLES[2]}
          expanded={expanded === ARTICLES[2].id}
          onToggle={() => toggle(ARTICLES[2].id)}
        />

        {/* Bannister story */}
        <div style={{
          background: 'var(--cream)',
          border: 'var(--border)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow)',
          padding: 12,
        }}>
          <div className="article-title" style={{ fontSize: 13 }}>💙 以爱为名的陪伴</div>
          <p className="article-body">
            患有遗忘症的班尼斯特老人，唯独没有忘记他用自己名字命名的音速犬班班。"我可以忘记全世界，却舍不得忘记你。"
          </p>
          <p className="article-author">—— 洛克本土观察员</p>
        </div>
      </div>
    </div>
  )
}
