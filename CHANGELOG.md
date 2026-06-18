# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## v1.9.0 (2026-06-18)

### Added
- Complete English README with full sections: Features, Installation, Usage, API Reference, Project Structure, Contributing, Roadmap, License
- CI workflow enhanced with multi-version Node.js matrix (18, 20, 22), npm ci install, JSON validation, and trailing whitespace checks
- CONTRIBUTING.md with development setup, coding conventions, commit format, and guidelines for adding new flowers
- CODE_OF_CONDUCT.md upgraded to full Contributor Covenant v2.1 with enforcement guidelines
- SECURITY.md upgraded with detailed vulnerability reporting process, response timelines, and contributor security best practices
- `package.json` metadata: `homepage`, `repository`, `bugs`, `engines` fields; bilingual keywords (English + Chinese)

### Changed
- JSDoc annotations improved across all modules: `server.js`, `routes/api.js`, `public/js/app.js`, `public/js/utils.js`, `public/js/map.js`, `public/js/markers.js`, `public/js/detail.js`, `public/js/list.js`, `public/js/globe.js`, `public/js/flower-icons.js`
- Module-level `@fileoverview` and `@module` tags added to all JavaScript files
- `package.json` version updated to 1.9.0; description made bilingual

## v1.8.0 (2026-06-17)

### Added
- Expanded flower icon database with additional species coverage
- Performance improvements for map rendering with large datasets

### Changed
- Optimized frontend module loading order for faster initial render
- Improved touch gesture handling on the bottom list panel

## v1.7.0 (2026-06-16)

### Added
- Enhanced community health files (CODE_OF_CONDUCT, FUNDING.yml, CODEOWNERS)
- Improved Issue and PR templates

### Changed
- Updated SECURITY.md with structured vulnerability reporting process
- Refined project metadata for GitHub display

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
- express 4.22.2 (latest 4.x), cors 2.8.5 -- already at latest minor/patch

## v1.0.0 (2026-06-11)

- Initial open-source release
- 54 city flowers with Leaflet 2D map + CesiumJS 3D globe
- Season filtering, check-in system, petal particle animation
- REST API with GeoJSON province boundaries
