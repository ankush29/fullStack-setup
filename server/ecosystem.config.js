module.exports = {
  apps: [{
    name: 'fullStack-setup',
    script: './server/index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-188-99-73.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/ankush92.pem',
      ref: 'origin/master',
      repo: 'git@github.com:ankush29/fullStack-setup.git',
      path: '/home/ubuntu/fullStack-setup',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
