import './DetailsGrid.css'

export default function DetailsGrid({ current, unit }) {
  const windUnit = unit === 'f' ? 'mph' : 'km/h'

  const items = [
    { label: 'Humidity', value: `${Math.round(current.relative_humidity_2m)}%` },
    { label: 'Wind', value: `${Math.round(current.wind_speed_10m)} ${windUnit}` },
    { label: 'Precipitation', value: `${current.precipitation ?? 0} mm` },
    { label: 'Cloud cover', value: `${Math.round(current.cloud_cover ?? 0)}%` },
  ]

  return (
    <section className="details">
      {items.map((it) => (
        <div className="details__cell" key={it.label}>
          <span className="details__value">{it.value}</span>
          <span className="details__label">{it.label}</span>
        </div>
      ))}
    </section>
  )
}
