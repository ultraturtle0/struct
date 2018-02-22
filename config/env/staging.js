var domain = process.env.ip;

module.exports = {
    port: 5001,
    domain: 'http://' + domain,
    db: 'mongodb://' + domain + '/sss',
    sessionSecret: require('../../../../struct_keys/sessionSecret.js'),
    google_key: require('../../../../struct_keys/googleAPI.js')
};
