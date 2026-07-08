# ♟️ XLChess Hero

> A modern, premium React chess landing page featuring an animated chess showcase, autoplay game demonstration, and Play vs Computer functionality.

---

## Overview

**XLChess Hero** is a modern chess platform landing page inspired by premium SaaS websites.

The project combines an elegant user interface with interactive chess functionality to create a realistic product experience.

It demonstrates modern React development practices, responsive UI design, reusable component architecture, animation, and chess game logic.

---

## Features

- Responsive landing page
- Animated Hero section
- Modern glassmorphism UI
- Interactive chessboard
- Evergreen Game autoplay demonstration
- Play vs Computer mode
- Five AI difficulty levels
- Move validation
- Move history
- Position evaluation
- Undo move
- Last move highlighting
- Responsive layout for Desktop, Tablet and Mobile
- Smooth Framer Motion animations

---

# Technologies & Libraries Used

| Technology        | Purpose                       |
|-------------------|-------------------------------|
| React 19          | UI Development                |
| Vite 8            | Build Tool                    |
| JavaScript (ES6+) | Application Logic             |
| CSS3              | Styling                       |
| Framer Motion     | Animations                    |
| chess.js          | Chess Rules & Move Validation |
| react-chessboard  | Interactive Chessboard        |
| React Icons       | Icons                         |
| ESLint            | Code Quality                  |

---

# Project Structure

```
src
│
├── assets
│
├── components
│   ├── Background
│   ├── Button
│   ├── ChessBoard
│   ├── FloatingPieces
│   ├── Footer
│   ├── Navbar
│   ├── PlayChess
│   └── Stats
│
├── sections
│   ├── Hero
│   ├── Features
│   ├── AnalysisSection
│   ├── Community
│   └── Pricing
│
├── services
│   └── chessEngine.js
│
├── constants
│   └── evergreenGame.js
│
├── pages
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# Setup & Installation

## Clone the repository

```bash
git clone https://github.com/Prashanthkoll/XLChess_Hero.git
```

## Move into the project

```bash
cd xlchess-hero
```

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

## Build production version

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

---

# Design Decisions

### Component-Based Architecture

The application is organized into reusable components and page sections.

```
Components → Reusable UI
Sections   → Landing Page Sections
Services   → Chess Engine Logic
Constants  → Static Game Data
Pages      → Page Composition
```

This structure improves scalability, maintainability, and code readability.

---

### Separation of Concerns

Each part of the application has a single responsibility.

- Components handle UI rendering.
- Services manage chess logic.
- Constants store static data.
- CSS files remain component-specific.

This keeps the code clean and easier to maintain.

---

### Local State Management

React Hooks (`useState`, `useEffect`, and `useRef`) were used for state management because the application does not require global state.

This keeps the project lightweight without introducing Redux or other state libraries.

---

### Responsive Design

The application follows a responsive-first approach using:

- Flexbox
- CSS Media Queries
- Fluid layouts
- Adaptive spacing

to provide a consistent experience across desktops, tablets, and mobile devices.

---

### Lightweight Chess AI

A lightweight custom AI was implemented instead of integrating Stockfish.

This keeps the application easy to understand while still demonstrating chess gameplay.

---

# Assumptions Made

The following assumptions were made during development:

- The project is a front-end prototype showcasing a chess platform.
- Games are played locally in the browser.
- AI difficulty levels are heuristic-based rather than official engine ratings.
- User authentication is outside the project scope.
- Multiplayer functionality is not included.
- No backend or database is required for the current implementation.

---

# Trade-offs Considered

## Custom AI vs Stockfish

A lightweight chess engine was chosen instead of Stockfish.

### Advantages

- Faster implementation
- Smaller project size
- Easier to understand
- No additional engine integration

### Trade-off

- Lower playing strength
- Simpler evaluation compared to professional chess engines

---

## CSS vs Tailwind

Component-based CSS was chosen instead of Tailwind CSS.

### Advantages

- Better control over styling
- Cleaner separation of styles
- Easier for beginners to understand

### Trade-off

- More CSS to maintain
- Slightly slower styling workflow

---

## React Hooks vs Global State

React Hooks were used instead of Redux or Zustand.

### Advantages

- Simpler architecture
- Less boilerplate
- Easier maintenance

### Trade-off

- Less suitable for very large applications with complex shared state

---

# Play vs Computer

Features include:

- Play as White or Black
- Five AI difficulty levels
- Valid move checking
- Automatic AI response
- Undo move
- New Game option
- Position evaluation
- Move history
- Last move highlighting

---

# Responsive Design

The application has been optimized for:

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

# Future Improvements

If additional development time were available, the following features would be implemented:

- Stockfish integration
- Online multiplayer using WebSockets
- User authentication
- Cloud database for game history
- PGN import/export
- Opening Explorer
- Chess puzzles
- Player profiles
- Tournament system
- Leaderboards
- Dark / Light themes
- Advanced game analysis
- Unit testing with Jest & React Testing Library
- GitHub Actions CI/CD pipeline
- Performance optimization through lazy loading and code splitting

---

# What I Learned

This project helped strengthen my understanding of:

- React Component Architecture
- State Management with Hooks
- Responsive Web Design
- Chess Game Logic
- JavaScript ES6+
- CSS Layout Techniques
- UI/UX Design Principles
- Framer Motion Animations
- Git & GitHub Workflow
- Clean Code Organization

---

# Screenshots

### Home Page

```
assets/Home.png
```

### Play vs Computer

```
assets/Play.png
```

---

# Live Demo

```
https://xl-chess-hero-bgne.vercel.app/
```

---

# Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

# License

This project is licensed under the MIT License.

---


## Author

**Kolla Prashanth**

- GitHub: https://github.com/Prashanthkoll
- LinkedIn: https://linkedin.com/in/kolla-prashanth

---

 If you found this project helpful, consider giving it a Star on GitHub!
