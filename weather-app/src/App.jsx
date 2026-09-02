import { useEffect, useState, useCallback } from 'react'
import SearchBar from './components/SearchBar.jsx'
import CurrentReading from './components/CurrentReading.jsx'
import HourlyStrip from './components/HourlyStrip.jsx'
import DailyLedger from './components/DailyLedger.jsx'
import DetailsGrid from './components/DetailsGrid.jsx'
import './App.css'

const DEFAULT_PLACE = {
  name: 'Sofia',
  admin1: 'Sofia-Capital',
  country: 'Bulgaria',
  latitude: 42.6977,
  longitude: 23.3219,
}

function buildForecastUrl(place, unit) {
  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,cloud_cover',
    hourly: 'temperature_2m,weather_code,precipitation_probability',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    temperature_unit: unit === 'f' ? 'fahrenheit' : 'celsius',
    wind_speed_unit: unit === 'f' ? 'mph' : 'kmh',
    timezone: 'auto',
    forecast_days: '7',
  })
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`
}

export default function App() {
  const [place, setPlace] = useState(DEFAULT_PLACE)
  const [unit, setUnit] = useState('c')
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | error

  const fetchWeather = useCallback((p, u) => {
    setStatus('loading')
    fetch(buildForecastUrl(p, u))
      .then((r) => {
        if (!r.ok) throw new Error('Request failed')
        return r.json()
      })
      .then((json) => {
        setData(json)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  useEffect(() => {
    fetchWeather(place, unit)
  }, [place, unit, fetchWeather])

  return (
    <div className="app">
      <header className="app__header">
        <span className="app__brand">Weather-App</span>
        <button
          type="button"
          className="app__unit"
          onClick={() => setUnit((u) => (u === 'c' ? 'f' : 'c'))}
        >
          °C / °F
        </button>
      </header>

      <main className="app__main">
        <SearchBar onSelectPlace={setPlace} />

        {status === 'loading' && (
          <p className="app__status">Reading the instruments…</p>
        )}

        {status === 'error' && (
          <p className="app__status app__status--error">
            Couldn't reach the forecast. Check your connection and try again.
          </p>
        )}

        {status === 'ready' && data && (
          <>
            <CurrentReading place={place} current={data.current} unit={unit} />
            <DetailsGrid current={data.current} unit={unit} />
            <HourlyStrip hourly={data.hourly} unit={unit} />
            <DailyLedger daily={data.daily} unit={unit} />
          </>
        )}
      </main>

      <footer className="app__footer">
        <span>Data from Open-Meteo</span>
      </footer>
    </div>
  )
}
