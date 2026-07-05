# My Portfolio

A high-performance, reactive personal portfolio website built with ```Angular 19``` and hosted on ```GitHub Pages```. This project showcases my skills, education, experience, and projects while serving as a playground for modern Angular features.

👉 [View Live](https://kranthi0307.github.io/portefeuille/)

# Tech Stack & Key Features

- **Framework:** ```Angular 19``` (Signals-driven architecture)
- **Language:** ```TypeScript```
- **Styling:** ```SCSS```
- **Deployment:** ```GitHub Pages``` via ```GitHub Actions```
- **Automated Keep-Alive:** Scheduled ```CRON``` job to prevent backend spin-down

# Architecture & Development Flow

- **State Management via Angular Signals**

This portfolio uses native ```Angular Signals``` for reactive state management, data fetching, and handling global ```UI``` states like loading indicators.

```
import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, map, of, tap } from "rxjs";
import { environment } from "../../../environments/environment";
import { Education } from "../domains/education";
import { Experience } from "../domains/experience";
import { Info } from "../domains/info";
import { Project } from "../domains/project";
import { Skill } from "../domains/skill";

@Injectable({ providedIn: 'root' })
export class PublicService {

  private readonly http_client = inject(HttpClient);

  private readonly public_api: string = `${environment.apiUrl}/public-api/v1`;

  public readonly is_loading = signal<boolean>(true);

  public readonly info = toSignal(
    this.http_client.get<Info>(`${this.public_api}/info`).pipe(
      tap(() => this.is_loading.set(false)),
      map(response => response.data),
      catchError((error: any) => {
        this.is_loading.set(false)
        return of({
          projects: [] as Project[],
          skills: [] as Skill[],
          experiences: [] as Experience[],
          educations: [] as Education[]
        })
      })
    ),
    {
      initialValue: {
        projects: [] as Project[],
        skills: [] as Skill[],
        experiences: [] as Experience[],
        educations: [] as Education[]
      }
    }
  )
}
```

- **Multi-Environment Configuration**

  To ensure clean isolation between ```development``` and ```production``` environments, the project utilizes standard ```Angular``` environment files.

    - Development (src/environments/environment.development.ts):
      ```
      export const environment = {
        production: false,
        apiUrl: 'http://localhost:8082/portfolio'
      };
      ```
    - Production (src/environments/environment.ts):
      ```
      export const environment = {
        production: true,
        apiUrl: 'https://portfolio-service-latest.onrender.com/portfolio'
      };
      ```

# CI/CD & Deployment Flow

The project is fully automated using ```GitHub Actions``` (```.github/workflows/deploy.yml```). It handles two distinct tracks: Build & Deploy on pushes to main, and a Scheduled Ping to keep the free-tier backend awake.

```
name: Going live!...

on:
  push:
    branches:
      - main
  workflow_dispatch:
  schedule:
    - cron: "*/5 * * * *"

jobs:
  build-and-deploy:
    if: github.event_name != 'schedule'
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install --legacy-peer-deps

      - name: Build latest repository
        run: npm run build -- --configuration production --base-href=/portefeuille/

      - name: Deploying to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: dist/portefeuille/browser/

  scheduled-task:
    if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Api call
        run: curl -X GET "https://portfolio-service-latest.onrender.com/portfolio/project/getProjects"
```

# Architectural Decision Records (ADR)

**ADR 1: Use of Angular Signals over RxJS for Component State**

- **Context:** ```Angular 19``` emphasizes ```Signals``` for fine-grained reactivity.
- **Decision:** Use ```Signals``` for all localized ```UI``` states (e.g., ```isLoading```, ```projects```) to minimize template subscription boilerplate (```| async```) and optimize change detection performance.
- **Consequences:** Cleaner code, no manual unsubscriptions required, zone-less readiness.

**ADR 2: Keep-Alive CRON Job inside Deployment Workflow**

- **Context:** The backend service is hosted on Render's free tier, which spins down after 15 minutes of inactivity, causing 50+ second cold-start delays for portfolio visitors.
- **Decision:** Utilize the ```GitHub Actions``` workflow schedule trigger to execute a lightweight curl request every 5 minutes.
- **Consequences:** The backend remains hot and ready, ensuring an instant load time for users looking at portfolio.

# Troubleshooting

- **GitHub Actions Permissions Error:** If the ```build-and-deploy``` job fails on the deployment step with a ```403 Forbidden``` error, check your repository settings: ```Settings -> Actions -> General -> Workflow permissions and change it to "Read and write permissions"```.
- **Base-Href Routing Issues:** Because this app is deployed to a subfolder (```/portefeuille/```), the build command must include ```--base-href=/portefeuille/```. If asset paths break or routing fails on refresh, verify that the ```dist/``` subfolder structure exactly matches ```dist/portefeuille/browser/```.

# Future Enhancements

- **Angular Material Integration:** Implement ```MatCard```, ```MatChips```, and ```MatDialog``` to build out polished interactive project-demo modals.
- **Server-Side Rendering (SSR)/Prerendering:** Enable ```Angular SSR``` to maximize ```SEO visibility``` so recruiters can find the site organically via Google.
- **Dark Mode Toggle:** Use ```Angular Signals``` paired with ```SCSS CSS``` variables to build an optimized, flash-free dark mode toggle.
- **Lighthouse Optimization:** Implement image lazy-loading (```NgOptimizedImage```) to guarantee a 100% performance score.

# References

- **Canvas:** Custom structural images and wireframes.
- **```web.dev```:** Modern ```CSS``` layouts and performance best practices.
- **Open Source:** Structure ideas adapted from ```ngx-admin``` and ```ng-simple-slideshow```.

Inspired by Nothing • Big fan of Nothing
