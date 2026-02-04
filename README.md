# 🌤️ Weather API Microfrontend

A practice project demonstrating **Module Federation** with Vite. This Weather API app serves as a remote microfrontend that can be consumed by a host application (Gaia).

## 🎯 Purpose

This project is a learning exercise to understand:

- Module Federation architecture
- Microfrontend communication patterns
- Exposing React components as remote modules
- Sharing dependencies between host and remote apps

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                 GAIA (Host App)                         │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │  import WeatherApp from 'weatherRemote/WeatherApp'  │
│   │                                                 │   │
│   │  <WeatherApp city="Berlin" />                   │   │
│   └─────────────────────────────────────────────────┘   │
│                         │                               │
│                         │ loads at runtime              │
│                         ▼                               │
│   ┌─────────────────────────────────────────────────┐   │
│   │        WEATHER API (Remote/Microfrontend)       │   │
│   │                 Port 3001                       │   │
│   │                                                 │   │
│   │        Exposes: WeatherApp Component            │   │
│   └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build (required for Module Federation)
npm run preview
```

### Ports

- **Development**: http://localhost:3001
- **Preview**: http://localhost:3001
