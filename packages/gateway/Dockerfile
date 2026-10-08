FROM nginx:1.25-alpine
COPY packages/gateway/nginx.conf.template /etc/nginx/nginx.conf.template
CMD envsubst < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'

