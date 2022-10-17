const { resolve } = require('app-root-path');
var crypto = require('crypto-js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
import db from '../models/index';
//////////////Thu Vien//////////////////
let createUser = async (data) => {
  return new Promise(async (resolve, rejct) => {
    try {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(data.password, salt);
      await db.User.create({
        firstName: data.firstName,
        password: hash,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
        gender: data.gender === '1' ? true : false,
        roleId: data.role,
        SDT: data.sdt
      })
      resolve('Create Success!!')
    }
    catch (e) {
      rejct(e)
    }
  })
}


let getUserById = async (userId) => {
  return new Promise(async (resolve, rejct) => {
    try {
      let User = await db.User.findOne({
        where: { id: userId },
        raw: true,
      })
      if (User) {
        resolve(User)
      }
      else {
        resolve({})
      }
    }
    catch (e) {
      rejct(e)
    }
  })
}


let getUpdateUserById = async (data) => {
  return new Promise(async (resolve, rejct) => {
    try {

      let User = await db.User.findOne({
        where: { id: data.id }
      })
      if (User) {
        User.email = data.email;
        User.firstName = data.firstName;
        User.lastName = data.lastName;
        await User.save();

        let All = await db.User.findAll();
        resolve(All)
      }
      else {
        resolve()
      }

    }
    catch (e) {
      rejct(e)
    }
  })
}

let getDeleteUserById = async (id) => {
  return new Promise(async (resolve, rejct) => {
    try {

      let User = await db.User.findOne({
        where: { id: id }
      })
      if (User) {
        User.destroy();
      }
      resolve()
    }
    catch (e) {
      rejct(e)
    }
  })
}
///Cho ra moi truong ngoai su dung
module.exports = {
  createUser, getUserById, getUpdateUserById, getDeleteUserById
}