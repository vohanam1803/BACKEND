import { request } from 'express';
import pool from '../configs/ConnectDB';
import multer from 'multer';

var crypto = require('crypto-js');


import db from '../models/index';
import ServiceCreateUser from '../services/createUser';

///////////////////Thu Vien//////////////////////
//View Trang Chu
let gethome = async (req, res) => {
  try {
    let data = await db.User.findAll();
    // console.log(data)
    return res.render('home.ejs', { dataUser: data });
  }
  catch (e) {
    console.log(e)
  }
}
//Tao Tai Khoan
let Save = async (req, res) => {
  let getcreateUser = await ServiceCreateUser.createUser(req.body);
  console.log(getcreateUser)
  let data = await db.User.findAll();
  return res.render('home.ejs', { dataUser: data });
}

//Tim Tai Khoan
let getEdituser = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await ServiceCreateUser.getUserById(userId);
    return res.render('update.ejs', { dataUser: userData });
  }
  else {
    return res.render('404.ejs');
  }
}

//Tim Tai Khoan
let getUpdateuser = async (req, res) => {
  let data = req.body;
  let all = await ServiceCreateUser.getUpdateUserById(data);
  return res.render('home.ejs', { dataUser: all });
}


//Xoa Tai Khoan
let getDeleteuser = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await ServiceCreateUser.getDeleteUserById(id);
    return res.send('Delete Success!!');
  }
  return res.render('404.ejs');
}


// //Up 1 file

// let UpLoadFile = async (req, res) => {
//   // console.log(req.file)

//   // req.file contains information of uploaded file
//   // req.body contains information of text fields, if there were any

//   if (req.fileValidationError) {
//     return res.send(req.fileValidationError);
//   }
//   else if (!req.file) {
//     return res.send('Please select an image to upload');
//   }


//   // Display uploaded image for user validation
//   return res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/UpFile">Upload another image</a>`);

// }


// //up nhiu file
// let UpMultiFile = async (req, res) => {


//   if (req.fileValidationError) {
//     return res.send(req.fileValidationError);
//   }
//   else if (!req.files) {
//     return res.send('Please select an image to upload');
//   }


//   let result = "You have uploaded these images: <hr />";
//   const files = req.files;
//   let index, len;

//   // Loop through all the uploaded images and display them on frontend
//   for (index = 0, len = files.length; index < len; ++index) {
//     result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
//   }
//   result += '<hr/><a href="/UpFile">Upload more images</a>';
//   res.send(result);

// }


///Cho ra moi truong ngoai su dung
module.exports = {
  gethome, Save, getEdituser, getUpdateuser, getDeleteuser
}