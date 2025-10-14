import React from "react"

type ArcProps = {
  start: Date
  end?: Date
  color: string
  now: Date
}

function getAngle(time: Date) {
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  return ((hours % 12) * 30) + (minutes * 0.5) + (seconds * (0.5 / 60))
}

export function ClockOverlay({ arcs }: { arcs: ArcProps[] }) {
  const size = 250
  const r = size / 2 - 6 // radius minus padding

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute top-0 left-0"
    >
      {arcs.map((arc, i) => {
        const startAngle = getAngle(arc.start) - 90
        const endAngle = getAngle(arc.end ?? arc.now) - 90

        const start = {
          x: size / 2 + r * Math.cos((startAngle * Math.PI) / 180),
          y: size / 2 + r * Math.sin((startAngle * Math.PI) / 180),
        }
        const end = {
          x: size / 2 + r * Math.cos((endAngle * Math.PI) / 180),
          y: size / 2 + r * Math.sin((endAngle * Math.PI) / 180),
        }

        const largeArc = endAngle - startAngle > 180 ? 1 : 0

        return (
          <path
            key={i}
            d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`}
            stroke={arc.color}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}
