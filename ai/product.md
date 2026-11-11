# Woodbridge Cross Country Classic - Product Overview

## Purpose

The Woodbridge Cross Country Classic website is the official online hub for the annual cross-country race event hosted by Woodbridge High School. It serves four primary audiences: coaches coordinating team participation, athletes seeking race information, spectators looking for results and schedules, and event organizers managing race logistics.

## Core Features

### 1. Event Information Hub

**About & General Info**

- Event history and background (annual race since 1981)
- Meet details and format information
- Partner and sponsor listings
- Photo and video galleries of past events
- Contact information for event organizers

**Venue & Navigation**

- Interactive course and venue maps
- Parking information and directions to Great Park
- Recommended hotel accommodations for visiting teams
- Course aerial tour/video walkthrough

### 2. Race Information & Registration

**Coach Dashboard**

- **Coaches Intro**: Overview and guidelines for team participation
- **Team Registration**: Google Form integration for coaches to register teams
- **Entry Fees**: Pricing structure and payment information
- **Race Day Info**: Logistics, check-in procedures, rules, and expectations
- **Pre-Order T-Shirts**: Merchandise ordering (Microsoft Forms integration)

**Race Details**

- **Schedule**: Race timing and divisions for each heat
- **Participating Teams**: Searchable list of registered teams
- **Sweepstakes & Rated Entries**: Featured high-performing teams and notable entries

### 3. Live Timing & Results

**Live Results**

- Real-time race results via AthleticLIVE integration
- Live video streaming of the race via RunnerSpace
- Direct links to Athletic.net timing platform

**Timing Tools**

- Convert Ultra timing files to LIF
- Generate individual, age group, and team results from Ultra or LIF files

**Historical Results**

- **All-Time Lists**:
  - All-time individual records (fastest times by gender and level)
  - All-time team results and averages
  - Records spanning 40+ years (1981-2026)
- **Official Results**: Year-by-year race results
  - 1998-2006: Web pages with each race's individual and team results, plus overall Top Individuals (top 100) and Teams (each school's five fastest times across all races) for girls and boys
  - 2007-2026: Downloadable PDFs (no meet in 2020)

### 4. Race Categories & Divisions

The event accommodates multiple participant levels:

**Divisions**

- Division I (Blue), II (Gold), III (Red), IV (White), V (Green)

**Competition Levels**

- Novice (individual entries only)
- Frosh, Soph, Frosh / Soph
- Junior Varsity
- Junior / Senior, Junior, Senior
- Varsity
- Rated and Sweepstakes (featured races)

**Gender Categories**

- Girls and Boys divisions for each level

### 5. Rich Media & Course Experience

**Ambient Video**: Homepage features background video of the venue (Great Park) for immersive user experience

**Visual Content**

- Course and venue maps for navigation
- Photo galleries showcasing past events
- Aerial course tour
- Video streams of live race

### 6. External Integrations

**Timing & Results Services**

- **Athletic.net**: Athlete registration and result data
- **AthleticLIVE**: Live timing display
- **RunnerSpace**: Live video streaming and race video archive

**Registration & Communication**

- **Google Forms**: Team registration intake
- **Microsoft Forms**: T-shirt pre-order collection
- **Social Media**: Race hashtag links to Twitter and Instagram (#WoodbridgeClassic)

## User Workflows

### For Coaches

1. Browse event information and logistics (Coaches > Intro)
2. View entry fees and schedule (Coaches section)
3. Register team via Google Form link
4. Pre-order team merchandise (T-shirts)
5. Review race day information and instructions
6. Check final participating teams list before race day
7. Monitor live results during the event

### For Athletes

1. Review schedule and race categories
2. Find hotel and parking information
3. Register individually via Athletic.net
4. Watch live race stream on RunnerSpace
5. View live results on AthleticLIVE
6. Browse past winners and all-time records

### For Spectators

1. Learn about the event and venue (General Info > About)
2. Get parking and directions
3. Watch live video stream during race
4. Follow live results in real-time
5. Browse race galleries for photos/videos

### For Organizers

1. Manage event dates and timelines (configuration-driven)
2. Control feature visibility (e.g., showing/hiding ambient video)
3. Update participating teams list
4. Publish sweepstakes entries
5. Update all-time records database

## Key Features by Section

| Section          | Key Pages                                          | Purpose                                                   |
| ---------------- | -------------------------------------------------- | --------------------------------------------------------- |
| **Home**         | Homepage                                           | Central hub with featured announcements and ambient video |
| **Coaches**      | Intro, Registration, Fees, T-Shirts, Race Day Info | Complete coach resource center                            |
| **Racing Info**  | Schedule, Maps, Teams, Entries, Aerial Tour        | Race logistics and participant info                       |
| **General Info** | About, Hotels, Parking, Partners, Galleries        | Event context and practical information                   |
| **Results**      | Live Results, All-Time Lists, Official Results     | Race outcomes and historical records                      |
| **Other**        | Contact, Timing                                    | Contact info and race-day timing tools                    |

## Timeline-Based Content

The site displays content based on event dates set in `src/config/data.ts` (2026 dates shown):

- **Team Registration**: Opens January 1; Saturday morning session only from April 4; waiting list only from July 29; closes August 31
- **Athlete Registration**: Opens August 1 on Athletic.net (link posted July 29), closes September 3
- **T-Shirt Pre-Orders**: Opens August 14, closes September 11
- **Participating Teams Published**: May 9 (division and varsity heat added July 14)
- **Featured Entries Published**: September 1
- **Hotel Reservation Deadlines**: August 21 (Comfort Inn), August 27 (Embassy Suites), September 1 (Hilton Garden Inn)
- **Parking Passes**: On sale from August 13
- **Race Date**: September 18, 2026 (5:00 PM start)

## Responsive Design

The site is fully responsive and optimized for:

- Desktop browsers with full navigation and details
- Tablets with adaptive layouts
- Mobile devices with touch-friendly navigation
- Firefox-specific adjustments for compatibility

The design adapts to viewport dimensions, hiding non-essential elements on small screens while maintaining functionality and readability.
