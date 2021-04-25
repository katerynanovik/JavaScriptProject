/**
 * Created by chaika on 09.02.16.
 */
exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'подаруночки'
    });
};

exports.signUpPage = function(req, res) {
    res.render('signUpPage', {
        pageTitle: 'Реєстрація'
    });
};

exports.loginPage = function (req, res) {
    res.render('loginPage', {
        pageTitle: 'login'
    });
};

exports.createBox = function(req, res) {
    res.render('createBox', {
        pageTitle: 'створити бокс'
    });
};