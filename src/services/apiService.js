import db from '../models/index';
var crypto = require('crypto-js');
import bcrypt from "bcrypt";
const jwt = require('jsonwebtoken')

//////Thu vien//////
//////////////////Login
let UserLogin = (email, password, body) => {
  return new Promise(async (resolve, rejct) => {
    try {
      let userData = {};
      let check = await checkMail(email)
      if (check) {
        let user = await db.User.findOne({
          attributes: ['email', 'roleId', 'password', 'firstname', 'lastname', 'gender', 'address', 'SDT'],
          where: { email: email },
          raw: true
        })
        if (user) {
          //Check lai pass
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            //Update token cho database
            let User = await db.User.findOne({
              where: { email: email }
            })
            let token = await Token(body);
            console.log(token)
            User.token = token;
            let update = await User.save();
            //Dua du lieu
            userData.errCode = 0;
            userData.errMessage = 'Login Success!'
            userData.token = User.token;
            delete user.password;
            userData.user = user;
          }
          else {
            userData.errCode = 3;
            userData.errMessage = 'Sai Password!'
          }
        }
        else {
          userData.errCode = 2;
          userData.errMessage = 'Khong co email nay!!'
        }
      }
      else {
        userData.errCode = 1;
        userData.errMessage = 'Khong co email nay!!'
      }
      resolve(userData)
    }
    catch (e) {
      rejct(e)
    }
  })
}

//////////////////Check email
let checkMail = (email) => {
  return new Promise(async (resolve, rejct) => {
    try {
      let User = await db.User.findOne({
        where: { email: email }
      })
      if (User) {
        resolve(true)
      }
      else {
        resolve(false)
      }
    }
    catch (e) {
      rejct(e)
    }
  })
}

