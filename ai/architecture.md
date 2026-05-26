# Woodbridge Cross Country Classic - Architecture

## Overview

**Woodbridge Cross Country Classic** is a Next.js web application that serves as the official website and information hub for the annual Woodbridge High School Cross Country race event. The site provides race information, registration details, results, and historical data for coaches, participants, and spectators.

## Technology Stack

- **Framework**: Next.js 16.2.2 (App Router)
- **Runtime**: React 19.2.4 with TypeScript 5
- **Styling**: Tailwind CSS 4 + PostCSS
- **Component Library**: HeroUI v3 React
- **Analytics**: Vercel Analytics & Speed Insights
- **Build Tool**: Next.js built-in (Webpack)
- **Linting**: ESLint 9

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── coaches/           # Coach-specific pages (registration, fees, T-shirts, etc.)
│   ├── generalInfo/       # Event information (about, hotels, parking, partners)
│   ├── racingInfo/        # Racing details (course, schedule, entries, teams)
│   ├── results/           # Race results (historical lists, current results)
│   ├── contact/           # Contact information
│   ├── timing/            # Live timing information
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── navbar/tables/     # Navigation, data tables, UI elements
│   └── styled* components # Custom styled form inputs & selectors
├── config/               # Static configuration & metadata
│   ├── data.ts          # Event dates, registration periods, external URLs
│   ├── site.ts          # Site branding, page routes, configuration
│   ├── races.ts         # Race-specific information
│   ├── *Teams.ts        # All-time and featured team data
│   ├── *Individuals.ts  # All-time and featured athlete data
│   └── dates.ts         # Event date constants
├── hooks/               # Custom React hooks
│   ├── useWindowDimensions.tsx  # Responsive design tracking
│   ├── useWindowScrollPositions.tsx # Scroll state management
│   └── useUserAgent.tsx # Browser/device detection
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── table.ts       # Table formatting & data helpers
│   ├── number.ts      # Number formatting utilities
│   └── userAgent.ts   # User agent parsing
└── styles/            # Global styles & theme
    ├── globals.css    # Tailwind directives & global styles
    ├── fonts.ts       # Font family exports
    └── styles.ts      # Style constants
```

## Architecture Patterns

### Page Structure

The application uses Next.js App Router with nested route segments. Each page directory contains a `page.tsx` file representing that route. Pages are organized hierarchically:

- **Coaches Section**: Registration, fees, pre-order items, race day info
- **Racing Info**: Course details, schedules, entries, team information
- **General Info**: About, hotels, parking, sponsors
- **Results**: Historical lists (all-time) and current race results

### Component Architecture

- **Layout Components**: `navbar.tsx`, `footer.tsx`, `breadcrumbsAndSponsor.tsx` provide consistent page structure
- **Data Display**: Reusable table components (`dynamicTable.tsx`, `*Table.tsx`) render event data
- **Navigation**: `BaseLink.tsx` and `ButtonLink.tsx` provide consistent internal/external linking
- **Responsive UI**: Custom hooks track viewport dimensions and scroll state for adaptive rendering

### Configuration-Driven Design

Event data is centralized in the `config/` directory:

- **Static Metadata**: Site branding, page routes, and event names
- **Temporal Data**: Event dates, registration periods, publication timelines
- **External Links**: URLs for registration, social media, timing services (Athletic.net, RunnerSpace)
- **Event Data**: Team/athlete information, race details, historical records

### Responsive & Accessibility

- Tailwind CSS v4 for responsive design (mobile-first approach)
- HeroUI v3 components provide accessible, semantic UI
- Custom hooks manage viewport dimensions for responsive behavior
- Firefox-specific alert component for browser-specific handling

## Data Management

**Static-First Approach**: All data is configuration-driven and static, making the site highly performant and cacheable. External services are integrated via URLs (e.g., Athletic.net for timing, Google Forms for registration).

**Historical Data**: PDF results are stored in `public/resultFiles/` organized by year (2007-2025) and served as static assets.

**Media Assets**: Images and videos are stored in `public/` and referenced throughout the site.

## Deployment & Performance

- **Deployment**: Optimized for Vercel (Next.js native platform)
- **Analytics Integration**: Vercel Analytics and Speed Insights track performance
- **Static Generation**: Pages are pre-built during deployment for fast delivery
- **Content Delivery**: Static assets from `public/` served via CDN

## Key Features

1. **Dynamic Content Display**: Tables and listings for teams, athletes, and race results
2. **Responsive Design**: Mobile-optimized using Tailwind CSS with viewport tracking
3. **Event Timeline Management**: Date-based visibility of registration, T-shirt orders, etc.
4. **Historical Data**: 40+ years of race results available as downloadable PDFs
5. **External Integrations**: Links to Athletic.net timing, RunnerSpace, and registration forms
6. **Social Features**: Links to Twitter and Instagram for race hashtags
