import express from "express";
import apicontroller from "../controller/apicontroller"

let router = express.Router();
const initapi = (app) => {
  router.post('/DangKy', apicontroller.SignIn);
  router.post('/login', apicontroller.loginuser);
  router.post('/ViewHome', apicontroller.ViewHome);
  router.post('/CreateTransport', apicontroller.CreateTransport);
  router.get('/ViewTransport', apicontroller.ViewTransport);
  router.post('/Booking', apicontroller.Booking);
  router.post('/ViewBooking', apicontroller.ViewBooking);
  router.post('/CreateTour', apicontroller.CreateTour);
  router.post('/CreateRecommend', apicontroller.CreateRecommend);
  router.post('/ViewUser', apicontroller.ViewUser);
  router.post('/ViewTour', apicontroller.ViewTour);
  router.post('/FindTourById', apicontroller.FindTourById);
  router.post('/FindTourByNamelocal', apicontroller.FindTourByNamelocal);
  ///
  return app.use('/api/v1/', router)
}


export default initapi;
//module.export = initWebRoute;
