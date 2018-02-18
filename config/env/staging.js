module.exports = {
    port: 5000,
    domain: 'http://localhost',
    db: 'mongodb://localhost/sss',
    webmaster: require('../../../../struct_keys/webmaster.js'),
    sessionSecret: require('../../../../struct_keys/sessionSecret.js'),
    google_key: require('../../../../struct_keys/googleAPI.js')
};
