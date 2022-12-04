import React, {useState, useEffect} from "react";
import User from "../webUser/User";
import DeleteModal from "./DeleteModal";

import "../../style/user/collapsed-user.css";
import "../../style/user/expanded-user.css";
import "../../style/navbar.css";
import "../../style/style.css"
import "../../style/user/user-table.css"
import "../../style/updateModal.css"
import "../../style/modalWindow.css"



function Display(props) {

  //used to store the JS Object that comes from the API call
  const [userList, setUserList] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [clickedUser, setClickedUser] = useState({});
  const [okClicked, setOkClicked] = useState(false);
  const [clickIndex, setClickIndex] = useState();


  //an asynchronous function that will either return the API data or an error
  async function fetchAllUsers() {
    try {
      //we use the "await" keyword here because we have to wait for this API call to complete.
      //we cannot continue without the information returned here.
      const res = await fetch(
        process.env.REACT_APP_API_URL + "/api/listAllUsers"
      );

      //res.json parses the JSON response and returns a JS Object insead
      const data = await res.json();

      console.log("Setting user list: " + JSON.stringify(data));
      //set our userList array with our JS Object
      setUserList(data);
    } catch (err) {
      //error catching
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);
  

  // user id for single user sort
  const [userID, setUserID] = useState("");
  const handleChange = (event) => {
    const value = event.target.value;
    setUserID(value);
    console.log("ID is now " + userID);
  };

  async function processDelete(userId, index) {
    console.log("userID" +userId);
    console.log("index" +index);
    try {
      //we use the "await" keyword here because we have to wait for this API call to complete.
      //we cannot continue without the information returned here.
      const res = await fetch(
        process.env.REACT_APP_API_URL + "/api/deleteUser/" + userId
      );

      //res.json parses the JSON response and returns a JS Object insead
      const data = await res.json();
      console.log(data);

      if (data.errorMsg.length > 0) {
        console.log("Could not delete user " + userId + "!");
      } else {
        console.log("index: " + index);

        var newList = userList;
        newList.splice(index, 1);
        setUserList([...newList]);
      }
    } catch (err) {
      console.log(err);
    }
    setOpenModal(false)
  }


  return (
    <div className="view">
      <div className="main">
        <h2 className="heading">Web User Display and Delete</h2>
        <div className="userTable">
          {/* 
                This ternary will check if there are any objects in our list to map over. 
                If there are none, it will give a message explaining so.
            */}
          {/* 
                Inside of this ternary, we can call a map function. This map function will loop
                through the objects in userList and call our User React Component that we created
                at the top of our text/babel tags
          */}
            
          <div className="tableBody">
            {userList.length > 0 ? (
              userList.map((ele, index) => (
                <div key={index} className="userBlock">
                  <User props={ele} />
                  <button
                    class="deleteButton"
                    onClick={() => {
                      setOpenModal(true);
                      setClickedUser(ele);
                      setClickIndex(index);
                    }}
                  >
                    Delete
                  </button>
                  {/*<UpdateModal props={ele} />*/}
                  
                </div>
              ))
            ) : (
              <div>
                <p>No Users Found</p>
              </div>
            )}
            </div>
            <DeleteModal
            onOkClicked={() => {
              setOkClicked(true);
              processDelete(clickedUser.web_user_id, clickIndex);
            }}
            onClose={() => {
              setOpenModal(false);
              setOkClicked(false);
            }}
            open={openModal}
            user={clickedUser}
          /> 
        </div>
      </div>
    </div>
  );
} // end of Display() function

export default Display;
