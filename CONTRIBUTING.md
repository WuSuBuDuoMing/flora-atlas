# Contributing to Flora Atlas

Thank you for your interest in contributing to Flora Atlas (花间集)! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Architecture](#project-architecture)
- [Coding Conventions](#coding-conventions)
- [Commit Message Format](#commit-message-format)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Adding a New City Flower](#adding-a-new-city-flower)
- [Reporting Bugs](#reporting-bugs)

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your feature or fix
4. Make your changes
5. Submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/<your-username>/flora-atlas.git
cd flora-atlas

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test
```

The server starts at `http://localhost:3003`. Changes to backend files require a server restart; frontend files under `public/` are served statically and can be refreshed in the browser.

## Project Architecture

- **`server.js`** -- Express entry point (static files + API routing)
- **`routes/api.js`** -- All REST API endpoints
- **`data/`** -- JSON data files (flowers, cities, GeoJSON)
- **`public/js/`** -- Frontend modules using the IIFE pattern (`App`, `MapModule`, `MarkersModule`, `DetailModule`, `ListModule`, `GlobeModule`, `Utils`)
- **`test/`** -- Node.js built-in test runner tests

Each frontend module is a self-contained IIFE that exposes a public API via `return { ... }`.

## Coding Conventions

- Use **vanilla JavaScript** (no TypeScript, no frameworks)
- Follow **JSDoc** annotations for all public functions
- Use `camelCase` for variables and functions
- Use `UPPER_SNAKE_CASE` for constants
- Keep functions small and focused (single responsibility)
- All strings in data files use **UTF-8** encoding
- Use semicolons consistently
- Prefer `const` over `let`; avoid `var`

## Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short summary>

[optional body]
[optional footer]
```

**Types:**

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Code style (formatting, semicolons, etc.) |
| `refactor` | Code refactoring |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |

**Examples:**

```
feat: add search filtering for flower names
fix: correct lat/lng for Urumqi marker
docs: update API reference with response examples
test: add validation for flower color field
```

## Submitting a Pull Request

1. Ensure all tests pass: `npm test`
2. Ensure your code has JSDoc annotations on public functions
3. Update documentation if you changed public APIs
4. Keep pull requests focused -- one feature or fix per PR
5. Reference any related issues in your PR description
6. Fill out the PR template provided

## Adding a New City Flower

1. Add the flower record to `data/flowers.json` with all required fields:
   - `id`, `city`, `province`, `name`, `emoji`, `months`, `season`, `color`, `bg`, `desc`, `place`, `lat`, `lng`
2. Add the flower icon to `public/js/flower-icons.js` (emoji + hue color)
3. Run `npm test` to verify data consistency
4. Update the README flower table

## Reporting Bugs

- Use the [Bug Report](https://github.com/WuSuBuDuoMing/flora-atlas/issues/new?template=bug_report.md) template
- Include steps to reproduce, expected behavior, and actual behavior
- Include your browser and Node.js versions

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Questions?

Open a [Discussion](https://github.com/WuSuBuDuoMing/flora-atlas/discussions) on GitHub if you have questions or ideas.
