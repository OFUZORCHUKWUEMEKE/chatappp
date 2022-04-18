const express = require('express')
const app = express()
const chats = require('./data')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const connectDb = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dotenv.config()

connectDb()


app.use(cors)

app.use(express.json())

app.use('/api/users',userRoutes)

app.get('/api/chats',async(req,res)=>{
    res.send(chats)
})
app.use(notFound)
app.use(errorHandler)


app.listen(process.env.PORT,()=>console.log(`app running on ${process.env.PORT}`))