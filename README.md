# Flora Atlas (HuaJianJi / 花间集)

> An interactive map of city flowers across China -- one flower per city, one step per view.

[![CI](https://github.com/WuSuBuDuoMing/flora-atlas/actions/workflows/ci.yml/badge.svg)](https://github.com/WuSuBuDuoMing/flora-atlas/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-green.svg)](https://nodejs.org)

**Flora Atlas** (花间集) is an interactive flower-check-in map showcasing the official city flowers of 54 Chinese cities. Explore provincial boundaries on a 2D Leaflet map or rotate a 3D CesiumJS globe, discover each flower's meaning and bloom season, and track your check-ins across the country.

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [License](#license)

---

## Features

- **Interactive 2D Map** -- Leaflet-powered map with GeoJSON provincial boundaries, hover highlights, and click-to-explore.
- **3D Globe View** -- CesiumJS satellite imagery globe with flower markers and smooth transitions.
- **54 City Flowers** -- Complete dataset covering all major provinces with bloom months, flower language, and recommended viewing spots.
- **Season Filtering** -- Filter flowers by spring / summer / autumn / winter across both map and list views.
- **Check-in System** -- Mark cities you have visited; progress is persisted in localStorage.
- **Petal Particle Animation** -- 25 floating emoji petals with randomized drift, size, and rotation.
- **Responsive Bottom Panel** -- Expandable flower list with touch-swipe gesture support.
- **Detail Cards** -- Rich information cards showing city, province, flower name, emoji, description, bloom months, and recommended location.
- **Chinese Ink-Wash Aesthetic** -- Traditional calligraphy fonts, water-ink gradients, and a cream-and-sakura color palette.
- **RESTful API** -- Express-powered JSON API with endpoints for flowers, seasons, cities, statistics, and GeoJSON data.
- **Zero Framework Dependency** -- Pure vanilla HTML / CSS / JavaScript on the frontend.

---

## Screenshots

> Add screenshots here after deployment. Suggested views: 2D map, 3D globe, detail card, bottom list panel.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| 2D Map | Leaflet with GeoJSON province boundaries |
| 3D Globe | CesiumJS with ArcGIS satellite imagery |
| Frontend | Vanilla HTML + CSS + JavaScript (no framework) |
| Data | JSON + GeoJSON + REST API |
| Tests | Node.js built-in test runner |

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- npm (comes with Node.js)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/WuSuBuDuoMing/flora-atlas.git
cd flora-atlas

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

The application will be available at `http://localhost:3003`.

---

## Usage

### Development Mode

```bash
npm run dev
```

### Run Tests

```bash
npm test
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3003`  | Server listening port |

Example:

```bash
PORT=8080 npm start
```

---

## API Reference

All endpoints return JSON. Base URL: `http://localhost:3003/api`

### GET /api/flowers

Returns all 54 city flower records.

**Response:**

```json
{
  "success": true,
  "count": 54,
  "data": [
    {
      "id": "hangzhou",
      "city": "杭州",
      "province": "浙江",
      "name": "桂花",
      "emoji": "🏵️",
      "months": [9, 10],
      "season": "autumn",
      "color": "#d4a030",
      "bg": "#faf6eb",
      "desc": "桂花是杭州的市花...",
      "place": "满陇桂雨",
      "lat": 30.25,
      "lng": 120.17
    }
  ]
}
```

### GET /api/flowers/:id

Returns a single flower by its ID.

**Example:** `GET /api/flowers/hangzhou`

### GET /api/flowers/season/:season

Filters flowers by season.

**Parameters:**

| Param | Values |
|-------|--------|
| `season` | `spring`, `summer`, `autumn`, `winter` |

**Example:** `GET /api/flowers/season/spring`

### GET /api/cities

Returns 18 original city coordinates.

### GET /api/stats

Returns aggregated statistics (total cities, checked cities, flower types, provinces covered).

### GET /api/geo

Returns the full GeoJSON dataset for China's provincial boundaries.

---

## Project Structure

```
flora-atlas/
├── package.json
├── server.js                  # Express server entry point
├── routes/
│   └── api.js                 # RESTful API routes
├── data/
│   ├── flowers.json           # 54 city flower records
│   ├── cities.json            # 18 city coordinates
│   └── china.geo.json         # Provincial GeoJSON boundaries
├── public/
│   ├── index.html             # Frontend entry page
│   ├── css/
│   │   ├── style.css          # Main stylesheet
│   │   └── leaflet.css        # Leaflet overrides
│   └── js/
│       ├── utils.js           # Shared utility functions
│       ├── app.js             # Main entry / coordinator
│       ├── map.js             # Leaflet map module
│       ├── markers.js         # Flower marker module
│       ├── detail.js          # Detail card module
│       ├── list.js            # Bottom list panel module
│       ├── globe.js           # CesiumJS 3D globe module
│       ├── flower-icons.js    # Flower icon database
│       └── vendor/
│           └── leaflet.js     # Bundled Leaflet library
├── test/
│   ├── flowers.test.js        # Flower data structure tests
│   └── api.test.js            # API endpoint tests
├── .github/
│   ├── workflows/
│   │   └── ci.yml             # CI pipeline
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── FUNDING.yml
│   └── CODEOWNERS
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── CHANGELOG.md
└── LICENSE
```

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on:

- How to set up the development environment
- Coding conventions and commit message format
- How to submit a pull request

By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## Roadmap

- [ ] Add user authentication for server-side check-in persistence
- [ ] Implement flower search and text-based filtering
- [ ] Add English / bilingual flower data
- [ ] Progressive Web App (PWA) support
- [ ] Add flower photography gallery for each city
- [ ] Performance optimization: lazy-load CesiumJS bundle
- [ ] Expand to 100+ cities

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- [Leaflet](https://leafletjs.com/) -- Open-source JavaScript library for interactive maps
- [CesiumJS](https://cesium.com/cesiumjs/) -- Open-source JavaScript library for 3D globes
- [OpenStreetMap](https://www.openstreetmap.org/) -- Map data
- [ArcGIS](https://www.esri.com/) -- Satellite imagery

---

**Made with care for the beauty of Chinese city flowers.**
