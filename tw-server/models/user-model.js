// 账户的数据库模型
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
