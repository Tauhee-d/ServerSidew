// import mongoose from "mongoose";
const mongoose = require('mongoose')


const database = async (DATABASE) => {
    try {
        mongoose.set('strictQuery', true);
         await mongoose.connect(DATABASE)

        console.log(`database connected`);
    } catch (error) {
        console.log(error);
    }
}

// export default database
module.exports = database