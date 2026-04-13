# Syntax Studio

An interactive UI component library and live customizer built with React + Vite. Browse, tweak, and copy production-ready CSS & JSX directly into your project.

## Features

- **Live Customizer** — Adjust colors, spacing, border-radius, shadows, and animations in real time
- **Copy-ready Output** — Get clean CSS or JSX with one click
- **45+ Components** across 11 categories
- **10 Custom React Hooks** with live demos and copyable source
- **Multi-theme Support** — Dark, Purple, and Ocean themes, persisted via `localStorage`
- **Responsive** — Mobile-friendly layout with sidebar navigation and hamburger menu

## Component Categories

| # | Category | Examples |
|---|----------|---------|
| 01 | Animated Cards | Flip, Glow, Slide, Tilt, Magnetic |
| 02 | Forms | Login, Signup, Contact, OTP |
| 03 | Buttons | Solid, Outline, Ghost, Gradient |
| 04 | Typography | Headings, Body, Quote, Code |
| 05 | Badges & Tags | Pills, Status, Notifications |
| 06 | Loaders | Skeleton, Spinner, Progress, Dots |
| 07 | Modals & Dialogs | Confirmation, Drawer, Bottom Sheet |
| 08 | Toasts | Success, Error, Warning, Info |
| 09 | Tables | Sortable, Striped, Paginated |
| 10 | Tabs & Accordion | Tabs, Pills, Expand/Collapse |
| 11 | Avatars | Grouped, Status Rings, Overflow |

## Custom Hooks

| Hook | Category |
|------|----------|
| `useLocalStorage` | State |
| `useDebounce` | Performance |
| `useFetch` | Async |
| `useToggle` | State |
| `useClickOutside` | DOM |
| `useWindowSize` | DOM |
| `usePrevious` | State |
| `useCountdown` | Timer |
| `useCopyToClipboard` | Utility |
| `useOnScreen` | DOM |

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [React Router v6](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [dnd-kit](https://dndkit.com/) — drag and drop
- [styled-components](https://styled-components.com/)
- [Axios](https://axios-http.com/)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## How It Works

1. **Pick** — Browse components from the sidebar
2. **Customize** — Use the live controls panel to tweak properties
3. **Copy** — Hit copy to get the CSS or JSX snippet
4. **Ship** — Paste directly into your project

## License

[MIT](./LICENSE)
