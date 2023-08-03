// First Page

// Transformation to the Sign-up Page 
const transferPage = () => {
  location.href = '/signup'
}


// This function checks for validation info such as email and password
const checkValidUser = () => {
  let emailUser = document.getElementById('emailUser').value;
  let passwordUser = document.getElementById('passwordUser').value;
  if (emailUser.indexOf('@') == -1) {
    alert('The email adress does not contain the \'@\' special character.')
  }
  else if (passwordUser.length < 5 || passwordUser.length > 9) {
    alert('The password length should be between 5 and 9 characters')
  }
  else {
    // Fetch sends a request to the server, and the user's email and password
    // are located in the body of the request. The server performs a check, and if the user exist,
    // it returns true and the user's name. If the user does not exist, it returns
    // the user an alert that the user does not exist.
    // also making an transformation from object to json
    fetch('/check', {
      headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify({
        emailUser,
        passwordUser
      })
    })

      .then(res => res.json())

      .then((data) => {
        if (data.result == true) {
          userConnected = data.name
          sessionStorage.setItem('user', userConnected)
          location.href = '/products'
        }
        else {
          alert('Access to the product page was denied')
        }

      })
      .catch((err) => {
        console.log(err);
      })

  }
}


// --------------------------------

// Second Page

// This function meant to add a new user and also validations such as
// password lengths, Special characters and user lengths.
const addUser = () => {
  let nameUser = document.getElementById('nameUser').value;
  let emailUser = document.getElementById('emailUser').value;
  let passwordUser = document.getElementById('passwordUser').value;
  if (nameUser.length < 2 || nameUser.length > 6) {
    alert('The user input does not meet the required criteria of being between 2 to 6 characters')
  }
  else if (emailUser.indexOf('@') == -1) {
    alert('Email should contain @ symbol')
  }
  else if (passwordUser.length < 5 || passwordUser.length > 9) {
    alert('Email should be between 5 and 9 characters')
  }
  else {

    // This fetch request send to the server the user info such as Email and Password
    // And then transfer them to the server, The server check if the sertion info does not
    // exist to other user and if it does not exist it add the user to the system and 
    // returns True as a result and if not it will return an alert to the user as False.
    fetch('/addUser', {
      headers: { "Accept": 'application/json', 'Content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify({
        nameUser,
        emailUser,
        passwordUser
      })
    })

      .then(res => res.json())

      .then((data) => {
        if (data.result == true) {
          location.href = '/'
        }
        else {
          alert('Sorry, your email address is already registered in our system. Please try using a different email or login to your existing account')
        }

      })
      .catch((err) => {
        console.log(err);
      })

  }

}


// --------------------------------
// Third Page
// is on ivdividual JS file



// --------------------------------
// Fourth Page
// is on ivdividual JS file
