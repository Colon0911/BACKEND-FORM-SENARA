import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import config from './src/config/config.js'
// import corsOptions from './src/utils/corsOptions.js'
import userRoutes from './src/routes/user.routes.js'

//Creating Server
const app = express()

//Body Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

//Enable Cors
app.use(cors())
// app.use(cors(corsOptions))

//APP Routes
app.use(userRoutes)

//Set dotenv PORT|HOST or default values
app.set('host', config.HOST || '0.0.0.0')
app.set('port', config.PORT || 4000)

export default app