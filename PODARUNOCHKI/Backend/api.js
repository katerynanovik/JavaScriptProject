/**
 * Created by chaika on 09.02.16.
 */

// const PUBLIC_KEY = 'sandbox_i92197953769';
// const PRIVATE_KEY = 'sandbox_e4zCdTQrK15rQNwJponDUuzPTaEao4w2ChDVrq4l';
const bcrypt = require('bcrypt');
const mysql = require("mysql");
var array = [];
const sql = "INSERT INTO users(login, email, password) VALUES(?, ?, ?)";
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "usersdb",
    password: "FIAM2001zxc<3",
    timezone: "local"
});

connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});




exports.createUser = function (req, res) {
    let user = req.body;
    let hash = bcrypt.hashSync(user.password, 10);
    console.log(user.password);
    console.log(hash);
    let db_user = [user.login, user.email, hash];
    if (array.includes(user)) {
        res.send('user exist');
    } else {
        connection.query(sql, db_user, function (err, results) {
            if (err) console.log(err);
            else console.log("Данные добавлены");
        });
        array.push(user);
        res.send(array);
    }
}

exports.checkUserInSystem = function (req, res) {
    let user = req.body;
    let exist = false;
    connection.query("SELECT * FROM users",
        function (err, results, fields) {
            console.log(err);
            console.log(results);
            if (results.length === 0) {
                console.log('Db is empty');
                res.send([]);
                return;
            }
            console.log(results[0].password);
            console.log(user.password);
            if (results[0].email === user.email && bcrypt.compareSync(user.password, results[0].password)) {
                console.log('Match');
                exist = true;
                user.name = results[0].name;
                res.send(user);
                return true;
            }
            else {
                console.log('Does not Match');
                res.send([]);
                return false;
            }
        });
        
}



var Box_List = require('./data/Box_List');
exports.getBoxList = function(req, res) {
    res.send(Box_List);
};

var Items_List = require('./data/Items_List');
exports.getItemList = function(req, res) {
    res.send(Items_List);
};

// var crypto	= require('crypto');
// function sha1(string)	{
//     var sha1 = crypto.createHash('sha1');
//     sha1.update(string);
//     return	sha1.digest('base64');
// }
// function	base64(str)	 {
//     return	new	Buffer(str).toString('base64');
// }


// exports.createOrder = function(req, res) {
//     var order_info = req.body;

//     function calculateTotalSum(order_info) {
//         let pizzas = order_info.pizzas;
//         let sum = 0;
//         for (let i = 0; i < pizzas.length;i++){
//             if (pizzas[i].size === 'big_size'){
//                 sum += pizzas[i].pizza.big_size.price * pizzas[i].quantity;
//             }
//             else{
//                 sum += pizzas[i].pizza.small_size.price * pizzas[i].quantity;
//             }
//         }
//         return sum;
//     }
//     function parse_order_info(order_info) {
//         let str = '';
//         let pizzas = order_info.pizzas;
//         str += order_info.login + ", " + order_info.phoneNumber + ", " + order_info.address + "\n";
//         for (let i = 0; i < pizzas.length;i++){
//             str += pizzas[i].pizza.title + " - " + pizzas[i].size + "\n";
//         }
//         return str;
//     }

//     let sum = calculateTotalSum(order_info);
//     let parse_order = parse_order_info(order_info);
//     console.log(sum);
//     console.log(parse_order);
//     var order	=	{
//         version:	3,
//         public_key:	PUBLIC_KEY,
//         action:	"pay",
//         amount:	sum,
//         currency:	"UAH",
//         description:parse_order,
//         order_id:	Math.random(),
// //!!!Важливо щоб було 1,	бо інакше візьме гроші!!!
//         sandbox:	1
//     };
//     var data	=	base64(JSON.stringify(order));
//     var signature	=	sha1(PRIVATE_KEY + data + PRIVATE_KEY);
//     var receipt = {
//         data: data,
//         signature: signature
//     }
//     res.send(receipt);
// };