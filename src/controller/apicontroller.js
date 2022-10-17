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
  if (getInfo.email == null) {
    return res.status(500).json({
      message: 'Thieu Du Lieu Email De Dang Ky!!'
    })
  }
  if (getInfo.password == null) {
    return res.status(500).json({
      message: 'Quen Nhap Password!!'
    })
  }
  if (getInfo.address == null) {
    return res.status(500).json({
      message: 'Can Nhap Dia Chi!!'
    })
  }
  if (getInfo.gender == null) {
    return res.status(500).json({
      message: 'Chua Chon Gioi Tinh!!'
    })
  }
  if (getInfo.sdt == null) {
    return res.status(500).json({
      message: 'Can Nhap SDT!!'
    })
  }
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(getInfo.password, salt);
  let checkMail = await db.User.findOne({
    where: { email: getInfo.email }
  })
  if (checkMail != null || checkMail != "" || checkMail != undefined) {
    return res.status(500).json({
      message: 'Email Da Ton Tai!!'
    })
  }
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
  // console.log(create);
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
////////////Booking
let Booking = async (req, res) => {
  let getInfo = req.body;
  if (getInfo.idUser == null || getInfo.idUser == "" || getInfo.idUser == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri idUser De Booking!!'
    })
  }
  if (getInfo.Adult == null || getInfo.Adult == "" || getInfo.Adult == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri Adult De Booking!!'
    })
  }
  if (getInfo.Children == null || getInfo.Children == "" || getInfo.Children == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri Children De Booking!!'
    })
  }
  if (getInfo.idTourInfo == null || getInfo.idTourInfo == "" || getInfo.idTourInfo == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri idTourInfo De Booking!!'
    })
  }
  //checkIduser
  let checkIdUser = await db.User.findOne({
    where: { id: getInfo.idUser }
  });
  if (checkIdUser == null || checkIdUser == "" || checkIdUser == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Khong ton tai id user nay de tham gia tour!!'
    })
  }
  //checkTourinfo
  let checkIdTourInfo = await db.TourInfo.findOne({
    where: { id: getInfo.idTourInfo }
  });
  if (checkIdTourInfo == null || checkIdTourInfo == "" || checkIdTourInfo == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Khong ton tai id tour nay de tham gia!!'
    })
  }

  let getInfoBookingg = await ServiceApiService.BookingInfo(getInfo)
  return res.status(200).json({
    message: 'Check view Booking!!',
    errCode: getInfoBookingg.errCode,
    messageInfo: getInfoBookingg.errMessage,
    Info: getInfoBookingg
  })
}

/////////Create 1 tour
let CreateTour = async (req, res) => {
  let getInfo = req.body;
  if (getInfo.TotalTime == null || getInfo.TotalTime == "" || getInfo.TotalTime == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri TotalTime De Tao!!'
    })
  }
  if (getInfo.date == null || getInfo.date == "" || getInfo.date == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri date De Tao!!'
    })
  }
  if (getInfo.Time == null || getInfo.Time == "" || getInfo.Time == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri Time De Tao!!'
    })
  }
  if (getInfo.idTypesOfTransport == null || getInfo.idTypesOfTransport == "" || getInfo.idTypesOfTransport == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri idTypesOfTransport De Tao!!'
    })
  }
  if (getInfo.idRecommend == null || getInfo.idRecommend == "" || getInfo.idRecommend == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri idRecommend De Tao!!'
    })
  }
  if (getInfo.Price == null || getInfo.Price == "" || getInfo.Price == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri Price De Tao!!'
    })
  }
  //check id transport
  let checkIdTrans = await db.TypeOfTransport.findOne({
    where: { id: getInfo.idTypesOfTransport }
  });
  if (checkIdTrans == null || checkIdTrans == "" || checkIdTrans == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Khong ton tai id transport nay de them vao tour!!'
    })
  }
  //check id recommend
  let checkRecommend = await db.Recommend.findOne({
    where: { id: getInfo.idRecommend }
  });
  if (checkRecommend == null || checkRecommend == "" || checkRecommend == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Khong ton tai id recommend nay de them vao info tour!!'
    })
  }
  let getTour = await ServiceApiService.OneTour(getInfo)
  return res.status(200).json({
    errCode: getTour.errCode,
    message: getTour.errMessage,
  })
}


/////////Create 1 CreateRecommend
let CreateRecommend = async (req, res) => {
  let getInfo = req.body;
  if (getInfo.NameDiaDiem == null || getInfo.NameDiaDiem == "" || getInfo.NameDiaDiem == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri NameDiaDiem De Tao!!'
    })
  }
  if (getInfo.LocalDiaDiem == null || getInfo.LocalDiaDiem == "" || getInfo.LocalDiaDiem == undefined) {
    return res.status(500).json({
      errCode: 1,
      message: 'Chua Truyen Gia Tri LocalDiaDiem De Tao!!'
    })
  }
  let getRecommend = await ServiceApiService.OneRecommend(getInfo)
  return res.status(200).json({
    errCode: getRecommend.errCode,
    message: getRecommend.errMessage,
  })
}
module.exports = {
  SignIn, loginuser, ViewHome, CreateTransport, ViewTransport, Booking, CreateTour, CreateRecommend
}