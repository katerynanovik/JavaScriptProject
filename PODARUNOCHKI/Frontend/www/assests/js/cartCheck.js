//перевірка на коректність вводу в корзині

document.getElementById('submit-order').disabled=true;



var bool1=false;
var bool2=false;
var bool3=false;

$("#NameField").keyup(function(){
    if (this.value.length >= 6){
        $("#name").css("color","green");
        $("#nameError").text("");
       bool1=true;
       if(bool1&&bool2&&bool3)
        document.getElementById("submit-order").disabled = false;

    } else {
        $("#name").css("color","red");
        $("#nameError").text("* ПІБ введено некоректно");
        $("#nameError").css("color","red");
        bool1=false;
        document.getElementById("submit-order").disabled = true;
    }
});


$("#PhoneField").keyup(function(){
    if (!this.value.match("^([+380|\\+[0-9]{1,9})?([7-9][0-9]{9}[0-9])$")){
        $("#phone").css("color","red");
        $("#phoneError").text("* Номер телефону введено некоректно");
        $("#phoneError").css("color","red");
        bool2=false;
        document.getElementById("submit-order").disabled = true;

    }
    else {
        $("#phone").css("color","green");
        $("#phoneError").text("");
        bool2=true;
        if(bool1&&bool2&&bool3)
        document.getElementById("submit-order").disabled = false;

    }
});

$('#BuyMenu').click(function name(params) {
  
    bool3=true;
    document.getElementById("submit-order").disabled = false;
if ($('input[name=contact]:checked').length == 0) {
    bool3=false;
    document.getElementById("submit-order").disabled = true;
}
});


