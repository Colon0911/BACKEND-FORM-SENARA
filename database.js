import mongoose from 'mongoose'
import config from './src/config/config.js'

//Enable MongoDB Connection
mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))