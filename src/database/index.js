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
  }

  init() {
    this.conection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.conection))
      .map((model) => model.associate && model.associate(this.conection.models))
  }

  mongo() {
    this.mongoConntion = mongoose.connect(
      'mongodb://localhost:27017/codeburger',
      {
        userNewUrlParser: true,
        userUnifiedTopoLogy: true,
      },
    )
  }
}

export default new Database()
