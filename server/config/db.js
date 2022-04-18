const mongoose = require('mongoose')

const connectDb = async ()=>{
    try{ 
       await mongoose.connect(process.env.MONGO_URI)
       await console.log(`database running on port ${process.env.PORT}`)
    }catch(err){
        console.log('an error occured in the connection')
    }
}

module.exports = connectDb