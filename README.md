# Portefeuille - Personal Portfolio

![Angular 19](https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-Styles-CF649A?logo=sass&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-222222?logo=githubpages&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)

[![View Portfolio](https://img.shields.io/badge/View-Live%20Portfolio-222222?logo=githubpages&logoColor=white)](https://kranthi0307.github.io/portefeuille/)

A single-page portfolio website for presenting projects, skills, education, and work experience.

## Purpose

This application brings professional information such as projects, skills, education, and experience together in one place. It gives visitors a straightforward way to understand my background and explore examples of my work, while serving as a practical project for building and maintaining a modern web application.

## Features

- Home page with an image carousel that supports timed transitions and touch or mouse swipes.
- Separate pages for projects, skills, education, and experience.
- Skills grouped by category, with text filtering.
- Portfolio content loaded from a backend API.
- Shared header and footer with navigation and contact links.

## Technology

- **Angular 19** for the single-page application and routing.
- **TypeScript** for application logic and typed domain models.
- **SCSS** for component and global styles.
- **RxJS** for HTTP request handling; Angular Signals expose shared portfolio data and loading state.
- **CryptoJS** for client-side decryption of some API responses.

## Architecture and data flow

Angular routes render the portfolio pages. The shared `PublicService` requests portfolio data from the configured API, then makes the response available to pages as reactive state.

The `PublicService` loads the main portfolio response from the API and provides empty collections if that request fails.

## Project structure

```text
src/
  app/
    common/
      components/       Shared error and warning UI
      domains/          Portfolio data interfaces
      interceptors/     HTTP timeout handling
      models/           Shared UI models
      services/         API, loading, and decryption services
    education/          Education page
    experience/         Experience page
    footer/             Shared footer
    header/             Shared navigation
    home/               Home page and carousel
    projects/           Projects page
    skills/             Skills page and category filtering
    app.config.ts       Router, HTTP, animation, and application providers
    app.routes.ts       Page routes
  assets/               Images, icons, files, and media
  environments/         Development and production API configuration
  index.html             Browser document
  main.ts                Angular application entry point
.github/
  workflows/
    deploy.yml           Build, deployment, and scheduled API request
```

## Prerequisites

- Node.js compatible with Angular 19. The deployment workflow uses Node.js 18.
- npm.

## Getting started

Install dependencies and start the development server:

```bash
npm install --legacy-peer-deps
npm start
```

The development server uses the development Angular environment configuration. Set its `apiUrl` to the base URL of an API instance you are authorized to use. The application adds its API paths to this base URL.

To create a production build:

```bash
npm run build
```

To run the test suite:

```bash
npm test
```

The tests use Jasmine and Karma. Existing specs are primarily component-creation checks; the app component spec includes title and greeting assertions that do not match the current component, so the suite may need maintenance. Tests have not been independently verified as passing.

## Configuration

API configuration is defined in Angular environment files:

- `src/environments/environment.development.ts` is used for development builds.
- `src/environments/environment.ts` is used for production builds.

Set `apiUrl` to the appropriate API base URL in the relevant file. For example:

```typescript
export const environment = {
  production: false,
  apiUrl: '<YOUR_API_BASE_URL>'
};
```

Angular environment values are included in the browser build; they are not secret storage. Do not put credentials, private tokens, or other secrets in frontend configuration.

## Deployment

The GitHub Actions workflow builds the app for GitHub Pages when changes are pushed to `main` and can also be started manually. Its production build sets the `/portefeuille/` base path and deploys the generated site to the `gh-pages` branch. The workflow also makes a scheduled request to the configured backend service.

> **Note:** Some API responses are decrypted in the browser. Any key or logic included in a browser application can be inspected by users, so client-side encryption should not be treated as access control or a way to keep data secret. Keep authorization and sensitive data protections on the backend.

## References

- Canvas for custom images
- web.dev for cssGithub projects like `ngx-admin`, ng-simple-slideshow`
`
-   
Inspired by Nothing • Big fan of Nothing
