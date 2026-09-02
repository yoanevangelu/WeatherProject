# A weather app

A small React + Vite weather app styled like an instrument panel / almanac
page. Search any city, see the current reading, next 12 hours, and a
7-day outlook. Weather data comes from [Open-Meteo](https://open-meteo.com/),
which is free and requires no API key.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # serve the production build locally
```

The production files land in `dist/` — deploy that folder anywhere that
serves static files (Netlify, Vercel, GitHub Pages, etc).

## Project structure

```
src/
  App.jsx                 Top-level layout, data fetching, unit toggle
  weatherCodes.js          Maps Open-Meteo weather codes to labels/icons
  components/
    SearchBar.jsx          City search with debounced geocoding lookup
    CurrentReading.jsx      Big "hero" temperature reading
    DetailsGrid.jsx         Humidity / wind / precipitation / cloud cover
    HourlyStrip.jsx         Scrollable next-12-hours strip
    DailyLedger.jsx         7-day forecast list with a min–max range bar
    WeatherIcon.jsx         Hand-drawn line-art weather icons (SVG)
```

## Notes

- No API key needed — Open-Meteo's forecast and geocoding endpoints are
  public.
- Click the ⌖ button next to the search field to use your current
  location (needs browser geolocation permission).
- Toggle °C/°F in the header any time; the app refetches in the new unit.