//////////////////Check password
let checkPass = () => {
  return new Promise(async (resolve, rejct) => {
    try {

      if (User) {
        resolve(true)
      }
      else {
        resolve(false)
      }
    }
    catch (e) {
      rejct(e)
    }
  })
}
//////////////////View Home
let ViewTrangChu = () => {
  return new Promise(async (resolve, rejct) => {
    let data = await db.ViewTrangChu.findAll();
    resolve(data)
  })
}
//////////////////Get token
let Token = (body) => {
  return new Promise(async (resolve, rejct) => {
    const token = jwt.sign(body, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
    resolve(token)
  })
}
//////////////////Check Them Transport
let TransPort = (name) => {
  return new Promise(async (resolve, rejct) => {
    try {
      let userData = {};
      let check = await checkNameTransPort(name)
      if (check == true) {
        userData.errCode = 1;
        userData.errMessage = 'Da Ton Tai TransPort Nay!!!'
      }
      else {
        let User = await db.TypeOfTransport.create({
          imageTransport: name
        })
        userData.errCode = 0;
        userData.errMessage = 'Add Succerss!!!'
      }
      resolve(userData)
    }
    catch (e) {
      rejct(e)
    }
  })
}
//////////////////Check checkNameTransPort
let checkNameTransPort = (name) => {
  return new Promise(async (resolve, rejct) => {
    try {
      let NameTransPort = await db.TypeOfTransport.findOne({
        where: { imageTransport: name }
      })
      if (NameTransPort) {
        resolve(true)
      }
      else {
        resolve(false)
      }
    }
    catch (e) {
      rejct(e)
    }
  })
}
//////////////////Booking
let BookingInfo = (getInfo) => {
  return new Promise(async (resolve, rejct) => {
    try {
      let bookingData = {};

      let User = await db.Booking.create({
        idUser: getInfo.idUser,
        Adult: getInfo.Adult,
        Children: getInfo.Children,
        Status: getInfo.Status,
        idTourInfo: getInfo.idTourInfo
      })
      bookingData.errCode = 0;
      bookingData.errMessage = 'Booking Success!!!'

      resolve(bookingData)
    }
    catch (e) {
      rejct(e)
    }
  })
}
//////////////////Create OneTour
let OneTour = (getInfo) => {
  return new Promise(async (resolve, rejct) => {
    try {
      let tourData = {};
      let AllTour = await db.TourInfo.findOne({
        where: { idRecommend: getInfo.idRecommend }
      })
      // console.log(AllTour)
      let Date = await db.TourInfo.findOne({
        where: { date: getInfo.date }
      })
      let Total = await db.TourInfo.findOne({
        where: { TotalTime: getInfo.TotalTime }
      })
      // console.log(Date)
      if (AllTour != null && Date != null && Total != null) {
        tourData.errCode = 1;
        tourData.errMessage = 'Da ton tai truong nay khong the tao!!!'
      }
      else {
        let data = await db.TourInfo.create({
          TotalTime: getInfo.TotalTime,
          date: getInfo.date,
          Time: getInfo.Time,
          Description: getInfo.Description,
          idTypesOfTransport: getInfo.idTypesOfTransport,
          idRecommend: getInfo.idRecommend,
          Price: getInfo.Price
        })
        tourData.errCode = 0;
        tourData.errMessage = 'Create Tour Success!!!'
      }
      //
      resolve(tourData)
    }
    catch (e) {
      rejct(e)
    }
  })
}

//////////////////Create OneRecommend
let OneRecommend = (getInfo) => {
  return new Promise(async (resolve, rejct) => {
    try {
      let RData = {};
      //
      let data = await db.Recommend.create({
        NameDiaDiem: getInfo.NameDiaDiem,
        LocalDiaDiem: getInfo.LocalDiaDiem,
      })
      RData.errCode = 0;
      RData.errMessage = 'Create Recomend Success!!!'

      resolve(RData)
    }
    catch (e) {
      rejct(e)
    }
  })
}
//////////////////ViewBooking
let ViewBooking = (getInfo) => {
  return new Promise(async (resolve, rejct) => {
    try {
      let RData = {};
      if (!getInfo.id) {
        resolve({
          errCode: 1,
          errMessage: 'Chua Truyen Id De tim thong tin booking!!!'
        })
      }
      else {
        let RData = {};
        let data = await db.Booking.findOne({
          attributes: ['id', 'Adult', 'Children', 'Status'],
          where: { id: getInfo.id },
          include: [
            { model: db.User, attributes: ['id', 'firstName', 'lastName', 'SDT'] },
            { model: db.TourInfo }

            // { model: db.TourInfo, attributes: ['id', 'TotalTime', 'date', 'Time', 'Description', 'Price'] },
            // { model: db.TypeOfTransport, attributes: ['id', 'imageTransport'] },
            // { model: db.Recommend, attributes: ['id', 'NameDiaDiem', 'LocalDiaDiem'] }
          ],
          raw: true,
          nest: true
        })
        RData.errCode = 0;
        RData.errMessage = data
        resolve(RData)
      }
    }
    catch (e) {
      rejct(e)
    }
  })
}
//////////////////View User
let ViewUser = (getInfo) => {
  return new Promise(async (resolve, rejct) => {
    // try {
    //   let RData = {};
    //   if (getInfo.id == null || getInfo.id == "" || getInfo.id == undefined) {
    //     resolve({
    //       errCode: 1,
    //       errMessage: 'Chua Truyen Id de tim user!!!'
    //     })
    //   }
    //   else {
    //     let RData = {};
    //     let data = await db.User.findOne({
    //       attributes: ['id', 'firstName', 'lastName', 'email', 'address', 'SDT'],
    //       where: { id: getInfo.id },
    //       include: [
    //         { model: db.Role, attributes: ['roleName'] },
    //       ],
    //       raw: true,
    //       nest: true
    //     })
    //     RData.errCode = 0;
    //     RData.errMessage = data
    //     resolve(RData)
    //   }
    // }
    // catch (e) {
    //   rejct(e)
    // }

    let RData = {};
    let data = await db.User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'address', 'SDT'],
      // where: { id: getInfo.id },
      include: [
        { model: db.Role, attributes: ['roleName'] },
      ],
      raw: true,
      nest: true
    })
    RData.errCode = 0;
    RData.errMessage = data
    resolve(RData)
  })
}
//////////////////View Tour
let ViewTour = () => {
  return new Promise(async (resolve, rejct) => {
    let RData = {};
    let data = await db.TourInfo.findAll({
      attributes: ['id', 'TotalTime', 'date', 'Time', 'Description', 'Price'],
      // where: { id: id },
      include: [
        { model: db.TypeOfTransport, attributes: ['imageTransport'] },
        { model: db.Recommend, attributes: ['NameDiaDiem', 'LocalDiaDiem'] }
      ],
      raw: true,
      nest: true
    })
    RData.errCode = 0;
    RData.errMessage = data
    resolve(RData)
  })
}
module.exports = {
  UserLogin, checkMail, checkPass, ViewTrangChu, Token, TransPort, BookingInfo, OneTour, OneRecommend, ViewUser,
  ViewTour, ViewBooking
}