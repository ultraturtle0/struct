module.exports = {
    port: 5000,
    domain: 'http://localhost',
    db: 'mongodb://localhost/sss',
    sessionSecret: require('./sessionSecret.js'),
    google_key: require('./googleAPI.js'),
    webmaster: require('../webmaster.js')
};
