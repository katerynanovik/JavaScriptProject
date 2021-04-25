const API = require('../API');
var Templates = require('../Templates');
var comment={};
var comment_list;
function sendToBack(error, data) {
    if (!error) {
        console.log('CommentData')
        console.log(data);
      
    }
    else {
        console.log('error');
    }
}

function initCommentList(error, data) {
 
    if (error == null) {
        var comment_list = data;
        showCommentList(comment_list);

    }
    else{
        console.log(error);
    }
}

function showCommentList(list){

   console.log(list);

    function showOneComment(Comment) {
        var html_code = Templates.CommentItem({ comment: Comment });

        var $node = $(html_code);


        $('#CommentsSection').append($node);
    }

    list.forEach(showOneComment);

}




$('#sendCommnet').click(function () {

    var commentText = $('#commentInput').val();
    var user = JSON.parse(sessionStorage.getItem('user'));
    comment.email = user.email;
    comment.commentText=commentText;
    
    API.createComment(comment, sendToBack);
    window.location.href = 'http://localhost:3050';

});

function initialiseComments() {
    if (sessionStorage.getItem('user') == null)
        document.getElementById('sendCommnet').disabled=true;
    else{
        $('#LoginOrLoged').html('Logged');
        $('#LoginOrLoged').click(function () {
            sessionStorage.removeItem('user');
            window.location.href = 'http://localhost:3050';
        });
        }
    API.getCommentsList(initCommentList);
}

exports.initialiseComments=initialiseComments;

