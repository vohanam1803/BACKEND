import express from 'express';
const view = (app) => {
  app.use(express.static('./src/public')) //Code Dc Public

  app.set("view engine", "ejs");
  app.set("views", "./src/views");
}
export default view;