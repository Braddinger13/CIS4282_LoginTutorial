const express = require("express");
const router = express.Router();
const db = require("../dbUtils/DbConn");
const cors = require("cors");

const DbMods = require("../model/webUser/DbMods");

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// get all user api 
router.get("/listAllUsers", (req, res) => {
    try {
      const sqlGet = "SELECT web_user_id, user_email, user_password, image, membership_fee, birthday, web_user.user_role_id, role_type "
      + " FROM web_user, user_role WHERE web_user.user_role_id = user_role.user_role_id ORDER BY web_user_id ASC";
      db.query(sqlGet, (req, result) => {
          var users = [];
          for(var ele of result){
              users.push(DbMods.formatWebUser(ele));
          }
          res.send(users);
      });
    } catch (error) {
        console.log("ERROR DISPLAYING: " + error);
    }
  }); 
  

// Role Types
router.get('/getRoleTypes', (req, res) => {
  const sqlGet = "SELECT user_role_id, role_type FROM user_role ORDER BY role_type ASC";
  db.query(sqlGet, (req, result) => {
    res.send(result);
  })
});

module.exports = router;