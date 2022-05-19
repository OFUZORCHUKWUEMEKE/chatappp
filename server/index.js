const express = require('express')
const app = express()
const chats = require('./data')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const connectDb = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

app.use(cors())

dotenv.config()

connectDb()




app.use(express.json())

app.use('/api/users',userRoutes)
app.use('/api/chat',chatRoutes)

app.get('/api/chats',async(req,res)=>{
    res.send(chats)
})

app.get('/',async(req,res)=>{
    res.send('working')
})
app.use(notFound)
app.use(errorHandler)


// app.listen(process.env.PORT,()=>console.log(`app running on ${process.env.PORT}`))
app.listen(5000,()=>console.log('server running well'))