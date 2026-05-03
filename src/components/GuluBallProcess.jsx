import { useState, useRef, useEffect } from 'react'
import { motion, useAnimationFrame } from 'framer-motion'

const NODES = [
  { id: 0, label: '野外探索', icon: '🌿', desc: '发现目标精灵', angle: -90 },
  { id: 1, label: '召唤球球', icon: '✨', desc: '选择咕噜球', angle: -18 },
  { id: 2, label: '精准投掷', icon: '🎯', desc: '蓄力并投出', angle: 54 },
  { id: 3, label: '魔力共振', icon: '🌀', desc: '共振判定中…', angle: 126 },
  { id: 4, label: '收服成功', icon: '🏆', desc: '精灵入球！', angle: 198 },
]

const R = 110 // radius of node orbit
const CX = 160 // SVG center X
const CY = 160 // SVG center Y

function toXY(angleDeg, r = R) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

/* Animated particle that travels along a straight line from src to dst */
function EnergyParticle({ from, to, delay = 0, color = 'var(--gold)' }) {
  return (
    <motion.circle
      r="5"
      fill={color}
      filter="url(#glow)"
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={{
        cx: [from.x, to.x],
        cy: [from.y, to.y],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 1.4,
        delay,
        repeat: Infinity,
        repeatDelay: 1.2,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function GuluBallProcess() {
  const [hoveredNode, setHoveredNode] = useState(null)

  return (
    <div style={{ position: 'relative' }}>
      <div className="col-label" style={{ marginLeft: 8 }}>出行 · 咕噜球</div>

      <div style={{
        background: 'var(--cream)',
        border: 'var(--border)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow)',
        padding: '12px 8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'visible',
      }}>
        <p style={{
          fontFamily: 'var(--font)',
          fontSize: 11,
          color: 'var(--ink-mid)',
          textAlign: 'center',
          marginBottom: 8,
          letterSpacing: 1,
        }}>
          恩佐改良版咕噜球 · 收服成功率提升 <span style={{ color: 'var(--orange)', fontWeight: 'bold' }}>40%</span>
        </p>

        <svg
          viewBox="0 0 320 320"
          style={{ width: '100%', maxWidth: 300, overflow: 'visible' }}
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-strong">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection lines between nodes */}
          {NODES.map((node, i) => {
            const next = NODES[(i + 1) % NODES.length]
            const p1 = toXY(node.angle)
            const p2 = toXY(next.angle)
            return (
              <g key={`line-${i}`}>
                <line
                  x1={p1.x} y1={p1.y}
                  x2={p2.x} y2={p2.y}
                  stroke="var(--paper-edge)"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                {/* Active line highlight when adjacent node hovered */}
                {(hoveredNode === node.id || hoveredNode === next.id) && (
                  <motion.line
                    x1={p1.x} y1={p1.y}
                    x2={p2.x} y2={p2.y}
                    stroke="var(--gold)"
                    strokeWidth="2.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
                {/* Energy particles */}
                <EnergyParticle from={p1} to={p2} delay={i * 0.4} />
              </g>
            )
          })}

          {/* Center lines from each node to center */}
          {NODES.map((node) => {
            const p = toXY(node.angle)
            return (
              <motion.line
                key={`spoke-${node.id}`}
                x1={CX} y1={CY}
                x2={p.x} y2={p.y}
                stroke={hoveredNode === node.id ? 'var(--gold)' : 'var(--paper-edge)'}
                strokeWidth="1"
                strokeDasharray="3 5"
                opacity="0.6"
                animate={{ opacity: hoveredNode === node.id ? 1 : 0.35 }}
              />
            )
          })}

          {/* Center 咕噜球 */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${CX}px ${CY}px`, cursor: 'pointer' }}
          >
            {/* Outer glow ring */}
            <circle cx={CX} cy={CY} r="38" fill="none" stroke="var(--gold)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
          </motion.g>

          {/* Static ball parts */}
          <circle cx={CX} cy={CY} r="30" fill="#F5E642" stroke="var(--ink)" strokeWidth="2.5" />
          <path d={`M ${CX - 30} ${CY} A 30 30 0 0 1 ${CX + 30} ${CY} Z`} fill="var(--blue-deep)" />
          <line x1={CX - 30} y1={CY} x2={CX + 30} y2={CY} stroke="var(--ink)" strokeWidth="2.5" />
          <circle cx={CX} cy={CY} r="10" fill="var(--cream)" stroke="var(--ink)" strokeWidth="2" />
          <circle cx={CX} cy={CY} r="5" fill="white" stroke="var(--ink)" strokeWidth="1.5" />
          <circle cx={CX - 10} cy={CY - 12} r="4" fill="rgba(255,255,255,0.5)" />

          {/* Node circles */}
          {NODES.map((node) => {
            const p = toXY(node.angle)
            const isHovered = hoveredNode === node.id
            return (
              <motion.g
                key={node.id}
                animate={
                  isHovered
                    ? { scale: 1.25, filter: 'url(#glow-strong)' }
                    : { scale: 1 }
                }
                style={{ transformOrigin: `${p.x}px ${p.y}px`, cursor: 'pointer' }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                whileTap={{
                  rotate: [0, -12, 12, -8, 8, 0],
                  transition: { duration: 0.5 },
                }}
              >
                {/* Node background circle */}
                <motion.circle
                  cx={p.x} cy={p.y} r="24"
                  fill={isHovered ? 'var(--blue-deep)' : 'var(--cream)'}
                  stroke="var(--ink)"
                  strokeWidth="2.5"
                  animate={{ fill: isHovered ? 'var(--blue-deep)' : 'var(--cream)' }}
                  transition={{ duration: 0.2 }}
                />
                {/* Icon */}
                <text
                  x={p.x} y={p.y - 4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="18"
                >
                  {node.icon}
                </text>
                {/* Label */}
                <text
                  x={p.x} y={p.y + 14}
                  textAnchor="middle"
                  fontSize="8"
                  fontFamily="var(--font)"
                  fill={isHovered ? 'var(--gold-light)' : 'var(--ink)'}
                >
                  {node.label}
                </text>
              </motion.g>
            )
          })}
        </svg>

        {/* Hover info panel */}
        <div style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {hoveredNode !== null && (
            <motion.p
              key={hoveredNode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: 'var(--font)',
                fontSize: 12,
                color: 'var(--blue-deep)',
                textAlign: 'center',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>{NODES[hoveredNode].label}</span>
              ：{NODES[hoveredNode].desc}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}
