var express = require("express");
var router = express.Router();
var signin = require("./schema/userData");
var upload = require("./schema/postData");

var multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/home/com123/newProject/backend/public/profile");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });
console.log("we are on router.js");
var userapi = require("./api");

router.post("/user", async function(req, res) {
  data = req.body;
  try {
    let resFromAPI = await userapi.user(data);
    res.send(resFromAPI);
  } catch (err) {
    res.send(err);
  }
});

router.post("/users", async function(req, res) {
  console.log("data");
  try {
    let resultFromAPI = await userapi.users(req.body);
    res.send(resultFromAPI);
  } catch (err) {
    res.send(err);
  }
});

router.post("/forgot", async function(req, res) {
  try {
    let resultOfForgot = await userapi.forgot(req.body);
    res.send(resultOfForgot);
  } catch (err) {
    res.send(err);
  }
});

router.post("/reset", async function(req, res) {
  try {
    console.log("data", req.body);
    let resultOfReset = await userapi.Reset(req.body);
    res.send(resultOfReset);
  } catch (err) {
    res.send(err);
  }
});

router.post(
  "/upload",
  (req, res, next) => {
    next();
  },
  upload.single("avatar"),
  async function(req, res) {
    try {
      let data = req.body;
      data.date = new Date();
      data.fileName = req.file.originalname;
      let resultOfUpload = await userapi.Upload(data);
      res.send(resultOfUpload);
    } catch (err) {
      res.send(err);
    }
  }
);

router.get("/onload", async function(req, res) {
  try {
    let resultOfOnload = await userapi.Onload();
    res.send(resultOfOnload);
  } catch (err) {
    res.send(err);
  }
});

router.post("/manageLikes", async function(req, res) {
  try {
    console.log("managelikes", req.body);
    let resultOfLikes = await userapi.Likes(req.body);
    if (resultOfLikes.length === 1) {
      console.log("email exist");
      await userapi.ManageLikesPull(req.body);
    } else {
      console.log("not exist");
      await userapi.ManageLikes(req.body);
    }
    let resultOfManage = await userapi.Manage(req.body);

    res.send(resultOfManage);
  } catch (err) {
    res.send(err);
  }
});

router.post("/manageUnlike", async function(req, res) {
  try {
    console.log(req.body);
    let resultOfUnlikes = await userapi.Unlikes(req.body);
    if (resultOfUnlikes.length === 1) {
      await userapi.ManageUnlikesPull(req.body);
    } else {
      await userapi.ManageUnlike(req.body);
    }
    let resultOfManage = await userapi.Manage(req.body);

    res.send(resultOfManage);
  } catch (err) {
    res.send(err);
  }
});

router.post("/manageComments", async function(req, res) {
  try {
    await userapi.ManageComments(req.body);
    let resultOfCommentFind = await userapi.ManageCommentsFind(req.body);
    res.send(resultOfCommentFind);
  } catch (err) {
    res.send(err);
  }
});

router.post("/manageComment", async function(req, res) {
  try {
    let resultOfCommentFind = await userapi.ManageCommentsFind(req.body);
    res.send(resultOfCommentFind);
  } catch (err) {
    res.send(err);
  }
});

router.post("/category", async function(req, res) {
  try {
    await userapi.ManageCategory(req.body);
    let resultOfOnloadCategory = await userapi.OnloadCategory();
    res.send(resultOfOnloadCategory);
  } catch (err) {
    res.send(err);
  }
});

router.get("/OnloadCategory", async function(req, res) {
  try {
    let resultOfOnloadCategory = await userapi.OnloadCategory();
    res.send(resultOfOnloadCategory);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
