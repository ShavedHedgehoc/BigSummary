FROM nginx:1.25-alpine
COPY packages/gateway/nginx.conf.template /etc/nginx/nginx.conf.template
CMD envsubst '\${API_PORT} \${WORKSTATION_PORT} \${DASH_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'
