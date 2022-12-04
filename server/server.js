//Imports dependecies being used
const express = require("express");
const cors = require("cors");


//declares an express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Express session
const session = require("express-session");

const db = require("./dbUtils/DbConn");

const modifyWebUser = require("./webUserAPIs/modifyAPI");
const readWebUser = require("./webUserAPIs/readAPI");

const DbMods = require("./model/webUser/DbMods");


app.use("/api", modifyWebUser);
app.use("/api", readWebUser);

app.get("/", (req, res) => {
  if(db.state === 'disconnected'){
    return respond(null, { status: 'fail', message: 'server down'});
  } else {
    console.log("Homepage");
    res.send("web user crud");
  }

  res.send("Hello from backend");
  
});


//Login, logout, and viewProfile APIs
//milliseconds
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    //secret key, put in env var
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
  })
);

//object to save session
var sessions = {};
sessions.loggedin = false;

app.post("/login", (req, res) => {
    var email = "'" + req.body.email + "'";
    var pass = "'" + req.body.password + "'";
  
    sessions = {}
  
    var userObj = {
      errMsg: "",
      webUserId: "",
      userEmail: "",
      userPassword: "",
      image: "",
      membershipFee: "",
      birthday: "",
      userRoleType: "",
    };
  
    if (email && pass) {
  
      const loginSql = `SELECT web_user_id, user_email, user_password, image, membership_fee, birthday, 
      web_user.user_role_id, role_type FROM web_user, user_role WHERE user_email=${email} AND user_password=${pass} 
      AND web_user.user_role_id = user_role.user_role_id;`;
  

      db.query(loginSql, (request, result) => {
        console.log(result)
        if (result) {
          if (result.length > 0) {
            // format the user
            result[0] = DbMods.formatWebUser(result[0]);
            console.log(result[0])
  
            //building user object
            userObj.webUserId = result[0].web_user_id;
            userObj.userEmail = result[0].user_email;
            userObj.userPassword = result[0].user_password;
            userObj.image = result[0].image;
            userObj.membershipFee = result[0].membership_fee;
            userObj.birthday = result[0].birthday;
            userObj.userRoleType = result[0].user_role_type;
            userObj.errMsg = "";
  
            //building session object
            sessions = req.session;
            sessions.user = userObj;
            sessions.loggedin = true;
          } else {
        
            userObj.errMsg = "Invalid email or password";
            //reinitialize session if login invalid
            sessions = {
              user: userObj,
              loggedin: false,
            };
          }
        } else {
      
          userObj.errMsg =
            "Exception thrown trying to extract data from result set: " +
            request.sqlMessage;
  
          //reinitialize session if login invalid
          sessions = {
            user: userObj,
            loggedin: false,
          };
        }
      });
    } else {
  
      userObj.errMsg = "Must enter email and password!";
      sessions = {
        user: userObj,
        loggedin: false,
      };
    }
    res.send(sessions)
});
  
app.get("/getLoggedIn", (req, res) => {
    var userObj = {
      errMsg: "",
      webUserId: "",
      userEmail: "",
      userPassword: "",
      image: "",
      membershipFee: "",
      birthday: "",
      userRoleType: "",
    };
  
    //checks if session has a user logged in and sends info
    if (sessions.loggedin === true) {
      console.log(sessions);
      res.send(sessions);
    }else {
      //replace with webUserObject that has error field
      userObj.errMsg = "No user logged in";
  
      res.send(userObj);
    }
});
  
app.get("/logout", (req, res) => {
    req.session.destroy();
    sessions = {};
    sessions.loggedin = false
  
    console.log(sessions);
    const logoutObj = {
      msg: "Session invalidated",
    };
  
    res.send(logoutObj);
});


app.listen(process.env.PORT || 5000, () => {
  console.log("Listening...");
});