import ServiceApiService from '../services/apiService';
const { resolve } = require('app-root-path');
var crypto = require('crypto-js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
import db from '../models/index';
//////////////////Thu Vien//////////////////////
///Dang ky
let SignIn = async (req, res) => {
  let getInfo = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(getInfo.password, salt);
  let create = await db.User.create({
    firstName: getInfo.firstName,
    password: hash,
    lastName: getInfo.lastName,
    email: getInfo.email,
    address: getInfo.address,
    gender: getInfo.gender === '1' ? true : false,
    roleId: getInfo.role,
    SDT: getInfo.sdt
  })
  console.log(create);
  return res.status(200).json({
    message: 'Dang Ky Thanh Cong!!'
  })
}
///Login
let loginuser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let body = req.body;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri!!'
    })
  }

  let userData = await ServiceApiService.UserLogin(email, password, body)
  return res.status(200).json({
    // errCode: 0,
    // message: 'Ok!!',
    // yourEmail: email,
    // yourPassword: password
    errCode: userData.errCode,
    message: userData.errMessage,
    Token: userData.token,
    user: userData.user ? userData.user : { 'message': 'Khong ton tai user nay!!!' }

  })
}
///View trang chu
let ViewHome = async (req, res) => {
  let View = await ServiceApiService.ViewTrangChu()
  return res.status(200).json({
    message: 'Check view Home!!',
    Alltributes: View
  })
}
///Tao Transport
let CreateTransport = async (req, res) => {
  let name = req.body.NameTransport;
  if (!name) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri TransPort!!'
    })
  }
  let getTransPort = await ServiceApiService.TransPort(name)
  return res.status(200).json({
    errCode: getTransPort.errCode,
    message: getTransPort.errMessage,
  })
}
//View Transport
let ViewTransport = async (req, res) => {
  let View = await db.TypeOfTransport.findAll();
  return res.status(200).json({
    message: 'Check view TransPort!!',
    TypeTransport: View
  })
}
//Booking
let Booking = async (req, res) => {
  let View = await db.TypeOfTransport.findAll();
  return res.status(200).json({
    message: 'Check view TransPort!!',
    TypeTransport: View
  })
}
module.exports = {
  SignIn, loginuser, ViewHome, CreateTransport, ViewTransport, Booking
}