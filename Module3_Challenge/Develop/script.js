// Assignment code here

//Create a string variable that includes all the character types
var charInfo = {
  all: "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ"
}

//This function check if there is any uppercase in the string, returns true if there is, false if there is not.
var hasUpper = function (str) {
  return str !== str.toLowerCase();
}

//This function check if there is any lowercase in the string, returns true if there is, false if there is not.
var hasLower = function (str) {
  return str !== str.toUpperCase();
}

//This function check if there is any number in the string, returns true if there is, false if there is not.
var hasNumber = function (str) {
  return /\d/.test(str);
}

//This function check if there is any special character in the string, returns true if there is, false if there is not.
var hasSpecialChar = function (str) {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
}

//This function randomly generate new character.
var getNewChar = function () {
  var randomNumber = Math.floor(Math.random() * charInfo['all'].length);
  var char = charInfo['all'].substring(randomNumber, randomNumber +1)
  return char
}

//Main function to generate new password.
var generatePassword = function() {

  //This function gets inputs from prompt windows and returns an array storing all the criteria that user would like to have in the password.
  //e.g. [12,true,false,true,true]
  var getRule = function() {
    var passwordCriteria = window.prompt("Which criteria do you want to include? Please enter 1 for password length, 2 for character type, 3 for both.");
    if (passwordCriteria === null) {
      window.alert('See you!');
      return passwordCriteria[0];
    }
    passwordCriteria = parseInt(passwordCriteria);

    switch (isNaN(passwordCriteria) || passwordCriteria){
      case 1:
        var Length = getPasswordLength();
        console.log(Length)
        break;
      case 2:
        var character = getCharacterType();
        var uppercase =  character[0];
        var lowercase =  character[1];
        var number = character[2];
        var specialchar = character[3];
        break;
      case 3:
        var Length = getPasswordLength();
        var character = getCharacterType();
        var uppercase =  character[0];
        var lowercase =  character[1];
        var number = character[2];
        var specialchar = character[3];
        break;
      default:
        window.alert("Please choose one option with correct format!");
        getRule();
        break;
    }

    return [Length,uppercase,lowercase,number,specialchar]
  }

  //This function gets input from prompt window and returns the length of the password the user wants.
  var getPasswordLength = function() {
    var passwordLength = window.prompt("How long would you like your password to be? Please enter a number between 8 and 128.");
    if (parseInt(passwordLength) >= 8 && parseInt(passwordLength) <= 128 ){
      passwordLength = parseInt(passwordLength)
    }
    else {
      window.alert("Please enter one number in the range with correct format!");
      getPasswordLength()
    }

    return passwordLength
  }

  //This function gets inputs from prompt windows and returns an array storing the character types the user wants.
  var getCharacterType = function() {
    do {
      var  uppercaseConfirm = window.confirm("Do you want to include uppercase in your password?");
      var  lowercaseConfirm = window.confirm("Do you want to include lowercase in your password?");
      var  numberConfirm = window.confirm("Do you want to include number in your password?");
      var  speicalConfirm = window.confirm("Do you want to include special characters in your password?");
      var  bottomLine = (uppercaseConfirm === false && lowercaseConfirm === false && numberConfirm === false && speicalConfirm === false )
      if (bottomLine){
        window.alert("Please choose at least one character type!");
      }
    }
    while (bottomLine)
    return [uppercaseConfirm,lowercaseConfirm,numberConfirm,speicalConfirm]
  }

  var ruleInfo = getRule();

  //This variable stores the actual values of criteria that user selected.
  var passwordInfo = {
    length : ruleInfo[0],
    uppercase: ruleInfo[1],
    lowercase: ruleInfo[2],
    number: ruleInfo[3],
    specialchar: ruleInfo[4]
  };

  var newPassword = "";

  //This variable is used for the case that the user didn't choose character type as criteria, only choose length as criteria. 
  //In this case, the system will randomly generate a password with certain length.
  var noRule =  (passwordInfo.uppercase == null && passwordInfo.specialchar == null && passwordInfo.number == null && passwordInfo.lowercase == null);

  //This is for the case that the user didn't choose length as criteria.
  //We will randomly generate a length that between 8 and 128
  if (passwordInfo.length != null) {
    var loopLength = passwordInfo.length;
  }
  else if (passwordInfo.length == null){
    var loopLength = Math.floor(Math.random() * (128 - 8)) + 8;
  }
  
  //The system randomly generate one character, and then check if it belongs to the type the user selected.
  //If it does, add this character to the password,
  //If not, re generate a new character.
  if (noRule === false) {
    i = 0;
    while(i <= loopLength-1) {
      var newChar = getNewChar();
      var checkUpper = hasUpper(newChar);
      var checkLower = hasLower(newChar);
      var checkNumber = hasNumber(newChar);
      var checkSpecialChar = hasSpecialChar(newChar);
      var allPass = ((checkUpper && passwordInfo.uppercase == true)||(checkLower && passwordInfo.lowercase == true)||(checkNumber && passwordInfo.number == true)||(checkSpecialChar && passwordInfo.specialchar == true))
      console.log(allPass)
      if (allPass === true) {
        newPassword += newChar;
        i++;
      }
      else {
        newChar = getNewChar();
      }
    }
  }
  else if (noRule) {
    for (var i = 0; i <= loopLength-1; i++) {
      var randomNumber = Math.floor(Math.random() * charInfo['all'].length);
      newPassword += charInfo['all'].substring(randomNumber, randomNumber +1);
    }
  }
  
  return newPassword
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  //window.alert(password)

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
