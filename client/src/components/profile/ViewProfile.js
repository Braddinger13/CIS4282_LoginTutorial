import { React, useState, useEffect } from "react";
import LoginUser from "./LoginUser";

const ViewProfile = () => {
  const [loginUser, setLoginUser] = useState({});

  //useEffect will run upon loading the page, this is where we will call our display API
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

  return (
    <div>
      
      <br />
      {/* {JSON.stringify(loginUser)} */}
      <div className="userDisplay">
        {Object.keys(loginUser).length > 0 ? (
          <div>
            <LoginUser obj={loginUser} />
          </div>
        ) : (
          <div>Please Login</div>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
