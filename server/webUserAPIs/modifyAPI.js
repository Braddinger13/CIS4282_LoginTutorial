const express = require("express");
const router = express.Router();
const db = require("../dbUtils/DbConn");
const cors = require("cors");

const DbMods = require("../model/webUser/DbMods");

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
  
// Insert
router.get("/insertUser", (req, res) => {
  var errors = false;
  // establish webUser object to take in URL query results
  // http://localhost:5000/api/insertUser?webUserId=&userEmail=asdf&userPassword=asdf&userPassword2=asdf&image=asdf&birthday=2020-05-05&membershipFee=100&userRoleId=asdf&errorMsg=
  var webUser = {
    "webUserId": req.query.webUserId,
    "userEmail": req.query.userEmail,
    "userPassword": req.query.userPassword,
    "userPassword2": req.query.userPassword2,
    "image": req.query.image,
    "birthday": req.query.birthday,
    "membershipFee": req.query.membershipFee,
    "userRoleId": req.query.userRoleId,
  }

  // establish error object to note any formatting errors from values inserted
  var errorObj = {
    "isError": "true",
    "webUserId": "",
    "userEmail": "",
    "userPassword": "",
    "userPassword2": "",
    "image": "",
    "birthday": "",
    "membershipFee": "",
    "userRoleId": "",
    "errorMsg": ""
  }

  // validate insert
  var tempObj = DbMods.validateWebUser(webUser);

  // check if object returned was a web user object or an error object, update accordingly
  if(tempObj.isError){
      errorObj = tempObj;
      errors = true;
  } else {
      webUser = tempObj;
  }

  if (!errors) {
    console.log("no errors! lets insert");
    try {     
      const sqlIns = "INSERT INTO web_user (user_email, user_password, image, membership_fee, birthday, user_role_id) VALUES (?,?,?,?,?,?)";
      db.query(sqlIns, [webUser.userEmail, webUser.userPassword, webUser.image, webUser.membershipFee, webUser.birthday, webUser.userRoleId], (err, req, result) => {
        if (err) {
          // we get database error from sqlMessage and put it into our error object
          console.log("SQL MSG: " + err.sqlMessage);
          errorObj.errorMsg = err.sqlMessage;
          res.send(errorObj);
          console.log("There was an error! Record not inserted!")
        } else {
          webUser.errorMsg = "Record inserted!"
          res.send(webUser);
          console.log("No errors! Record inserted!");
        }
      });
    } catch (err){
      // res.send("Oh no DB error");
      console.log("ERR DB: " + err);
      errorObj.errorMsg = "Error connecting to database!";
      res.send(errorObj);
    }
  } else {
    errorObj.errorMsg = "Please see field level errors.";
    res.send(errorObj);
    console.log("Errors! Sending error object...");
  }

});

// Update
router.get("/updateUser", (req, res) => {
  var errors = false;
  
  var webUser = {
    "webUserId": req.query.webUserId,
    "userEmail": req.query.userEmail,
    "userPassword": req.query.userPassword,
    "userPassword2": req.query.userPassword2,
    "image": req.query.image,
    "birthday": req.query.birthday,
    "membershipFee": req.query.membershipFee,
    "userRoleId": req.query.userRoleId,
  }

  var errorObj = {
    "isError": "true",
    "webUserId": "",
    "userEmail": "",
    "userPassword": "",
    "userPassword2": "",
    "image": "",
    "birthday": "",
    "membershipFee": "",
    "userRoleId": "",
    "errorMsg": ""
  }

  // validate insert
  var tempObj = DbMods.validateWebUser(webUser);

  // check if object returned was a web user object or an error object, update accordingly
  if(tempObj.isError){
      errorObj = tempObj;
      errors = true;
  } else {
      tempObj = DbMods.insertWebUser(tempObj);
      webUser = tempObj;
  }

  console.log("New OBJ after update: " + JSON.stringify(webUser));

  if (!errors) {
    console.log("no errors! lets update");
    try {     
      const sqlIns = "UPDATE web_user SET user_email=?, user_password=?, image=?, membership_fee=?, birthday=?, user_role_id=?" 
      + " WHERE web_user_id=?";
      const obj = [webUser.userEmail, webUser.userPassword, webUser.image, webUser.membershipFee, webUser.birthday, webUser.userRoleId, webUser.webUserId];
      db.query(sqlIns, obj, (err, req, result) => {
        if (err) {
          // we get database error from sqlMessage and put it into our error object
          console.log("SQL MSG: " + err.sqlMessage);
          errorObj.errorMsg = err.sqlMessage;
          res.send(errorObj);
          console.log("There was an error! Record not updated!")
        } else {
          webUser.errorMsg = "Record updated!"
          //var temp = DbMods.formatWebUser(webUser);
          res.send(webUser);
          console.log("No errors! Record updated!");
        }
      });
    } catch (err){
      // res.send("Oh no DB error");
      console.log("ERR DB: " + err);
      errorObj.errorMsg = "Error connecting to database!";
      res.send(errorObj);
    }
  } else {
    errorObj.errorMsg = "Please see field level errors.";
    res.send(errorObj);
    console.log("Errors! Sending error object...");
  }

});

//Delete
router.get("/deleteUser/:id", (req, res) => {
  const sqlDelete = `DELETE FROM web_user WHERE web_user_id=${req.params.id};`;
  db.query(sqlDelete, (err, result) => {
    if (err) throw err;
    console.log(result);
    if(result.affectedRows>0){
      res.send({
        resp: `User ${req.params.id} Deleted...`,
        errorMsg: ""
      });
    }else{
      res.send({
        resp: ``,
        errorMsg: `User with ID of ${req.params.id} does not exist in the database`
      });
    }
  })
})

module.exports = router;