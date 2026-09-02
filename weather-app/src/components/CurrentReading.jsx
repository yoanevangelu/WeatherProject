import WeatherIcon from './WeatherIcon.jsx'
import { describeCode } from '../weatherCodes.js'
import './CurrentReading.css'

export default function CurrentReading({ place, current, unit }) {
  const { label, icon } = describeCode(current.weather_code)
  const temp = Math.round(current.temperature_2m)
  const feels = Math.round(current.apparent_temperature)
  const deg = unit === 'f' ? '°F' : '°C'

  return (
    <section className="reading">
      <div className="reading__place">
        <span className="reading__name">{place.name}</span>
        {(place.admin1 || place.country) && (
          <span className="reading__region">
            {[place.admin1, place.country].filter(Boolean).join(', ')}
          </span>
        )}
      </div>

      <div className="reading__main">
        <span className="reading__temp">
          {temp}
          <span className="reading__deg">{deg}</span>
        </span>
        <WeatherIcon name={icon} size={56} className="reading__icon" />
      </div>

      <div className="reading__foot">
        <span>{label}</span>
        <span className="reading__dot">·</span>
        <span>Feels like {feels}{deg}</span>
      </div>
    </section>
  )
}
