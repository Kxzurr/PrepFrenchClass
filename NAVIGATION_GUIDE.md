# Navigation Styles Guide

This guide explains how to use different navigation styles (Style-1 and Style-2) on different pages.

## Overview

- **Style-1**: Light navigation (`navbar-light`) - Light background with dark text
- **Style-2**: Dark navigation (`navbar-dark`) - Dark background with white text

## How It Works

The `NavigationWrapper` component automatically selects the appropriate navigation style based on the current route using a configuration object.

## Configuration

Edit `src/components/Layouts/Topbar/NavigationWrapper.tsx` to configure which pages use which navigation style:

```typescript
const navigationConfig: Record<string, 'style-1' | 'style-2'> = {
    '/': 'style-1',                    // Home page uses light navigation
    '/home-music': 'style-2',          // Music page uses dark navigation
    '/home-food': 'style-1',           // Food Academy uses light navigation
    '/home-campus': 'style-1',         // Campus University uses light navigation
    '/home-dance': 'style-2',          // Dance Academy uses dark navigation
    '/home-language': 'style-2',       // Language Academy uses dark navigation
    // Add more routes as needed
};
```

## Adding New Routes

To add a new route with a specific navigation style:

1. Open `src/components/Layouts/Topbar/NavigationWrapper.tsx`
2. Add your route to the `navigationConfig` object:

```typescript
const navigationConfig: Record<string, 'style-1' | 'style-2'> = {
    // ... existing routes
    '/your-new-route': 'style-2',  // or 'style-1'
};
```

## Default Behavior

If a route is not specified in the configuration, it defaults to **Style-1** (light navigation).

## Alternative: Route Groups with Different Layouts

If you need more control, you can use Next.js route groups to create separate layouts:

### Option 1: Route Groups

Create different layouts for different navigation styles:

```
src/app/
├── (light-nav)/
│   ├── layout.tsx          # Uses Style-1 Navigation
│   └── home-campus/
│       └── page.tsx
└── (dark-nav)/
    ├── layout.tsx          # Uses Style-2 Navigation
    └── home-language/
        └── page.tsx
```

### Option 2: Nested Layouts

Create nested layouts for specific routes:

```
src/app/
├── layout.tsx              # Root layout (no navigation)
└── (Home)/
    ├── layout.tsx          # Uses NavigationWrapper
    └── home-campus/
        └── page.tsx
```

## Manual Override

If you need to manually specify navigation on a specific page, you can:

1. Create a custom layout for that route group
2. Import and use the specific navigation component directly

Example:

```typescript
// src/app/(dark-pages)/layout.tsx
import NavigationStyle2 from '../../components/Layouts/Topbar/Style-2/Navigation';

export default function DarkLayout({ children }) {
  return (
    <>
      <NavigationStyle2 />
      {children}
    </>
  );
}
```

## Current Configuration

Based on the template structure:
- **Style-1 (Light)**: Default pages, Campus University, Food Academy
- **Style-2 (Dark)**: Music Academy, Dance Academy, Language Academy

