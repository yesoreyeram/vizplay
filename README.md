# VizPlay - Enterprise Data Visualization Playground

[![CI](https://github.com/yesoreyeram/vizplay/actions/workflows/ci.yml/badge.svg)](https://github.com/yesoreyeram/vizplay/actions/workflows/ci.yml)
[![CodeQL](https://github.com/yesoreyeram/vizplay/actions/workflows/codeql.yml/badge.svg)](https://github.com/yesoreyeram/vizplay/actions/workflows/codeql.yml)
[![Deploy](https://github.com/yesoreyeram/vizplay/actions/workflows/deploy.yml/badge.svg)](https://github.com/yesoreyeram/vizplay/actions/workflows/deploy.yml)

A modern, enterprise-grade data visualization playground built with React, TypeScript, and Vega-Lite.

## Features

- **Split Panel Interface**: Adjustable horizontal and vertical panels for optimal workspace organization
- **Data Input & Parsing**: Support for multiple formats (JSON, CSV, TSV, XML, YAML)
- **Data Transformation**: JSONata expressions for powerful data manipulation
- **Field Mapping**: Define field types and mappings (string, number, boolean, datetime, etc.)
- **Multiple Visualizations**: Bar charts, line charts, scatter plots, pie charts, area charts, and heatmaps
- **500+ Sample Datasets**: Comprehensive dataset library across 14 categories
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **React 19** with TypeScript
- **Vite 7** for blazing-fast builds
- **Tailwind CSS 4** for styling
- **shadcn/ui** components (Radix UI primitives)
- **Vega-Lite** for declarative visualizations
- **JSONata** for data transformation
- **PapaParse** for CSV/TSV parsing
- **js-yaml** for YAML parsing
- **xml-js** for XML parsing

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed

# Debug E2E tests
npm run test:e2e:debug
```

## Testing

This project includes comprehensive E2E tests using Playwright.

### Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run tests with UI (interactive mode)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests step-by-step
npm run test:e2e:debug
```

### Test Coverage

The E2E test suite covers:
- Application loading and initialization
- Sample dataset loading and filtering
- Visualization type switching (bar, line, scatter, pie charts)
- Custom data input (JSON, CSV formats)
- Chart customization (titles, fields)
- UI component interactions

Tests run automatically in GitHub Actions on every push and pull request.

## Usage

1. **Input Data**: Enter your data in the left panel (top section)
2. **Configure Parsing**: Select format, add JSONata transformations, and define field mappings (left panel, bottom section)
3. **Select Visualization**: Choose chart type and configure axes (right panel, top section)
4. **View Results**: See your visualization in real-time (right panel, bottom section)
5. **Load Samples**: Click "Load Sample Dataset" to explore 504 pre-built datasets

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── TopNavbar.tsx
│   ├── BottomNavbar.tsx
│   ├── DataInputSection.tsx
│   ├── DataParsingControls.tsx
│   ├── VisualizationControls.tsx
│   ├── VisualizationRender.tsx
│   └── DatasetDialog.tsx
├── data/               # Sample datasets
│   └── sampleDatasets.ts
├── lib/                # Utilities and helpers
│   ├── dataParser.ts
│   └── visualizations/
│       └── vegaSpecs.ts
└── App.tsx             # Main application
```

## License

See LICENSE file for details.
