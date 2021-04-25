const API = require('../API');
var email;
var login;
var password;
var code;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    //max & min inclusive
}

function sendMail(login, email) {
    const code = getRandomInt(0, 9999);
    Email.send({
        Host: "smtp.gmail.com",
        Username: "podarunochkiservice@gmail.com",
        Password: "PodarunochkiService1<>",
        To: email,
        From: "podarunochkiservice@gmail.com",
        Subject: "Verification Letter",
        Body: "Dear " + login + ",\r\n"
            + "You are registering at our website.\r\n"
            + "To confirm your email addres, please enter the following code:\r\n"
            + code,
    })
        .then(function (message) {
            
        });
    return code;
}

var user={};

$('#signUp').click(function () {
    login = $('#Login').val();
    user.login=login;
    email=$('#email').val();
    user.email=email;
    password = $('#Password').val();
    user.password=password;
    code = sendMail(login,email);
    $('#VerificationArea').css('display', 'block');
    $('#signUp').val('надіслати код повторно');
});

function sendToBack(error, data) {
    if (!error) {
        console.log(data);
        
    }
    else {
        console.log('error');
    }
}

$('#VerificationButton').click(function () {
   
    usersCode = $('#VerCode').val();
    if(usersCode==code){
        API.createUser(user, sendToBack);
    }
   
});

