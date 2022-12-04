const User = ({ obj }) => {

    //takes the image url stored in the database and finds the matching picture in our pics folder

    var userObj = obj.user || {}

    return (
      <div className="user">

        {Object.keys(userObj).length > 0 ? (
          <div className="grid-container">
          <div className="img-col">
            <div className="userPics">
              <h2><u>Image</u></h2>
              <img src={userObj.image} alt="not found" />
            </div>
          </div>

          {/* info is extracted and displayed from the object passed*/}
          <div className="info-col">
            <h2><u>User Info</u></h2>
            <p>Email: {userObj.userEmail || ""}</p>
            <p>Password: {userObj.userPassword || ""}</p>
            <p>Bday: {userObj.birthday || "null"}</p>
            <p>Membership Fee: {userObj.membershipFee || "null"}</p>
            
            <h4>Role: {userObj.userRoleType}</h4>
          </div>
        </div>
        ): (
          <div>Please Login!</div>
        )
        }

        
      </div>
    );
  }; //End User

  export default User;