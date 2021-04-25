
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs=require('fs');
var ejs=require('ejs');
let urlencodeParser = bodyParser.urlencoded({ extended: false });

function configureEndpoints(app) {
    var pages = require('./pages');
    var api=require('./api')


   
    //Налаштування URL за якими буде відповідати сервер
    //Отримання списку піц
    app.get('/api/get-box-list/', api.getBoxList);

    app.get('/api/get-item-list/', api.getItemList);

    //Сторінки
    //Головна сторінка
    app.get('/', pages.mainPage);
    app.post('/', api.checkUserInSystem);

    app.get('/createBox.html', pages.createBox);


   

    app.get('/signUpPage.html', pages.signUpPage);

    
    app.get('/login.html', pages.loginPage);
    app.post('/login.html', api.createUser);

  



    //Якщо не підійшов жоден url, тоді повертаємо файли з папки www
    app.use(express.static(path.join(__dirname, '../Frontend/www')));
}

function startServer(port) {
    //Створюється застосунок
    var app = express();

    //Налаштування директорії з шаблонами
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //Налаштування виводу в консоль списку запитів до сервера
    app.use(morgan('dev'));

    //Розбір POST запитів
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Налаштовуємо сторінки
    configureEndpoints(app);
    //Запуск додатка за вказаним портом
    app.listen(port, function () {
        console.log('My Application Running on http://localhost:' + port + '/');
    });

    
}





exports.startServer = startServer;