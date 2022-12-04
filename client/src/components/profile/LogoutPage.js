import {React, useEffect} from 'react'

const LogoutPage = () => {

    //useEffect will run upon loading the page, this is where we will call our display API
  useEffect(() => {
    //an asynchronous function that will either return the API data or an error
    async function logout() {
      try {
        //we use the "await" keyword here because we have to wait for this API call to complete.
        //we cannot continue without the information returned here.
        const res = await fetch(process.env.REACT_APP_API_URL + "/logout");

        //res.json parses the JSON response and returns a JS Object insead
        const data = await res.json();

        console.log(data);

        //set our userList array with our JS Object
      } catch (err) {
        //error catching
        console.log(err);
      }
    }

    logout();
  }, []);


  return (
    <div>Session Terminated</div>
  )
}

export default LogoutPage