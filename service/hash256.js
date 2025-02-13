const crypto = require('crypto');
module.exports = (password, salt) =>{
    const hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    return hashedPassword;
}