# Project Documentation

## Overview

This is a full-stack personal portfolio website for "Reza Arifa Rabbani" built with React/TypeScript frontend and Express.js backend. The website features a modern dark theme with blue accents, smooth animations, responsive layout, and professional branding. Key highlights include a custom animated logo, typing effect animations, glow effects, and organized code structure with centralized configuration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system using CSS variables
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Animations**: Framer Motion for smooth animations and transitions
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL session store with connect-pg-simple
- **Development**: Hot reload with tsx and Vite middleware integration

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Type Safety**: Full TypeScript integration with Drizzle ORM
- **Shared Schema**: Common type definitions between frontend and backend

## Key Components

### Frontend Components
- **Logo Component**: Custom SVG logo with "R" letter, blue gradient, and glow effects
- **Navigation**: Fixed header with logo, smooth scroll navigation, and mobile responsive menu
- **Hero Section**: Full-screen introduction with animated profile image, name glow effects, and typing animation loop
- **About Section**: Personal information with status card (Student) and animated info cards
- **Skills Section**: Progress bars with intersection observer animations
- **Projects Section**: Grid of 4 project cards with GitHub integration
- **Contact Section**: Minimalist social media icons (Instagram, GitHub, Email)
- **Footer**: Simple footer with animated heart icon

### Backend Components
- **Storage Interface**: Abstract storage layer with in-memory implementation
- **User Management**: Basic user schema with authentication structure
- **Route Registration**: Centralized route management system
- **Error Handling**: Global error middleware for consistent error responses

### Shared Components
- **Schema Definitions**: Zod schemas for user validation
- **Type Exports**: Shared TypeScript types between client and server

## Data Flow

### Frontend Data Flow
1. React Query manages all server state and caching
2. Components use custom hooks for data fetching
3. Forms use React Hook Form with Zod validation
4. Navigation uses Wouter for client-side routing
5. Animations triggered by scroll position and user interactions

### Backend Data Flow
1. Express middleware handles request processing
2. Storage interface abstracts data operations
3. Drizzle ORM manages database interactions
4. Error middleware provides consistent error handling
5. Session management for user authentication

### Authentication Flow
- User schema supports username/password authentication
- Session storage configured for PostgreSQL
- Current implementation uses in-memory storage (development)

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React 18 with TypeScript support
- **Styling**: Tailwind CSS with PostCSS processing
- **Components**: Extensive Radix UI component collection
- **Animation**: Framer Motion for complex animations
- **HTTP Client**: Fetch API with React Query integration
- **Date Handling**: date-fns for date formatting

### Backend Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Store**: connect-pg-simple for PostgreSQL sessions
- **Validation**: Zod for runtime type checking
- **Development**: tsx for TypeScript execution

### Development Dependencies
- **Build Tools**: Vite with React plugin
- **Code Quality**: TypeScript strict mode enabled
- **Development Server**: Vite dev server with HMR
- **Replit Integration**: Cartographer and runtime error modal plugins

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Setup**: Drizzle migrations applied before deployment
4. **Static Assets**: Frontend assets served from Express in production

### Environment Configuration
- **Development**: Hot reload with Vite middleware integration
- **Production**: Static file serving with Express
- **Database**: Environment variable for DATABASE_URL (Neon)
- **Session**: PostgreSQL session storage configuration

### Hosting Considerations
- **Frontend**: SPA with client-side routing (requires fallback configuration)
- **Backend**: Node.js server with Express
- **Database**: Neon serverless PostgreSQL (external service)
- **Assets**: Static files served from Express server

### Database Migration Strategy
- Drizzle Kit manages schema changes and migrations
- Migrations stored in `./migrations` directory
- Schema definitions in `./shared/schema.ts` for type safety
- Push command available for development schema updates

## Recent Changes (January 2025)

### Latest Updates (January 31, 2025)

#### Complete Configuration System Implementation
- **Fully Configurable Portfolio**: Created comprehensive PORTFOLIO_CONFIG in constants.ts
- **Single File Customization**: All content now editable from one configuration file
- **15+ Configurable Elements**: Name, role, images, skills, projects, social links, music player, logo colors, footer text, etc.
- **Easy Content Management**: No need to edit HTML/CSS directly - just update the config file

