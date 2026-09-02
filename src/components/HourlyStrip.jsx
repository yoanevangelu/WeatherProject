import WeatherIcon from './WeatherIcon.jsx'
import { describeCode } from '../weatherCodes.js'
import './HourlyStrip.css'

export default function HourlyStrip({ hourly, unit, timezone }) {
  const deg = unit === 'f' ? '°' : '°'
  const now = new Date()

  // Find the index of the current or next hour, show the next 12 hours
  const idx = hourly.time.findIndex((t) => new Date(t) >= now)
  const start = idx === -1 ? 0 : idx
  const slice = start + 12

  const items = hourly.time.slice(start, slice).map((t, i) => {
    const realIndex = start + i
    return {
      time: new Date(t),
      temp: Math.round(hourly.temperature_2m[realIndex]),
      code: hourly.weather_code[realIndex],
      pop: hourly.precipitation_probability?.[realIndex],
    }
  })

  return (
    <section className="hourly">
      <h2 className="hourly__title">Next hours</h2>
      <div className="hourly__track">
        {items.map((it, i) => {
          const { icon } = describeCode(it.code)
          return (
            <div className="hourly__item" key={i}>
              <span className="hourly__time">
                {i === 0
                  ? 'Now'
                  : it.time.toLocaleTimeString('en-US', { hour: 'numeric' })}
              </span>
              <WeatherIcon name={icon} size={22} className="hourly__icon" />
              <span className="hourly__temp">
                {it.temp}
                {deg}
              </span>
              {it.pop != null && it.pop > 0 && (
                <span className="hourly__pop">{it.pop}%</span>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
