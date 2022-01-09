const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    u:String,
    followers:{}
})

const m = mongoose.model("Users",userSchema);

module.exports = m;