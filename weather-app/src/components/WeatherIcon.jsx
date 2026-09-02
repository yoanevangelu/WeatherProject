const STROKE = 'currentColor'

function Sun(props) {
  return (
    <g stroke={STROKE} strokeWidth="1.4" fill="none" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.6M12 18.9v2.6M21.5 12h-2.6M5.1 12H2.5M18.5 5.5l-1.8 1.8M7.3 16.7l-1.8 1.8M18.5 18.5l-1.8-1.8M7.3 7.3L5.5 5.5" />
    </g>
  )
}

function Cloud(props) {
  return (
    <path
      stroke={STROKE}
      strokeWidth="1.4"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
      d="M6.8 17.2a4.1 4.1 0 0 1-.6-8.16 5 5 0 0 1 9.6-1.9 4.3 4.3 0 0 1 1.4 8.36"
    />
  )
}

function CloudSun(props) {
  return (
    <g stroke={STROKE} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 9.3a3.4 3.4 0 0 1 6.5-1.3" />
      <circle cx="16.2" cy="7.4" r="2.4" />
      <path d="M16.2 3.4v1.2M16.2 10.2v1.2M20.2 7.4H19M13.4 7.4h-1.2M19 4.6l-.85.85M14.25 9.95l-.85.85" />
      <path d="M6.6 18.1a3.9 3.9 0 0 1-.5-7.77 4.6 4.6 0 0 1 4.9-1.5 4 4 0 0 1 5.6 3.6 4.05 4.05 0 0 1-.8 8.04H6.6z" />
    </g>
  )
}

function Rain(props) {
  return (
    <g stroke={STROKE} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.8 14.2a4.1 4.1 0 0 1-.6-8.16 5 5 0 0 1 9.6-1.9 4.3 4.3 0 0 1 1.4 8.36" />
      <path d="M8 17.5l-1.2 2.6M12 17.5l-1.2 2.6M16 17.5l-1.2 2.6" />
    </g>
  )
}

function Drizzle(props) {
  return (
    <g stroke={STROKE} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.8 13.6a4.1 4.1 0 0 1-.6-8.16 5 5 0 0 1 9.6-1.9 4.3 4.3 0 0 1 1.4 8.36" />
      <path d="M9 17.3v2.2M13 17.3v2.2M17 17.3v2.2" strokeDasharray="0.1 3" />
    </g>
  )
}

function Snow(props) {
  return (
    <g stroke={STROKE} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.8 13.6a4.1 4.1 0 0 1-.6-8.16 5 5 0 0 1 9.6-1.9 4.3 4.3 0 0 1 1.4 8.36" />
      <path d="M8.5 18v3M7 19.5h3M13.5 18v3M12 19.5h3" />
    </g>
  )
}

function Storm(props) {
  return (
    <g stroke={STROKE} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.8 13a4.1 4.1 0 0 1-.6-8.16 5 5 0 0 1 9.6-1.9 4.3 4.3 0 0 1 1.4 8.36" />
      <path d="M12.5 14.5l-2.4 4h2.2l-1.6 3.6 3.9-4.6h-2.1l1.7-3z" fill={STROKE} stroke="none" />
    </g>
  )
}

function Fog(props) {
  return (
    <g stroke={STROKE} strokeWidth="1.4" fill="none" strokeLinecap="round">
      <path d="M5 9.5a5 5 0 0 1 9.6-1.9 4.3 4.3 0 0 1 1.4 8.36" strokeLinejoin="round" fill="none" />
      <path d="M4.5 17h15M4.5 20h11" />
    </g>
  )
}

const ICONS = {
  sun: Sun,
  cloud: Cloud,
  'cloud-sun': CloudSun,
  rain: Rain,
  drizzle: Drizzle,
  snow: Snow,
  storm: Storm,
  fog: Fog,
}

export default function WeatherIcon({ name, size = 24, className = '' }) {
  const Cmp = ICONS[name] ?? Cloud
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <Cmp />
    </svg>
  )
}
