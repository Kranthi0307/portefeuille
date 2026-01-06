FROM node:24.12.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build
FROM nginx:stable
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/portefeuille/browser/ /usr/share/nginx/html
EXPOSE 80
