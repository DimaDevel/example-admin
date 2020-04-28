const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const { User } =  require('./../models/User');

AdminBro.registerAdapter(AdminBroMongoose);

const options = {
    resources: [User],
};

module.exports = options;
