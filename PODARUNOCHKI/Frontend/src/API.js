var API_URL = "http://localhost:3050";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        success: function (data) {
            callback(null, data);
        },
        error: function () {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
   
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
            callback(null, data);
        },
        error: function () {
            callback(new Error("Ajax Failed"));
        }
    })
}


exports.getBoxList = function (callback) {
    backendGet("/api/get-box-list/", callback);
};

exports.getCommentsList = function (callback) {
    backendGet("/api/get-comment-list/", callback);
};

exports.createOrder = function (order_info, callback) {
    backendPost("/api/create-order/", order_info, callback);
};

exports.createUser = function (user, call_back) {
    backendPost("/signUpPage.html", user, call_back);
}

exports.createComment = function (comment, call_back) {
    backendPost("/", comment, call_back);
}

exports.checkUserInSystem = function (user_data, callback) {
    backendPost("/login.html", user_data, callback);
}

exports.createOrder = function (payment_info, callback) {
    backendPost("/api/create-order/", payment_info, callback);
};

exports.getItemList = function (callback) {
    backendGet("/api/get-item-list/", callback);
};