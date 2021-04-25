var API = require('../API');
var exist=false;

function sendToBack(error, data) {
    if (!error) {
        let user = data;
        console.log("Data from bacK: " + user.email);
        console.log(user);
        if (user.email) {
            console.log('200 OK');
            exist = true;
            window.location.href = 'http://localhost:3050';
            sessionStorage.setItem('user', JSON.stringify(user));
            console.log(sessionStorage.getItem('user'));
          
        }
        else {
            console.log('user does not exist');
      
        }
    }
    else {
        console.log('error');
    }
}

$('#sendUserData').on('click', function () {
    var email = $('#email').val();
    var password = $('#password').val();
    var user_data = {
        email: email,
        password: password
    }
    console.log(user_data);
    API.checkUserInSystem(user_data, sendToBack);
  
        
        
});

