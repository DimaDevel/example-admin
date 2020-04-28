const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: AdminBro } = require('admin-bro');
const formidableMiddleware = require('express-formidable');
const User = require('./models/User');
const options = require('./admin-bro/admin-bro-option');
const buildAdminRouter = require('./admin-bro/admin-bro-router');
const connect = require('./db/db');

const asyncHandler = require('express-async-handler');

const app = express();
const port = 3000;

const run = async () => {
  // app.use(formidableMiddleware());

  // middleware init
  // app.use(cors());
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));

  // init start page
  app.get(
    '/',
    asyncHandler(async (req, res) => res.json('Welcome to test API!'))
  );

 

  await connect();

  const admin = new AdminBro(options);
  const router = buildAdminRouter(admin);
  app.use(admin.options.rootPath, router);

   // throw error if path not found
   app.use(
    asyncHandler(async (req, res) => {
      res.status(404).json({
        message: `Cannot ${req.method} ${req.path}`
      });
    })
  ); 
  app.listen(port, () => {
    console.log(`Started on port ${port}`);
  });
};

module.exports = run;
