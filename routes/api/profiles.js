const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../model/Profile");
router.get("/test", (req, res) => {
  res.json({ msg: "profile test" });
  console.log("test success");
})

router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  // 先创建一个空的对象
  const profileFields = {};
  // 然后获取表单提交过来的数据并在对象内创建对应的key和value
  if (req.body.type) {
    profileFields.type = req.body.type;
  }
  if (req.body.describe) {
    profileFields.describe = req.body.describe;
  }
  if (req.body.incode) {
    profileFields.incode = req.body.incode;
  }
  if (req.body.expend) {
    profileFields.expend = req.body.expend;
  }
  if (req.body.cash) {
    profileFields.cash = req.body.cash;
  }
  if (req.body.remark) {
    profileFields.remark = req.body.remark;
  }
  // 将对象的值传递给profiles，并且保存到对应的数据库表里
  new Profile(profileFields).save()
    .then(profile => {
      res.json(profile)
    })
})


/* 
route get api/profiles
获取所有信息
private --- 需要token 的验证
*/

router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.find()
    .then(profile => {
      if (!profile) {
        return res.status(404).json("没有任何内容");
      }
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

/* 
route get api/profiles/edit/:id
编辑信息
private --- 需要token 的验证
*/
router.post("/edit/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  // 先创建一个空的对象
  const profileFields = {};
  // 然后获取表单提交过来的数据并在对象内创建对应的key和value
  if (req.body.type) {
    profileFields.type = req.body.type;
  }
  if (req.body.describe) {
    profileFields.describe = req.body.describe;
  }
  if (req.body.incode) {
    profileFields.incode = req.body.incode;
  }
  if (req.body.expend) {
    profileFields.expend = req.body.expend;
  }
  if (req.body.cash) {
    profileFields.cash = req.body.cash;
  }
  if (req.body.remark) {
    profileFields.remark = req.body.remark;
  }
  Profile.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $set: profileFields
    },
    {
      new: true,//设置之后数据能够即时刷新
      useFindAndModify: false//这个是因为报错才设置的
    }
  ).then(profile => {
    return res.json(profile)
  })
})


/* 
route get api/profiles/delete/:id
编辑信息
private --- 需要token 的验证
*/
router.post("/delete/:id", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ _id: req.params.id },{useFindAndModify:false})
      .then(profile => {
        // profile.save().then(profile => res.json(profile))
        return res.json(profile)
        // return res.redirect('/')
      })
      .catch(err => res.status(404).json(err))
  })



/* 
route get api/profiles/:id
获取单个信息
private --- 需要token 的验证
*/

router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({ _id: req.params.id })
    .then(profile => {
      if (!profile) {
        return res.status(404).json("没有任何内容");
      }
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json(err);
    })
})


module.exports = router;