#### Portfolio Customization Updates
- **Navigation Title**: Changed from "Reza AR" to "Portofolio" for better branding
- **Profile Image**: Updated to new image (https://files.catbox.moe/6o6y6u.png) with perfect circle display using object-cover
- **Footer**: Updated to display "RyezX Project 2025" instead of copyright text
- **Logo**: Restored original "R" design with configurable colors and animation settings

#### Code Optimization and Deployment Ready
- **Ultra-Smooth Scrolling**: Implemented advanced scroll optimizations without "patah-patah" (choppy) behavior
- **Blue Sparkle Effects**: Added beautiful click sparkle effects throughout the website
- **Hosting Optimization**: Created deployment configs for all major platforms (Vercel, Netlify, Railway, Render)
- **Performance Optimizations**: Enhanced font smoothing, momentum scrolling, and mobile responsiveness
- **Deployment Files**: Added vercel.json, netlify.toml, railway.toml, render.yaml for easy deployment
- **Documentation**: Created comprehensive README.md and DEPLOYMENT.md guides

#### Latest Performance Optimizations (January 31, 2025)
- **GPU Acceleration**: Added hardware acceleration for transforms and animations
- **Reduced Animations**: Optimized particle count and animation complexity for better performance
- **Efficient Event Listeners**: Implemented passive scroll listeners and throttling
- **Image Optimization**: Added proper image sizing, lazy loading, and decoding attributes
- **Memory Management**: Reduced sparkle count and improved cleanup
- **CSS Optimizations**: Simplified transitions and removed unnecessary effects
- **Faster Rendering**: Optimized text rendering and removed heavy backdrop filters

#### Enhanced Music Player System
- **Advanced Music Player**: Complete redesign with playlist support and enhanced controls
- **Next/Previous Controls**: Added skip forward and skip back buttons for track navigation
- **Dynamic Track Titles**: Automatic title extraction from filename with formatting
- **Track Counter**: Shows current track position (1 of X tracks)
- **Playlist Management**: Centralized playlist configuration in constants
- **Enable/Disable Option**: Music player can be completely disabled via configuration
- **Auto-play Enhancement**: Improved auto-play with better browser compatibility
- **Modern UI**: Dark theme music player with glass effect and smooth animations

#### Configuration Architecture
- **Central Config File**: `client/src/config/constants.ts` contains all customizable content
- **Structured Data**: Organized sections for personal info, skills, projects, social links, music, logo, footer
- **Type Safety**: Full TypeScript support for all configuration options
- **Backward Compatibility**: Legacy exports maintained for existing components

### Logo and Branding Implementation
- **Custom SVG Logo**: Created animated "R" letter logo with blue gradient and glow effects
- **Favicon Integration**: SVG favicon with inline gradients for browser tab icon
- **Navigation Enhancement**: Added logo to header alongside "Reza AR" text
- **Animation Features**: Logo draws itself on page load and has hover scale effects

### Typography and Font System
- **Primary Font**: Inter for clean, modern body text and headings
- **Monospace Font**: JetBrains Mono for typing effect animations
- **Font Loading**: Optimized Google Fonts preconnect and display=swap

### Header Animation Improvements  
- **Name Glow Effect**: Animated blue glow that pulses around the name
- **Typing Effect Loop**: Smooth typing animation cycling through 4 phrases:
  - "Welcome"
  - "I'm A Lazy Person" 
  - "But I'm Still Excited"
  - "Thank You For Visiting My Website"
- **Enhanced Profile Image**: Animated border, hover effects, and floating particles

### Code Organization and Architecture
- **Centralized Configuration**: Created `config/constants.ts` for all data
- **Component Exports**: Organized exports in `components/index.ts`
- **Clean Imports**: All components now use centralized configuration
- **Type Safety**: Full TypeScript integration with configuration constants

### Content Updates
- **About Section**: Added "Status: Pelajar" field with graduation cap icon
- **Projects Section**: Expanded to 4 projects total, improved grid layout
- **Contact Section**: Redesigned with minimalist social media icons
- **GitHub Integration**: All GitHub links now point to https://github.com/rezzxzx

### Visual Design System
- **Color Scheme**: Blue dark, white, gray, and black theme maintained
- **Animation Consistency**: Standardized timing and easing across components
- **Responsive Design**: All new features work seamlessly on mobile and desktop
- **Performance**: Optimized animations and reduced redundant code