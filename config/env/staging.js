module.exports = {
    port: 5000,
    domain: 'http://localhost',
    db: 'mongodb://localhost/sss',
    sessionSecret: require('../../../../../struct_keys/sessionSecret.js'),
    google_key: require('../../../../../struct_keys/googleAPI.js')
};
