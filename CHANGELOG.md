# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## v1.15.0 (2026-06-23)

### Added
- **JSDoc annotations**: Comprehensive JSDoc improvements across all frontend modules (`app.js`, `map.js`, `markers.js`, `detail.js`, `list.js`, `globe.js`, `utils.js`) with `@param`, `@returns`, `@type`, `@constant`, `@module` tags; backend `routes/api.js` fully documented with `@example` blocks on all endpoints
- **Search field expansion**: Search API and frontend filters now match `scientific`, `alias`, `rarity`, and `habitat` fields in addition to the original 5 text fields
- **Stats caching**: `/api/stats` and `/api/provinces` endpoints now cache computed results for improved response times
- **Rarity filtering API**: `GET /api/flowers/rarity/:rarity` endpoint to filter flowers by rarity level (common/uncommon/rare)
- **New test coverage**: 10 additional tests for rarity filtering, province stats, search expansion, new data fields validation

### Changed
- Expanded search scope from 5 fields to 9 fields across all three layers (API, markers.js, list.js)
- Stats endpoint now returns `rarityCounts` and `seasonCounts` sub-objects
- API route-level documentation improved with accurate parameter descriptions and example responses
- Updated test assertions to validate all 19 data fields per flower entry

## v1.14.0 (2026-06-23)

### Added
- **Flower stats panel**: Right-side floating panel displaying coverage statistics -- provinces covered, flower types, and rarity distribution (common/uncommon/rare)
- **Stats data caching**: Client-side `getStats()` function with lazy computation and memoization
- **Province zoom on click**: Clicking a province on the map now triggers `flyToProvince()` for smooth animated zoom to that region's flowers
- **Rarity glow markers**: Map markers for rare flowers feature pulsing halo animation (`rarity-pulse`), uncommon flowers show a subtle glow, creating visual hierarchy on the map
- **Rarity badge in list**: Flower list items now display inline rarity badges -- "稀" (purple) for rare, "少" (gold) for uncommon
- **New CSS animations**: `rarity-pulse` (pulsing halo), `rarity-float` (gentle float), province tooltip styling, stats panel styles

### Changed
- Marker `createIcon()` enhanced with rarity-aware visual effects (glow, pulse ring, float animation)
- Detail card now displays 11 info items (was 9) with habitat and best time of day
- `flyToProvince()` exported from MapModule for cross-module usage
- `addProvinces()` click handler now calls `flyToProvince()` before showing details

## v1.13.0 (2026-06-23)

### Added
- **Flower data enrichment**: All 54 flower entries now include 4 new fields: `habitat` (unique habitat type), `bestTime` (optimal viewing time of day), `scientific` (already present), `bestMonth` (already present), `rarity` (already present) -- now totaling 19 fields per entry
- **Province fly-to**: Clicking any province on the GeoJSON map smoothly animates the view to zoom into that province's flower cluster using Leaflet `flyToBounds()`
- **Rarity visual effects**: Rare flowers ("rare") display a pulsing glow ring animation on map markers; uncommon flowers show enhanced shadow glow
- **List panel rarity badges**: Flower list items display inline rarity indicators -- purple "稀" for rare, gold "少" for uncommon
- **New CSS animations**: `@keyframes rarity-pulse` and `@keyframes rarity-float` for marker visual effects
- **New CSS classes**: Province tooltip styling, flower stats panel layout, rarity badge styles (`.list-item__rarity--rare`, `.list-item__rarity--uncommon`)

### Changed
- Marker `createIcon()` function enhanced with rarity-aware rendering logic
- `MapModule` now exports `flyToProvince()` for province-level navigation
- Province click handler in `addProvinces()` now triggers zoom-to-province before showing flower details
- Detail card HTML expanded with habitat and best time fields
- Test assertions updated to validate all 19 data fields per flower entry (was 13)

### Improved
- Province map interaction: clicking a province zooms to show all flowers in that region
- Visual hierarchy: rare and uncommon flowers are visually distinct from common flowers on the map
- Data richness: flower entries now include habitat context and optimal viewing time

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
