# Installation Guide

## Pixigon - Next.js TypeScript & TailwindCSS Online Courses & Education Template

This guide will help you install and set up the Pixigon Next.js template on your local machine.

---

## 1. Download the Package

- **Source:** Download the package from [ThemeForest](https://themeforest.net).
- **Format:** The package will be in a `.zip` file format.

---

## 2. Unzip the Package

Extract the contents of the downloaded `.zip` file to a directory on your computer.

---

## 3. Prerequisites

Before installing the project, make sure you have the following installed on your system:

- **Node.js:** Version 18.0 or higher ([Download Node.js](https://nodejs.org/))
- **npm** or **yarn** or **pnpm** package manager (comes with Node.js)

To verify your installation, run these commands in your terminal:

```bash
node --version
npm --version
```

---

## 4. Install Dependencies

Navigate to your project folder and install all dependencies using npm:

```bash
npm install
```

**Alternative package managers:**

```bash
# Using Yarn
yarn install

# Using pnpm
pnpm install

# Using Bun
bun install
```

**Outcome:** The package manager will install all dependencies listed in `package.json` and prepare the project for development.

**Dependencies include:**
- Next.js 16.0.10
- React 19.2.1
- TypeScript 5.9.3
- Tailwind CSS 4.1.18
- Remix Icon
- Swiper
- And other required packages

---

## 5. Start Development Server

Start the project in development mode with hot-reloading:

```bash
npm run dev
```

**Alternative commands:**

```bash
# Using Yarn
yarn dev

# Using pnpm
pnpm dev

# Using Bun
bun dev
```

**Outcome:** Your project will run locally. Open [http://localhost:3000](http://localhost:3000) to preview it in your browser with hot-reloading enabled. Any changes you make to the code will automatically refresh in the browser.

---

## 6. Build for Production

Compile and optimize your project for production:

```bash
npm run build
```

**Alternative commands:**

```bash
# Using Yarn
yarn build

# Using pnpm
pnpm build

# Using Bun
bun build
```

**Outcome:** All files will be compiled and optimized into the `.next` folder, ready for deployment. The build process will:
- Optimize images
- Minify CSS and JavaScript
- Generate static pages where possible
- Create production-ready bundles

---

## 7. Start Production Server

After building, you can start the production server locally:

```bash
npm run start
```

**Alternative commands:**

```bash
# Using Yarn
yarn start

# Using pnpm
pnpm start

# Using Bun
bun start
```

**Outcome:** The production server will start on [http://localhost:3000](http://localhost:3000) with optimized production builds.

---

## 8. Lint Your Code

Check your code for linting errors:

```bash
npm run lint
```

**Outcome:** ESLint will analyze your code and report any linting errors or warnings.

---

## Project Structure

```
pixigon-next-ts/
├── public/                 # Static assets (images, icons, etc.)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (Blog)/        # Blog route group
│   │   ├── (Courses)/     # Courses route group
│   │   ├── (Home)/        # Home pages route group
│   │   ├── (Pages)/       # Static pages route group
│   │   ├── (Shop)/        # Shop route group
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   ├── assets/           # Images, CSS, fonts
│   ├── components/       # React components
│   ├── common/           # Common components
│   ├── constants/        # Constants and configurations
│   ├── data/             # Data files
│   └── types/            # TypeScript type definitions
├── plugins/              # Custom JavaScript plugins
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── postcss.config.mjs    # PostCSS configuration
└── package.json          # Project dependencies
```

---

## Environment Setup

### Development Environment Variables

Create a `.env.local` file in the root directory for local development:

```env
# Add your environment variables here
# Example:
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Production Environment Variables

For production deployment, set environment variables in your hosting platform (Vercel, Netlify, etc.).

---

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - If port 3000 is already in use, Next.js will automatically use the next available port (3001, 3002, etc.)

2. **Module Not Found Errors**
   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

3. **TypeScript Errors**
   - Ensure all dependencies are installed
   - Check `tsconfig.json` configuration

4. **Build Errors**
   - Clear `.next` folder: `rm -rf .next` (or delete it manually)
   - Run `npm run build` again

---

## Next Steps

After installation, you can:

1. **Customize the Template:**
   - Edit components in `src/components/`
   - Modify pages in `src/app/`
   - Update styles in `src/assets/css/`

2. **Configure Navigation:**
   - See `NAVIGATION_GUIDE.md` for navigation customization

3. **Deploy Your Site:**
   - Deploy to [Vercel](https://vercel.com) (recommended for Next.js)
   - Deploy to [Netlify](https://netlify.com)
   - Deploy to any Node.js hosting platform

---

## Support

If you encounter any issues during installation:

1. Check the [Next.js Documentation](https://nextjs.org/docs)
2. Review the project's README.md file
3. Contact support through ThemeForest

---

**© 2025 Pixigon - Crafted by [SRBThemes](https://1.envato.market/srbthemes)**

