const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');
const formidableMiddleware = require('express-formidable');
const User = require('./models/User');

const asyncHandler = require('express-async-handler');

const app = express();

// Admin Bro init
AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  resources: [User],
  rootPath: '/admin',
  branding: {
    companyName: 'Company',
  }
});

const routerAdminBro = AdminBroExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, routerAdminBro);
app.use(formidableMiddleware());

// middleware init
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init start page
app.get(
  '/',
  asyncHandler(async (req, res) => res.json('Welcome to test API!'))
);

// throw error if path not found
app.use(
  asyncHandler(async (req, res) => {
    res.status(404).json({
      message: `Cannot ${req.method} ${req.path}`
    });
  })
);

module.exports = { app };
