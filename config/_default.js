module.exports = {
  voltare: {
    login: {
      type: 'bot',
      token: 'XXXXXXXXXXXXXXXXXXXX'
    },
    revoltOptions: {},
    elevated: ['ABC123'],

    prefix: ['📸', 'pbox', ':camera:'],
    mentionPrefix: true,

    logger: {
      level: 'info'
    },

    media: {
      lookBackLimit: 25
    },

    imgsrv: {
      url: 'http://localhost:5000',
      key: 'SomePasswordOnIMGSRV',
      interval: 1000 * 60,
      cacheTimeout: 1000 * 60 * 60,
      limit: 100
    }
  },

  commandsPath: './commands',

  api: {
    weebsh: '',
    giphy: '',
    owo_key: '',
    twitter: {
      consumer: '',
      secret: ''
    }
  }
};
