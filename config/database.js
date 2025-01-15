const mongoose= require("mongoose");// nhung module của mongoose vào

module.exports.connect=()=>{
    mongoose.connect(process.env.MONGO_URL) // liên kết với cơ sở dữ liệu MongooseDBcompass
    .then(()=> console.log("connected!"));  // test xem connect chưa
    // .then(() => console.log(mongoose.Schema));
};