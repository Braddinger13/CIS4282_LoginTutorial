
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import UpdateModal from "../webUser/updateModal"
import "../../style/updateModal.css"

//This is a React Component that will be used to display the information of a SINGLE user.
//It will take in an propsect "props".
function User({ props }) {

  const [show, setShow] = useState(false)
  const [modalVisibility, setModalVisibility] = useState("updateHide");

  function handleShow() {
    setShow(!show);
  }

  function handleUpdate() {
    if (modalVisibility == "updateShow") {
      console.log("setting visibility to hide");
      setModalVisibility("updateHide");
    } else {
      console.log("setting visibility to show");
      setModalVisibility("updateShow");
    }
  }

  useEffect(() => {
  });

  const userObj =
  {
    "webUserId": props.web_user_id,
    "userEmail": props.user_email,
    "userPassword": props.user_password,
    "userPassword2": props.user_password,
    "image": props.image,
    "birthday": props.birthday,
    "membershipFee": props.membership_fee,
    "userRoleId": props.user_role_id,
    "class": { modalVisibility }
  }

  return (
    <div className="userInfo">
      {show ?
        (
          <div>

            <div className={modalVisibility}>
              <UpdateModal props={userObj} />
            </div>

            <div className="expanded-grid-container">

              <div className="expanded-grid-child-image">
                <img className="imageThumb" src={props.image} alt="not found" />
              </div>

              <div className="expanded-grid-child-info">
                <h2><u>User {props.web_user_id}</u></h2>
                <p>Email: {props.user_email}</p>
                <p>Password: {props.user_password}</p>
                <p>Membership Fee: {props.membership_fee}</p>
                <p>Birthday: {props.birthday}</p>
                <h4>Role: {props.role_type}</h4>
              </div>

              <div className="expanded-grid-child-buttons">
                <button onClick={handleShow}>Collapse</button>
                <button onClick={handleUpdate} className="editButton">Edit</button>
              </div>
            </div>

          </div>
        )

        :

        (
          <div>
            <div className={modalVisibility}>
              <UpdateModal props={userObj} />
              <button type="button" className = "cancelButton" onClick={handleUpdate}>Cancel</button>
            </div>
            <div className="collapsed-grid-container">
              {/*image*/}
              <div className="collapsed-grid-child-image">
                <img className="imageThumb" src={props.image} alt="not found" />
              </div>

              {/*information*/}
              <div className="collapsed-grid-child-email">
                <p>{props.user_email}</p>
              </div>

              <div className="collapsed-grid-child-buttons">
                <button onClick={handleShow}>View</button>
                {/*<button className="editButton"><Link to="/update" state={{ data: userObj }}>Edit</Link></button>*/}
                <button onClick={handleUpdate} className="editButton">Edit</button>
              </div>

            </div>
          </div>
        )}
    </div>
  )
} //End User

export default User;