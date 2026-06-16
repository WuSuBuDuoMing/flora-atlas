# Changelog

## v1.6.0 (2026-06-16)

### Changed
- Added CODE_OF_CONDUCT.md, FUNDING.yml, CODEOWNERS, enhanced Issue/PR templates

## v1.4.0 (2026-06-14)

### Changed
- Security policy, documentation enhancements, open-source best practices

## v1.2.0 (2026-06-14)

### Changed
- Local optimization and performance improvements
- Documentation enhancement across project
- Open-source infrastructure updates

## v1.1.0 (2026-06-11)

### Documentation
- Comprehensive README rewrite: accurate flower count (54 cities), updated tech stack, full flower table
- JSDoc annotations added to all main functions across 6 modules
- Project structure updated to reflect current file layout

### Tests
- Added Node.js built-in test runner (21 tests)
- `test/flowers.test.js`: flower data structure, field validation, uniqueness, coordinate ranges, color format, season coverage, icon database consistency
- `test/api.test.js`: all 6 REST API endpoints (flowers, flowers/:id, season filter, cities, stats, geo)

### Code Quality
- Removed dead code: `flower-images.js` (unused), 3 unused vendor files (d3-bundle, globe.gl, three.js)
- Created `utils.js` shared module: consolidated `MONTH_NAMES`, `SEASON_MAP`, `getCheckedCities()` from 3 duplicate locations
- Removed empty stub functions: `positionMarkers()`, `updateTransform()`, `updateZoom()`
- Added `npm test` script to package.json

### Dependencies
- express 4.22.2 (latest 4.x), cors 2.8.5 — already at latest minor/patch

## v1.0.0 (2026-06-11)

- Initial open-source release
- 54 city flowers with Leaflet 2D map + CesiumJS 3D globe
- Season filtering, check-in system, petal particle animation
- REST API with GeoJSON province boundaries
