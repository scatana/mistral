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
$ sudo systemctl status <servicename>
```

To restart the service:
```bash
$ sudo systemctl restart <servicename>
```
