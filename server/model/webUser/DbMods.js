const { compareStrings } = require("../../dbUtils/ValidateUtils");

const DbMods = {}

formatUtils = require("../../dbUtils/FormatUtils");
validateUtils = require("../../dbUtils/ValidateUtils");


// call all formats, and either return an error object or a user object
var webUser = {}

// format web user
DbMods.formatWebUser = function(userObj){
    webUser = {};

    webUser.web_user_id = formatUtils.plainInteger(userObj.web_user_id);
    webUser.user_email = formatUtils.formatString(userObj.user_email);
    webUser.user_password = formatUtils.formatString(userObj.user_password);
    webUser.image = formatUtils.formatString(userObj.image);
    webUser.birthday = formatUtils.formatDate(userObj.birthday);
    webUser.membership_fee = formatUtils.formatCurrency(userObj.membership_fee);
    webUser.user_role_id = formatUtils.plainInteger(userObj.user_role_id);
    webUser.role_type = formatUtils.formatString(userObj.role_type);

    return webUser;
}


// validate web user 
DbMods.validateWebUser = function(userObj){
    var errorObj = {};
    errorObj.isError = "true";

    // errorObj.webUserId = validateUtils.validateInteger(userObj.webUserId, true);
    errorObj.userEmail = validateUtils.validateEmail(userObj.userEmail, true);
                                                        // password, min length for password
    errorObj.userPassword = validateUtils.validateString(userObj.userPassword, 5, true);
    errorObj.image = validateUtils.validateString(userObj.image, 2, false);
    errorObj.birthday = validateUtils.validateDate(userObj.birthday, false);
    errorObj.membershipFee = validateUtils.validateFloat(userObj.membershipFee, false);
    console.log("user role id: " + userObj.userRoleId);
    errorObj.userRoleId = validateUtils.validateInteger(userObj.userRoleId, true);

    errorObj.userPassword2 = validateUtils.compareStrings(userObj.userPassword, userObj.userPassword2);

    var errs = checkErrors(errorObj)
    
    if(errs){
        return errorObj;
    }

    return userObj;
}

// use this after webuser has been validated, insert the stripped values
DbMods.insertWebUser = function(userObj){
    userObj.membershipFee = formatUtils.decimalConversion(userObj.membershipFee);
    userObj.birthday = formatUtils.dateConversion(userObj.birthday);

    return userObj;
}

// function to determine if there are any errors currently
function checkErrors(errorObj){
    // there are errors
    if(errorObj.userEmail.length > 0 || errorObj.userPassword.length > 0 || errorObj.image.length > 0 || errorObj.birthday.length > 0
            || errorObj.membershipFee.length > 0 || errorObj.userRoleId.length > 0) return true;

    // there are no errors
    return false;
}

module.exports = DbMods