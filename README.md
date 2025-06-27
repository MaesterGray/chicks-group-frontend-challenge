# Chicks Group Frontend Challenge

A modern game item shop interface built with React and TypeScript.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Running the Application

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

## Design Choices

### Core Features
- Responsive item shop with filtering and sorting capabilities
- Shopping cart functionality with currency selection
- Mobile-friendly navigation with drawer menu
- Social media integration with brand colors

### Technical Decisions
- **React + TypeScript**: For type safety and better development experience
- **Vite**: Fast development server and optimized builds
- **Context API**: Managing cart and currency state globally
- **CSS Modules**: For scoped styling and maintainability

### UI/UX Highlights
- Grid layout showing 15 items per page
- Advanced filtering by game type and price
- Sort options by price and name
- Consistent spacing and modern aesthetic
- Interactive elements with smooth transitions

### Components
- **Header**: Main navigation and cart
- **ItemCard**: Game item display
- **Dropdown**: Filter and sort controls
- **Pagination**: Page navigation
- **Footer**: Social links and payment methods
- **MobileDrawer**: Mobile navigation menu
