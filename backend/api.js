var signin = require("./schema/userData");
var upload = require("./schema/postData");
var Category = require("./schema/category");
module.exports = {
  user: function(data) {
    return new Promise((resolve, reject) => {
      signin.findOne({ email: data.email }, function(err, result) {
        if (err) {
          console.log("error 1st");
          reject(err);
        }
        if (result) {
          console.log("email exist");
          resolve("email already exist");
        } else {
          if (data.psw == data.repeat) {
            signin.create(data, function(err, result) {
              if (err) {
                reject(err);
              } else {
                console.log(data);
                resolve("successful");
              }
            });
          } else {
            resolve("enter valid Password");
          }
        }
      });
    });
  },

  users: function(data) {
    return new Promise((resolve, reject) => {
      signin.find({ email: data.email, psw: data.psw }, "email", function(
        err,
        result
      ) {
        if (err) {
          reject(err);
        } else if (result.length === 1) {
          signin.findOne({ email: data.email }, function(err, result) {
            if (err) {
              reject(err);
            } else {
              resolve("verify your email");
            }
          });
        } else {
          resolve("Check your login details");
        }
      });
    });
  },
  forgot: function(data) {
    return new Promise((resolve, reject) => {
      signin.find({ email: data.email }, "email", function(err, result) {
        if (err) {
          reject(err);
        } else if (result.length === 1) {
          resolve("change password");
        } else {
          resolve("Email do not exist");
        }
      });
    });
  },
  Reset: function(data) {
    return new Promise((resolve, reject) => {
      if (data.psw == data.repeat) {
        signin.update(
          { email: data.email },
          { $set: { psw: data.psw } },
          function(err, result) {
            if (err) {
              reject(err);
            } else {
              resolve("password changed");
            }
          }
        );
      } else {
        resolve("password did not matched");
      }
    });
  },
  Upload: function(data) {
    return new Promise((resolve, reject) => {
      console.log("data", data);
      upload.create(data, function(err, result) {
        if (err) {
          reject(err);
        } else {
          console.log("post");
          resolve(data);
        }
      });
    });
  },
  Onload: function() {
    return new Promise((resolve, reject) => {
      upload.find({}, function(err, result) {
        if (err) {
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      });
    });
  },
  Manage: function(data) {
    return new Promise((resolve, reject) => {
      upload.find({ _id: data._id }, { _id: 0, like: 1, unlike: 1 }, function(
        err,
        result
      ) {
        if (err) {
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      });
    });
  },
  Likes: function(data) {
    return new Promise((resolve, reject) => {
      upload.find({ _id: data._id, like: data.email }, function(err, result) {
        if (err) {
          reject(err);
        } else {
          console.log("Likes ", result);
          resolve(result);
        }
      });
    });
  },
  ManageLikes: function(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      upload.update(
        { _id: data._id },
        { $push: { like: data.email } },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  },
  ManageLikesPull: function(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      upload.update(
        { _id: data._id },
        { $pull: { like: data.email } },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  },
  Unlikes: function(data) {
    return new Promise((resolve, reject) => {
      upload.find({ _id: data._id, unlike: data.email }, function(err, result) {
        if (err) {
          reject(err);
        } else {
          console.log("Unlikes ", result);
          resolve(result);
        }
      });
    });
  },
  ManageUnlikesPull: function(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      upload.update(
        { _id: data._id },
        { $pull: { unlike: data.email } },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  },
  ManageUnlike: function(data) {
    return new Promise((resolve, reject) => {
      upload.update(
        { _id: data._id },
        { $push: { unlike: data.email } },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  },
  ManageComments: function(data) {
    return new Promise((resolve, reject) => {
      upload.update(
        { _id: data._id },
        { $push: { comment: data.comment, commentMail: data.email } },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  },
  ManageCommentsFind: function(data) {
    return new Promise((resolve, reject) => {
      upload.find(
        { _id: data._id },
        { _id: 0, comment: 1, commentMail: 1 },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        }
      );
    });
  },

  ManageCategory: function(data) {
    return new Promise((resolve, reject) => {
      console.log("data", data);
      Category.update(
        {},
        { $addToSet: { category: data.category } },
        { upsert: true },
        function(err, result) {
          if (err) {
            reject(err);
          } else {
            console.log("post");
            resolve(result);
          }
        }
      );
    });
  },
  OnloadCategory: function() {
    return new Promise((resolve, reject) => {
      Category.find({}, function(err, result) {
        if (err) {
          reject(err);
        } else {
          console.log("category", result);
          resolve(result);
        }
      });
    });
  }
};
