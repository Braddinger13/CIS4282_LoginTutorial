import { React, useState } from "react";
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
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(process.env.REACT_APP_API_URL + "/getLoggedIn")
      .then((res) => {
        setLoginUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(loginUser);
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
