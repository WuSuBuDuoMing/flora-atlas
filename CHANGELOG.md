# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## v1.12.0 (2026-06-22)

### Added
- **Search functionality**: Added real-time search box to filter flowers by city, province, name, description, and viewing spots with debounced input (300ms) and keyboard shortcuts (ESC to clear)
- **Search API**: `GET /api/flowers/search?q=keyword` endpoint for fuzzy keyword matching across 5 text fields
- **Provinces API**: `GET /api/provinces` endpoint returning all unique provinces with flower counts and city lists, sorted by flower count descending
- **Flower data enrichment**: Added 4 new fields to all 54 flower entries -- `scientific` (Latin scientific name), `alias` (common alternate name), `bestMonth` (peak viewing month), and `rarity` (common/uncommon/rare classification)
- **Detail card expansion**: Now displays scientific name (italicized Latin) and alias (when available) in the flower detail card
- Responsive search box styling for mobile viewports (768px and 480px breakpoints)

### Changed
- **JSDoc overhaul**: Comprehensive JSDoc annotations added to `map.js` (with `@module`, `@constant`, `@type`, `@param`, `@returns` on all functions), `markers.js` (new `filterBySearch` and `getVisibleCount` functions documented), `list.js` (new `filterBySearch` function documented), and `detail.js` (new element caches documented)
- `routes/api.js`: File overview updated to reflect new search and provinces endpoints; all 9 endpoints now have complete `@param`/`@returns`/`@example` JSDoc blocks
- CSS info-item animation stagger updated from 4 items to 7 items for smoother card reveal with new fields
- Detail card CSS animation delays rebalanced (0.1s-0.4s range with tighter steps)

### Improved
- **Map interaction**: Search box integrates with both marker layer and list panel for simultaneous filtering; markers dim to 10% opacity for non-matches while search matches remain fully visible
- **List panel search**: List items independently respond to search keywords alongside seasonal filtering

## v1.11.0 (2026-06-20)

### Added
- Province aggregation statistics in API responses
- Enhanced flower metadata with scientific naming and rarity classification
- Detail card information density with Latin nomenclature display

### Changed
- Expanded data model from 12 to 16 fields per flower entry
- Improved seasonal filter behavior for concurrent search operations

## v1.10.0 (2026-06-19)

### Added
- Full-text search capability for flower discovery across multiple data fields
- Province-level flower statistics endpoint (`/api/provinces`)

### Changed
- Enhanced API documentation with comprehensive JSDoc annotations
- Improved frontend search UX with debounced input and keyboard navigation

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
