/**
 * Created by chaika on 09.02.16.
 */

// const PUBLIC_KEY = 'sandbox_i92197953769';
// const PRIVATE_KEY = 'sandbox_e4zCdTQrK15rQNwJponDUuzPTaEao4w2ChDVrq4l';

const PUBLIC_KEY = 'sandbox_i63616199314';
const PRIVATE_KEY = 'sandbox_0nRaYEQsKbNSOdARlh3Jno9XlhwnddAdD8OiAop8';




var crypto = require('crypto');
const bcrypt = require('bcrypt');
const mysql = require("mysql");
var array = [];
var arrayComments = [];
const sql = "INSERT INTO users(login, email, password) VALUES(?, ?, ?)";
const sqlComment = "INSERT INTO comment(login, comment) VALUES(?, ?)";

const connectionComments = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "comments",
    password: "FIAM2001zxc<3",
    timezone: "local"
});

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "usersdb",
    password: "FIAM2001zxc<3",
    timezone: "local"
});

connectionComments.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL (комментарии) успешно установлено");
    }
});

connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});





exports.createComment = function (req, res) {
    
    let comment = req.body;
    var login;
    connection.query("SELECT login FROM users where email='" + comment.email+"'",
        function (err, results, fields) {
            console.log(err);
            console.log(results);
            if (results.length === 0) {
                console.log('Db is empty');
                res.send([]);
                return;
            }
            else {
               login=results[0].login;
                let db_comment = [login, comment.commentText];
                connectionComments.query(sqlComment, db_comment, function (err, results) {
                    if (err) console.log(err);
                    else console.log("Данные добавлены");
                });
                comment.login = login;
                arrayComments.push(comment);
                res.send(arrayComments);
            }
        });
    
      
  
    
}


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


exports.getCommentsList= function (req,res){
    connectionComments.query("SELECT * FROM comment",
        function (err, results, fields) {
            
            if (results.length === 0) {
                // console.log('Db is empty');
                res.send([]);
                return;
            }
            else{
                res.send(results);
            }
        });
}

exports.checkUserInSystem = function (req, res) {
    let user = req.body;
    
    connection.query("SELECT * FROM users where email='"+user.email+"'",
        function (err, results, fields) {
            // console.log(err);
            // console.log(results);
            if (results.length === 0) {
                // console.log('Db is empty');
                res.send([]);
                return;
            }
            // console.log(results[0].password);
            // console.log(user.password);
            if (results[0].email === user.email && bcrypt.compareSync(user.password, results[0].password)) {
                // console.log('Match');
                
                user.name = results[0].name;
                res.send(user);
                
            }
            else {
                // console.log('Does not Match');
                res.send([]);
                
            }
        });
        
}



var Box_List = require('./data/Box_List');
exports.getBoxList = function(req, res) {
    res.send(Box_List);
};

var Items_List = require('./data/Items_List');
exports.getItemList = function (req, res) {
    res.send(Items_List);
};

var crypto = require('crypto');
function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}
function base64(str) {
    return new Buffer(str).toString('base64');
}


exports.createOrder = function (req, res) {
    var order_info = req.body;

    function calculateTotalSum(order_info) {
        let cart = order_info.cart;
        let sum = 0;
        for (let i = 0; i < cart.length; i++) {
           sum+=cart[i].box.price;
        }
        return sum;
    }
    function parse_order_info(order_info) {
        let str = '';
        let cart = order_info.cart;
        str += order_info.name + ", " + order_info.phoneNumber + ", " + order_info.address + "\n";
        for (let i = 0; i < cart.length; i++) {
            str += cart[i].box.title + "\n";
        }
        return str;
    }

    let sum = calculateTotalSum(order_info);
    let parse_order = parse_order_info(order_info);
    console.log(sum);
    console.log(parse_order);
    var order = {
        version: 3,
        public_key: PUBLIC_KEY,
        action: "pay",
        amount: sum,
        currency: "UAH",
        description: parse_order,
        order_id: Math.random(),
        //!!!Важливо щоб було 1,	бо інакше візьме гроші!!!
        sandbox: 1
    };
    var data = base64(JSON.stringify(order));
    var signature = sha1(PRIVATE_KEY + data + PRIVATE_KEY);
    var receipt = {
        data: data,
        signature: signature
    }
    res.send(receipt);
};