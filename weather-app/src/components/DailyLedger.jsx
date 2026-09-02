import WeatherIcon from './WeatherIcon.jsx'
import { describeCode } from '../weatherCodes.js'
import './DailyLedger.css'

export default function DailyLedger({ daily, unit }) {
  const deg = unit === 'f' ? '°' : '°'

  const rows = daily.time.map((t, i) => ({
    date: new Date(t + 'T00:00:00'),
    max: Math.round(daily.temperature_2m_max[i]),
    min: Math.round(daily.temperature_2m_min[i]),
    code: daily.weather_code[i],
    pop: daily.precipitation_probability_max?.[i],
  }))

  const globalMax = Math.max(...rows.map((r) => r.max))
  const globalMin = Math.min(...rows.map((r) => r.min))
  const span = Math.max(globalMax - globalMin, 1)

  return (
    <section className="ledger">
      <h2 className="ledger__title">Seven-day outlook</h2>
      <ul className="ledger__list">
        {rows.map((r, i) => {
          const { label, icon } = describeCode(r.code)
          const leftPct = ((r.min - globalMin) / span) * 100
          const widthPct = ((r.max - r.min) / span) * 100
          return (
            <li className="ledger__row" key={i}>
              <span className="ledger__day">
                {i === 0
                  ? 'Today'
                  : r.date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <WeatherIcon name={icon} size={20} className="ledger__icon" />
              <span className="ledger__label">{label}</span>
              <span className="ledger__min">
                {r.min}
                {deg}
              </span>
              <span className="ledger__bar">
                <span
                  className="ledger__bar-fill"
                  style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                />
              </span>
              <span className="ledger__max">
                {r.max}
                {deg}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
