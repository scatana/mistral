module.exports = {
  apps : [
    {
      name: 'mistral-dev',
      script: './bin/www',
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
};
