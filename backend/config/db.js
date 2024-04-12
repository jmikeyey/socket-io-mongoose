const mongoose = require('mongoose')

const db = async () => {
  try{
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    console.log(`Mongo DB Connected: ${conn.connection.host}`)
    return conn
  }catch(err){
    console.log(err)
    process.exit(1)
  }
}

module.exports = { db }