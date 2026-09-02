import { useEffect, useRef, useState } from 'react'
import './SearchBar.css'

export default function SearchBar({ onSelectPlace }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim().length < 2) {
        setResults([])
        return
      }
      let cancelled = false
      setLoading(true)
      fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query.trim()
        )}&count=6&language=en&format=json`
      )
        .then((r) => r.json())
        .then((data) => {
          if (cancelled) return
          setResults(data.results ?? [])
          setOpen(true)
        })
        .catch(() => {
          if (!cancelled) setResults([])
        })
        .finally(() => {
          if (!cancelled) setLoading(false)
        })
      return () => {
        cancelled = true
      }
    }, 350)
    return () => clearTimeout(handler)
  }, [query])

  useEffect(() => {
    function onClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function pick(place) {
    setQuery('')
    setResults([])
    setOpen(false)
    onSelectPlace(place)
  }

  function useMyLocation() {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition((pos) => {
      onSelectPlace({
        name: 'Current location',
        admin1: '',
        country: '',
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      })
    })
  }

  return (
    <div className="searchbar" ref={boxRef}>
      <label className="searchbar__label" htmlFor="place-search">
        Station
      </label>
      <div className="searchbar__row">
        <input
          id="place-search"
          className="searchbar__input"
          type="text"
          placeholder="Search a city…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
          autoComplete="off"
        />
        <button
          type="button"
          className="searchbar__locate"
          onClick={useMyLocation}
          title="Use current location"
        >
          ⌖
        </button>
      </div>

      {open && (loading || results.length > 0) && (
        <ul className="searchbar__results">
          {loading && <li className="searchbar__hint">Searching…</li>}
          {!loading &&
            results.map((r) => (
              <li key={r.id}>
                <button type="button" onClick={() => pick(r)}>
                  <span className="searchbar__place">{r.name}</span>
                  <span className="searchbar__meta">
                    {[r.admin1, r.country].filter(Boolean).join(', ')}
                  </span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
