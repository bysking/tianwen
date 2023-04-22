const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost/bysking_database");

db.then(() => {
  console.error("****数据库连接成功****");
}).catch(() => {
  console.error("****数据库连接失败****");
});
