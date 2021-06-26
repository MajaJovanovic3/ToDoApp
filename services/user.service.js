const UserRepository = require('../repositories/user.repository');

module.exports.registerUser = async function (req,res) {
    res.send(await UserRepository.registerUser(req.body.username, req.body.email, req.body.password))
}
module.exports.loginUser = async function (req,res) {
    res.send(await UserRepository.loginUser(req.body.username, req.body.password,res))
}
module.exports.changePasswordUser = async function (req,res) {
    res.send(await UserRepository.changePasswordUser(req.body.password, req.user,res))
}