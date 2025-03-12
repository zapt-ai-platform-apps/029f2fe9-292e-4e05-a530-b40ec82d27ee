# SDR Mobile App

A mobile application for streaming data from a Software Defined Radio (SDR) over WiFi. The app displays spectrum, direction finding, and IQ data visualizations.

## Features

- Connect to SDR devices over WiFi
- Configure center frequency and span
- View RF spectrum (FFT) visualization
- View direction finding bearing with waterfall display
- View raw IQ time domain data
- Swipeable interface for easy navigation between views
- Connection status indicator

## Pages

1. **Settings** - Configure device connection and frequency settings
2. **Spectrum** - View RF spectrum display (FFT)
3. **Bearing** - View direction finding with arrow on polar plot
4. **IQ Data** - View raw IQ time domain data

## Technical Details

This app is built with:
- React
- Chart.js for data visualization
- D3.js for polar plot visualization
- React Spring for smooth animations
- Use Gesture for swipe detection

## Development

To run the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

## Note

This is currently using simulated data for prototyping purposes. In a production environment, it would connect to actual SDR hardware via WebSockets or a similar technology.