const bcrypt = require("bcrypt");

module.exports = {
    encrypt: (password)=>{
        const salt = bcrypt.genSaltSync(8);
        return bcrypt.hashSync(password, salt);
    },
    compare: (password, hash)=>{
        return bcrypt.compareSync(password, hash)
    }
}