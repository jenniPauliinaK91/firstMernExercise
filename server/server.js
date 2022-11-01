const dotenv =require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRoutes')
const raceRouter = require('./routes/raceRoutes')




const port = process.env.PORT || 5001


const app =express()
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, 
    credentials: true
  }

  mongoose.Promise = global.Promise
  mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
  })

  app.use(cors(corsOptions))
  app.use(express.json())

  app.use('/api',userRouter)
  app.use('/race',raceRouter)
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})