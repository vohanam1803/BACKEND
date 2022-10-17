import express from "express";
import homecontroller from "../controller/homecontroller"
import apicontroller from "../controller/apicontroller"

var appRoot = require('app-root-path');
let router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {

//     cb(null, appRoot, '/src/public/images/');
//   },

//   // By default, multer removes file extensions so let's add them back
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const imageFilter = function (req, file, cb) {
//   // Accept images only
//   if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//     req.fileValidationError = 'Only image files are allowed!';
//     return cb(new Error('Only image files are allowed!'), false);
//   }
//   cb(null, true);
// };

// let upload = multer({ storage: storage, fileFilter: imageFilter });

// let uploadMultipleFiles = multer({ storage: storage, fileFilter: imageFilter }).array('multi_pic', 3);


const initWebRoute = (app) => {
  router.get('/', homecontroller.gethome);
  router.post('/Save', homecontroller.Save);
  router.get('/Edit-User', homecontroller.getEdituser);
  router.post('/Update-user', homecontroller.getUpdateuser);
  router.get('/Delete-User', homecontroller.getDeleteuser);

  // router.post('/api/login', apicontroller.loginuser);
  // router.get('/Detail/user/:id', homecontroller.getDetail);

  // router.post('/Xoa', homecontroller.DeleteUser);
  // router.post('/Login', homecontroller.Login);
  // router.post('/Edit/:id', homecontroller.Edit);
  // router.post('/update', homecontroller.Update);
  // router.get('/UpFile', homecontroller.UpFile);
  // router.post('/upload-profile-pic', upload.single('profile_pic'), homecontroller.UpLoadFile);
  // router.post('/upload-multi-pic', (req, res, next) => {
  //   uploadMultipleFiles(req, res, (err) => {
  //     if (err instanceof multer.MulterError && err.code === "LIMIT_UNEXPECTED_FILE") {
  //       // handle multer file limit error here
  //       res.send('LIMIT_UNEXPECTED_FILE')
  //     } else if (err) {
  //       res.send(err)
  //     }

  //     else {
  //       // make sure to call next() if all was well
  //       next();
  //     }
  //   })
  // }, homecontroller.UpMultiFile);

  return app.use('/', router)
}


export default initWebRoute;
//module.export = initWebRoute;