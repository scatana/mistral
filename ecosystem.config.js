module.exports = {
  apps : [
    {
      name: 'mistral-dev',
      script: './bin/www',
      instances: 1,
      autorestart: true,
      watch: true,
      ignore_watch: "node_modules",
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'development'
      }
    },
    {
      name: 'mistral-prod',
      script: './bin/www',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy : {}
};
