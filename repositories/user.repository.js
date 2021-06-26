const User = require("../models/user.models");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 10;
module.exports.registerUser = async function(username, email, password) {
  try {
    let hashPassword = await bcrypt.hash(password, saltRounds);
    await User.findOneAndUpdate(
      { username: username, email: email, password: hashPassword },
      { new: true },
      { upsert: true }
    ).exec();
    return {
      message: "Uspesno ste se registrovali",
      isRegistered: true
    };
  } catch (error) {
    return {
      message: "Korisnik sa tim username/email je vec ulogovan",
      isRegistered: false
    };
    console.log(error);
  }
};
module.exports.loginUser = async function(username, password, res) {
  try {
    let user = await User.findOne({ username: username }).exec();
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      });
      return {
        message: "Uspesno ste se ulogovali",
        isLogged: true,
        token,
        user: user
      };
    } else
      return {
        message: "Niste uneli odgovarajuce parametre",
        isLogged: false
      };
  } catch (error) {
    return {
      message: "Niste uneli dobre parametre",
      isLogged: false
    };
    console.log(error);
  }
};
module.exports.changePasswordUser = async function(password, user, res) {
  try {
    let hashPassword = await bcrypt.hash(password, saltRounds);
    let userChange = await User.findOneAndUpdate({ _id: user._id },{password:hashPassword}).exec();
      return {
        message: "Password has been successfully changed!",
        isChanged: true
      };
  } catch (error) {
    return {
      message: "An error occured!",
      isChanged: false
    };
    console.log(error);
  }
};
