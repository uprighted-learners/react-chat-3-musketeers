const mongoose = require("mongoose")
const DB_URL = process.env.DB_URL

// Function that establishes the connection to the mongoDB database
const dbConnect = async () => {
    try {
    mongoose.set("strictQuery", "true")
    await mongoose.connect(DB_URL, {       // establishes the connection to the DB_URL
    useNewUrlParser: true,                 // specifies how the data is being send
    useUnifiedTopology: true
    })
    console.log(`[db] conncted to: ${DB_URL}`)
    } catch(err) {
    console.log(`[db] error: ${err}`)
    }
    }
    
// we need to export it to be able to use it somewhere else
module.exports = {dbConnect, mongoose }   //import in app.js e invoke in app.listen
