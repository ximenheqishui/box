const crypto = require("crypto")

let createToken = function (str) {
    let secret = str + new Date().getTime();
    let token = crypto.createHmac('sha256', secret).update("I am lily").digest('hex');
    return token
}

let createPass = function (str) {
    let password = crypto.createHmac('sha256', str).update("I am lucy").digest('hex');
    return password
}

module.exports = {
    createToken,
    createPass
}
