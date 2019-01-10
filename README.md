# mistral

## DO droplet
1. Create Ubuntu 18.04 LTS droplet (using SSH key) and name it
2. Add droplet IP to /etc/hosts

## Initial server setup

1. Connect to droplet
```bash
$ ssh root@<droplet>
```

2. Create new user
```bash
$ adduser <username>
```

3. Grant administrative privileges
```bash
$ usermod -aG sudo <username>
```

4. Set up basic firewall
```bash
$ ufw app list
$ ufw allow OpenSSH
$ ufw enable
$ ufw status
```

5. Enable access for regular user
```bash
$ rsync --archive --chown=<username>:<username> ~/.ssh /home/<username>
```

6. Connect as regular user (in a new terminal window)
```bash
$ ssh <username>@<droplet>
```

## Install NodeJS using `nvm`

1. Download installation script (change version as needed)
```bash
$ curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh
```

2. Run the installation script
```bash
$ bash install_nvm.sh
```

3. Activate `.profile` changes
```bash
$ source ~/.profile
```

4. Install NodeJS (change version as needed)
```bash
$ nvm install 8.12.0
```

## Run NodeJS service using `systemd`

1. Create `/etc/systemd/system/<servicename>.service`
```ini
[Unit]
Description=<service description>

[Service]
ExecStart=<path-to-node> <path-to-express-app>/bin/www
WorkingDirectory=<path-to-express-app>
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=<servicename>
User=<username>
Group=<username>
Environment=NODE_ENV=production PORT=1337

[Install]
WantedBy=multi-user.target
```

2. Enable the service
```bash
$ sudo systemctl enable <servicename>
```

3. Start the service
```bash
$ sudo systemctl start <servicename>
```

4. Verify that the service is running
```bash
$ systemctl status <servicename>
```

To reload `.service` files after changes
```bash
$ sudo systemctl daemon-reload
```

To restart the service:
```bash
$ sudo systemctl restart <servicename>
```

## Nginx

1. Install
```bash
$ sudo apt update
$ sudo apt install nginx
```

2. Adjust the firewall
```bash
$ sudo ufw app list
$ sudo ufw allow 'Nginx Full'
$ sudo ufw status
```

3. Check the web server
```bash
$ systemctl status nginx
```

4. Create server blocks (`/etc/nginx/sites-available/<website>`)
```nginx
server {
  listen 80;
  listen 443 ssl http2;

  server_name <domain>;

  return 301 https://www.<domain>$request_uri;
}

# prod server block
server {
  listen 80;
  listen 443 ssl http2;

  server_name www.<domain>;

  root <path-to-express-app>;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location /robots.txt {
    alias <path-to-express-app>/robots_allow_all.txt;
  }
}

# staging server block
server {
  listen 80;
  listen 443 ssl http2;

  server_name staging.<domain>;

  root <path-to-express-app>;

  location / {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location /robots.txt {
    alias <path-to-express-app>/robots_deny_all.txt;
  }
}
```

5. Enable the config file
```bash
$ sudo ln -s /etc/nginx/sites-available/<domain> /etc/nginx/sites-enabled/
```

6. Restart Nginx
```bash
$ sudo systemctl restart nginx
```

## Set up SSL certificates

1. Install Certbot
```bash
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt install python-certbot-nginx
```

2. Obtain the certificate

    Before continuing make sure that DNS A records point to the droplet.
    ```bash
    $ sudo certbot --nginx -d <domain> -d www.<domain> -d staging.<domain>
    ```
