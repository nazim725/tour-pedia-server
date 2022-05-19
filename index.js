import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import userRouter from './routes/user.js'
import tourRouter from './routes/tour.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
const port = process.env.PORT || 5000

// middleware
app.use(morgan('dev')) // http request console e dekai
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// singup operation start-----
app.use('/users', userRouter) //http://localhost:5000/users/signup ei vhabe hbe
// singup operation end-----

// tour operation start----
app.use('/tour', tourRouter)
// tour operation end----

// --------------------------------start

app.get('/', (req, res) => {
  res.send('Running Tour Pedia server')
})
// connecting mongodb
const MONGODB_URL = process.env.MONGODB_URL
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log('Server Running on Port: ', port))
  })
  .catch((error) => console.log(`${error} did not connected`))
// -----------------------------------end
