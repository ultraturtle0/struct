module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'struct',
      script    : 'server.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_development : {
        NODE_ENV: 'development'
      },
      env_production : {
        NODE_ENV: 'production'
      },
      env_staging : {
        NODE_ENV: 'staging'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    staging : {
      user : 'deploy',
      host : '138.197.20.29',
      ref  : 'origin/master',
      repo : 'http://github.com/ultraturtle0/struct.git',
      path : '/var/www/structdev',
      'post-setup' : '\
        npm install; \
        NODE_ENV=staging node setup',
      'post-deploy' : '\
        mongod; \
        pm2 startOrRestart ecosystem.config.js --env staging',
      env  : {
        NODE_ENV: 'staging'
      }
    },
    dev : {
      user : 'deploy',
      host : '138.197.20.29',
      ref  : 'origin/master',
      repo : 'http://github.com/ultraturtle0/struct.git',
      path : '/var/www/structdev',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env development',
      env  : {
        NODE_ENV: 'development'
      }
    }

  }
};
