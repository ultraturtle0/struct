module.exports = {
    port: 5000,
    domain: 'http://localhost',
    db: 'mongodb://localhost/sss',
    webmaster: require('./sessionSecret.js'),
    sessionSecret: require('./sessionSecret.js'),
    google_key: require('./googleAPI.js')
};
