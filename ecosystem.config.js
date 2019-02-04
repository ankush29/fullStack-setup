module.exports = {
  apps: [{
    name: 'fullStack-setup',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-222-201-40.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/ankush92.pem',
      ref: 'origin/master',
      repo: 'git@github.com:ankush29/fullStack-setup.git',
      path: '/home/ubuntu/fullStack-setup',
      'post-deploy': 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
