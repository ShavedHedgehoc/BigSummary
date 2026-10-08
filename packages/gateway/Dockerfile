FROM nginx:1.25-alpine
COPY packages/gateway/nginx.conf.template /etc/nginx/nginx.conf.template
CMD sed -i "s/listen       80;/listen       ${WORKSTATION_PORT};/g" /etc/nginx/conf.d/default.conf && \
    sed -i '/location \/ {/,/}/ s|index  index.html index.htm;|try_files $uri $uri/ /index.html;|' /etc/nginx/conf.d/default.conf && \
    exec nginx -g 'daemon off;'
