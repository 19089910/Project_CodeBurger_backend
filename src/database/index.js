import Sequelize from 'sequelize'
import configDatabase from '../config/database'
import mongoose from 'mongoose'

import User from '../app/models/User'
import Product from '../app/models/Product'
import Category from '../app/models/Category'
const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.conection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.conection))
      .map((model) => model.associate && model.associate(this.conection.models))
  }

  mongo() {
    this.mongoConntion = mongoose.connect(
      'mongodb://mongo:chgFupPITnUzUArPaUuarDQoYHPOtdcW@switchyard.proxy.rlwy.net:29979/?connectTimeoutMS=30000&socketTimeoutMS=45000',
      // 'mongodb://localhost:27017/codeburger',
    )
  }
}

export default new Database()
