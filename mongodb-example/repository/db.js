
const mongoose = require('mongoose')

const connectDB = async() => {

    try {
        const uri = 'mongodb://localhost:27017/clase-numero-4'
        await mongoose.connect(uri)

        console.log("Conexion Exitosa")
    } catch (error) {
            console.log("error", error)
            process.exit(1)
    }
}

connectDB();

module.exports = connectDB;