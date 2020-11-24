const UserService = require('../services/user.service');
module.exports.registerUser = async function (req,res) {
    return await UserService.registerUser(req,res)
}

module.exports.loginUser = async function (req,res) {
    return await UserService.loginUser(req,res)
}