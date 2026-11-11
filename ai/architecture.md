# Woodbridge Cross Country Classic - Architecture

## Overview

**Woodbridge Cross Country Classic** is a Next.js web application that serves as the official website and information hub for the annual Woodbridge High School Cross Country race event. The site provides race information, registration details, results, and historical data for coaches, participants, and spectators.

## Technology Stack

- **Framework**: Next.js 16.2.2 (App Router)
- **Runtime**: React 19.2.4 with TypeScript 5
- **Styling**: Tailwind CSS 4 + PostCSS
- **Component Library**: HeroUI v3 React
- **Analytics**: Vercel Analytics & Speed Insights
- **Build Tool**: Next.js built-in (Turbopack)
- **Linting**: ESLint 9

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── coaches/           # Coach-specific pages (registration, fees, T-shirts, etc.)
│   ├── generalInfo/       # Event information (about, hotels, parking, partners)
│   ├── racingInfo/        # Racing details (course, schedule, entries, teams)
│   ├── results/           # Race results
│   │   ├── allTimeLists/  # All-time individual and team lists
│   │   └── raceResults/   # Live results links and official results by year
│   │       └── [year]/    # [raceNum]/, overallIndividuals/[gender]/, overallTeams/[gender]/ (1998-2006)
│   ├── contact/           # Contact information
│   ├── timing/            # Timing tools (Ultra/LIF file conversion, results generation)
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── navbar/tables/     # Navigation, data tables, UI elements
│   └── styled* components # Custom styled form inputs & selectors
├── config/               # Static configuration & metadata
│   ├── data.ts          # Event dates, registration periods, result years, external URLs
│   ├── site.ts          # Site branding, page routes, configuration
│   ├── races.ts         # Race-specific information
│   ├── *Teams.ts        # All-time, featured, and participating team data
│   ├── *Individuals.ts  # All-time and featured athlete data
│   └── dates.ts         # Event date constants
├── hooks/               # Custom React hooks
│   ├── useWindowDimensions.tsx  # Responsive design tracking
│   ├── useWindowScrollPositions.tsx # Scroll state management
│   ├── useUserAgent.tsx # Browser/device detection
│   ├── useParseUltra.tsx # Timing tools: Ultra file parsing
│   └── useIndividualAgeGroupAndTeamResults.tsx # Timing tools: results generation
├── results/            # 1998-2006 results data (resultsYYYY.ts) and getYearResults()
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
│   ├── getRawResultsFrom*.ts # Timing file parsing (Ultra, LIF)
│   ├── getIndividuals.ts # Registered athlete file parsing (timing tools)
│   ├── get*Results.ts # Individual, age group, team, and overall results
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
- **Results**: Live results links, official results by year, and all-time lists
- **Timing**: Tools for converting timing files and generating results

### Component Architecture

- **Layout Components**: `navbar.tsx`, `footer.tsx`, `breadcrumbsAndSponsor.tsx` provide consistent page structure
- **Data Display**: Reusable table components (`dynamicTable.tsx`, `*Table.tsx`) render event data
- **Results Tables**: `teamResultsTableWrapper.tsx` is shared by the timing tools and the 1998-2006 race and overall team pages (`isOverall` hides Score, Actual Order, and Scoring Order); `raceIndividualResultsTableWrapper.tsx` renders individuals on the 1998-2006 race and overall pages; `officialResultsSections.tsx` renders each year's result cards
- **Navigation**: `baseLink.tsx` and `buttonLink.tsx` provide consistent internal/external linking
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

**Official Results**:

- **2007-2026**: PDFs stored in `public/resultFiles/` organized by year and served as static assets. There was no meet in 2020, so `officialResults.tsx` shows a "No meet in 2020." alert for that year instead of result cards.
- **1998-2006**: TypeScript data in `src/results/resultsYYYY.ts` (one `IndividualResultType` row per runner), loaded with the server-only `getYearResults(year)`. Race pages (`[year]/[raceNum]`) and overall pages (`[year]/overallIndividuals/[gender]`, `[year]/overallTeams/[gender]`) are prebuilt with `generateStaticParams` and `dynamicParams = false`, so team scores and overall standings are computed at build time.
- Each `page.tsx` under `raceResults/[year]/` declares its own `generateStaticParams` with all of its params. Moving the year list to `[year]/layout.tsx` makes Next build no `[raceNum]` pages.
- Places must be unique within a race because team scoring and table row ids rely on it. `getYearResults` throws if a race repeats a place, which fails the build.

**Timing Tools**: The Timing page parses Ultra and LIF timing files in the browser and generates individual, age group, and team results. Places come from finish order, so they never tie.

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
4. **Historical Data**: Official results as web pages (1998-2006) and downloadable PDFs (2007-2026), plus all-time lists covering 40+ years
5. **External Integrations**: Links to Athletic.net timing, RunnerSpace, and registration forms
6. **Social Features**: Links to Twitter and Instagram for race hashtags
7. **Timing Tools**: Race-day conversion of timing files and generation of individual, age group, and team results
