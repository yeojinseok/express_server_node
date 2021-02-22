'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//모델정보를 읽어온다.
db.User = require('./user')(sequelize, Sequelize);
db.Server = require('./server')(sequelize, Sequelize);

//모델간의 관계를 정의한다.
db.Server.hasMany(db.User, { foreignKey: 'commenter', sourceKey: 'id' });
db.User.belongsTo(db.Server, { foreignKey: 'commenter', targetKey: 'id' });

module.exports = db;