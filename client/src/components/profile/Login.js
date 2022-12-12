import { React, useState, useEffect } from "react";
import axios from "axios";
import LoginUser from "./LoginUser";
import ViewProfile from "./ViewProfile";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser, setLoginUser] = useState({})
  //const [errorText, setErrorText] = useState("")


  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  useEffect(() => {
    //an asynchronous function that will either return the API data or an error
    async function getLoggedInUser() {
      try {
        //we use the "await" keyword here because we have to wait for this API call to complete.
        //we cannot continue without the information returned here.
        const res = await fetch(process.env.REACT_APP_API_URL + "/getLoggedIn");

        //res.json parses the JSON response and returns a JS Object insead
        const data = await res.json();

        //set our userList array with our JS Object
        setLoginUser(data);
      } catch (err) {
        //error catching
        console.log(err);
      }
    }

    getLoggedInUser();
  }, []);


  function loginSubmit(e) {
    e.preventDefault();

    const loginObj = {
      email: email,
      password: password,
    };

    axios
      .post(process.env.REACT_APP_API_URL + "/login", loginObj)
      .then((res) => {
        console.log(res.data);
        window.parent.location = window.parent.location.href
      })
      .catch((err) => {
        console.log(err);
      });
 
  }

  return (
    <div className="spaPage">
      <h4 className="headerText">Login</h4>

      <form onSubmit={loginSubmit}>
        <div className="emailInput">
          <input type="text" placeholder="Email" onChange={handleEmailChange} />
        </div>

        <div className="passwordInput">
          <input
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <input type="submit" />
      </form>

      <div className="profile">
        {
          <div>
            <LoginUser obj={loginUser} />
          </div>
        }
      </div>
    </div>
  );
}

export default Login;
