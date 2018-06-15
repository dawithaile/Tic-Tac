# Docker set up using nginx

FROM nginx
COPY dist /usr/share/nginx/html
EXPOSE 80
