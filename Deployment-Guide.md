# TheBoilerplate Server Deployment Guide

This guide provides step-by-step instructions for deploying TheBoilerplate Django project on a server.

## Prerequisites

- A server running Ubuntu 20.04 or higher
- SSH access to the server
- Domain name pointing to the server

## Install Required Packages

### Update Package List

```bash
sudo apt update
```

### Install Git

```bash
sudo apt install git -y
```

### Install Docker

```bash
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker
```

### Install Docker Compose

```bash
sudo apt install docker-compose -y
```

### Install Nginx

```bash
sudo apt install nginx -y
```

## Clone the Repository

```bash
git clone https://github.com/user/TheBoilerplate.git YOURDOMAIN
cd YOURDOMAIN
```

## Setup

### Rename Frontend Environment Sample File

```bash
cp frontend/.env-sample frontend/.env
```

### Set IP (XXX.XXX.XX.XXX)

```
#.env

API_URL=http://backend:8000
SERVER_IP=http://XXX.XXX.XX.XXX:8000
```

```
#backend/config/settings.py

ALLOWED_HOSTS = ['frontend', 'backend', '0.0.0.0:8000', '0.0.0.0', 'localhost', 'localhost:8000', '10.20.7.28', '192.168.0.13', 'XXX.XXX.XX.XXX']

...

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://0.0.0.0:3000",
    "http://192.168.0.13:3000",
    "http://172.23.0.2:3000",
    "http://XXX.XXX.XX.XXX:3000",
]
```

### Build and Run Docker Containers

```bash
docker-compose up --build -d
```

### Create Django Database Tables

```bash
docker-compose exec backend python manage.py migrate
```

### Load Sample Data

```bash
docker-compose exec backend python manage.py loaddata datadump.json
```

### Create Superuser (Optional)

```bash
docker-compose exec backend python manage.py createsuperuser
```

### Collect Static Files

```bash
docker-compose exec backend python manage.py collectstatic
```

## Nginx Configuration

Create a new Nginx configuration file for your domain.

```bash
sudo nano /etc/nginx/sites-available/YOURDOMAIN
```

Paste the following Nginx configuration, replacing `YOURDOMAIN` with your actual domain name.

```nginx
server {
  listen 80;
  server_name YOURDOMAIN;
  rewrite ^ https://$http_host$request_uri? permanent;
}

server {
   listen 443 ssl;
   server_name YOURDOMAIN;

   include ssl_params;

   add_header Content-Security-Policy "default-src 'self' https://YOURDOMAIN; img-src http: https: data: blob:; font-src 'self' data: https://fonts.gstatic.com; media-src 'self' https: blob: https://YOURDOMAIN; script-src 'self' https://www.google.com/ https://www.gstatic.com/ https://www.youtube.com https://s.ytimg.com https://yastatic.net https://ssl.google-analytics.com https://www.google-analytics.com https://www.googleadservices.com https://googleads.g.doubleclick.net https://*.googleapis.com https://code.jquery.com https://cdnjs.cloudflare.com https://secure.adnxs.com https://mc.yandex.ru https://www.googletagmanager.com https://connect.facebook.net https://cdn.mookie1.com 'unsafe-inline' 'unsafe-eval'; style-src 'self' https://*.googleapis.com https://use.fontawesome.com https://cdnjs.cloudflare.com 'unsafe-inline'; child-src 'self' https://player.vimeo.com https://www.youtube.com https://*.google.com https://*.yandex.ru https://*.googletagmanager.com https://*.twitter.com https://*.facebook.com; connect-src 'self' https://api.cookieseal.com https://www.directmarketingturkey.com https://mc.yandex.ru; object-src 'self'; frame-src 'self' https://bid.g.doubleclick.net https://*.google.com https://*.yandex.ru https://*.vimeo.com https://*.youtube.com;" always;

   add_header X-Frame-Options "SAMEORIGIN" always;
   add_header X-Xss-Protection "1; mode=block" always;
   add_header Referrer-Policy "no-referrer-when-downgrade" always;
   add_header Feature-Policy "microphone 'none';camera 'none';" always;
   add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload" always;
   add_header X-Content-Type-Options "nosniff" always;

   access_log /var/log/nginx/YOURDOMAIN_access_log combined;
   error_log /var/log/nginx/YOURDOMAIN_error_log debug;

   location / {
        proxy_pass http://0.0.0.0:3000; # Frontend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        rewrite ^/api(/.*)$ $1 break;
        proxy_pass http://0.0.0.0:8000; # Backend
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

   location = /favicon.ico {
       access_log off;
       log_not_found off;
   }

   location /static/ {
       alias /var/www/YOURDOMAIN/collectedstatic/;
       access_log off;
       add_header Cache-Control "max-age=604800, public";
   }

   location /media/ {
       alias /var/www/YOURDOMAIN/media/;
       access_log off;
       add_header Cache-Control "max-age=604800, public";
   }

}

```

Enable the Nginx configuration.

```bash
sudo ln -s /etc/nginx/sites-available/YOURDOMAIN /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Access the Application

Now you can access the application at `http://YOURDOMAIN`.

---

Congratulations, you've successfully deployed TheBoilerplate on your server!
