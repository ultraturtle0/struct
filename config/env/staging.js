var domain = '138.197.20.29' //process.env.ip;

module.exports = {
    port: 5001,
    domain: 'http://' + domain,
    db: 'mongodb://' + domain + '/sss',
    sessionSecret: require('../../../../struct_keys/sessionSecret.js'),
    google_key: require('../../../../struct_keys/googleAPI.js'),
    webmaster: require('../../../../struct_keys/webmaster.js')
};
