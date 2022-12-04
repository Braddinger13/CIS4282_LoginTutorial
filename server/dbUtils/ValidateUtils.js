const validateUtils = {}

// error object if we need to send it back
const errorObj = {
    "isError": "true",
    "webUserId": "",
    "userEmail": "",
    "userPassword": "",
    "userPassword2": "",
    "image": "",
    "birthday": "",
    "membershipFee": "",
    "userRoleId": "",
    "errorMsg": ""
  }

// Goal of validation Utils is to tell us whether some parameter passed is not correct for a specific data type

// determine if date is valid, otherwise send error
validateUtils.validateDate = function (date, reqd) {
    if(reqd && date == null) {
        return "Please enter a date (required) - ValidateUtils.js"
    }
    var date = new Date(date);
    if((date === "Invalid Date") || isNaN(date)){
        return "Invalid date format - ValidateUtils.js";
    } else {
        return "";
    }
  }

//Formatting membership fee before sending the result
validateUtils.validateFloat = function (float, reqd) {
    if(reqd && float == null){
        return "Please enter a float (required) - ValidateUtils.js";
    }

    float = float.replace('$', '');
    float = float.replace(',', '');
    console.log("float after removal: " + float);

    var value = parseFloat(float);

    console.log("Value of float = " + value);

    if (!isNaN(value)) {
        return "";
    }
    
    return "Invalid float format - ValidateUtils.js";

    return "";
}

 // helper for format currency COMPLETE
 function isFloat(value){
    var regex  = /^\d+(?:\.\d{0,2})$/;
    if (regex.test(value))
        return true;

    return false;
}

function isDate(date){
    var regex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
    if(regex.test(date)){
        return true;
    }

    return false;
}

// verify email with regex
validateUtils.validateEmail = function (email, reqd) {
    if(reqd && email == null){
        return "Please enter an email (required) - ValidateUtils.js";
    }

    if(!String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        return "Invalid email format - ValidateUtils.js";
    } else {
        return "";
    }
}

// check string
validateUtils.validateString = function (string, minLen, reqd){
    if(string == null || string.length == 0){
        return "Please enter a string (required) - ValidateUtils.js";
    }

    if(string == null || string.length < minLen){
        return "String must be at least " + minlen + " chars - ValidateUtils.js";
    } else {
        return "";
    }
}

// check password length
validateUtils.compareStrings = function (s1, s2){
    if(s1 == null || s2 == null){
        return "When comparing strings, both strings are needed: ValidateUtils.js";
    }

    if(s1 !== s2){
        return "Strings do not match - ValidateUtils.js";
    } else {
        return "";
    }
}

// check user role
validateUtils.validateInteger = function (int, reqd){
    if(reqd && int == null){
        return "Please enter an integer (required) - ValidateUtils.js";
    }

    int = int.replace('$', '');
    int = int.replace(',', '');
    console.log("Int given: " + int);
    int = parseInt(int);
    if(!Number.isInteger(int)){
        return "Invalid integer - ValidateUtils.js"
    } else {
        return "";
    }
}


module.exports = validateUtils