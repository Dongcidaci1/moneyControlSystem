/* 

程序入口文件
*/
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
// 引入users.js
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
// const Profile = require("./model/Profile");

const db = require("./config/keys").mongoURI;
//连接数据库
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected"))
  .catch(err => console.log(err))

//使用body-parser,要把body-parser的使用放在路由前面
//因为路由里面就已经需要使用到parser了
// 如果在路由之后使用，就会导致路由里面需要解析的部分没有办法被解析

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//使用routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);

const port = process.env.port || 5000;

//passport初始化
app.use(passport.initialize());
//这一步不是很懂
require("./config/passport")(passport);

// app.get("/", (req, res) => {
//   res.send("nihaoa")
// })

app.listen(port, () => {
  console.log("server is running on 5000");
})