//login & register
const express = require("express");
const router = express.Router();
const User = require("../../model/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require('jsonwebtoken');
router.get("/test", (req, res) => {
  res.json({ "msg": "login works" });

})


router.post('/register', (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).json("用户名已被注册");
      } else {
        const newUsr = new User({
          username: req.body.name,
          password: req.body.password,
          identity:req.body.identity
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUsr.password, salt, (err, hash) => {
            if (err) throw err;
            newUsr.password = hash;
            newUsr.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })

      }
    })
})

router.post("/login", (req, res) => {
  const username = req.body.name;
  const password = req.body.password;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).json("用户不存在")
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          // 密码匹配
          if (isMatch) {
            const rule = { id: user._id, username: user.username,identity:user.identity }
            jwt.sign(rule, "secret", { expiresIn:3600*24*7 }, (err, token) => {
              if (err) throw err;
              return res.json({
                success: true,
                token: "Bearer " + token//Bearer后面一定要有空格，否则打印不出数据
              })
            })
            // res.json({msg:"登陆成功"})
          } else {
            return res.status(400).json("密码错误" )
          }
        })
    })
})
//使用passport和passport-jwt完成token
router.get('/current', passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({
    name: req.user.id,
    password: req.user.password,
    identity:user.identity
  })
})
module.exports = router;