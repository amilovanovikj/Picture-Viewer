# Build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Package stage
FROM httpd:2.4-alpine
COPY --from=build-stage /app/httpd.conf /usr/local/apache2/conf/httpd.conf
COPY --from=build-stage /app/dist/picture-viewer/ /usr/local/apache2/htdocs/