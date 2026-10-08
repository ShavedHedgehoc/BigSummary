# FROM nginx:stable
# COPY packages/gateway/nginx.conf /etc/nginx/nginx.conf
# CMD ["nginx", "-g", "daemon off;"]
FROM nginx:1.25-alpine
COPY nginx.conf.template /etc/nginx/nginx.conf.template
CMD ["sh", "-c", "envsubst '${API_PORT} ${WORKSTATION_PORT}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
