# Base NGINX image
FROM nginx:latest

# Copy NGINX configuration
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for NGINX
EXPOSE 80