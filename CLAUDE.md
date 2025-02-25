# CLAUDE.md - Project Guide for justind.kim

## Build Commands
- `npm run dev` or `npm start` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npx cypress run` - Run all Cypress tests
- `npx cypress run --spec "cypress/e2e/basic.cy.ts"` - Run a specific test file

## Technologies
- Astro (v5.1.2) - Main framework
- TailwindCSS (v3.4.17) - Styling
- GSAP (v3.12.5) - Animations
- TypeScript - Type checking
- Cypress - Testing

## Code Style Guidelines
- **Imports:** Use relative paths (`../layouts/BaseLayout.astro`)
- **TypeScript:** Use TypeScript definitions where appropriate
- **File Structure:** Follow Astro conventions with pages in `src/pages/`
- **Components:** Place in `src/components/` directory
- **Layouts:** Place in `src/layouts/` directory
- **Styling:** Use TailwindCSS classes, avoid custom CSS when possible
- **Animations:** Use GSAP for animations, define inline scripts in components
- **Naming:** Use camelCase for variables, PascalCase for components
- **Markdown:** Use frontmatter for page metadata in `.md` files
- **Testing:** Write Cypress tests for critical user journeys

This is a personal portfolio website built with Astro, TailwindCSS, and GSAP.