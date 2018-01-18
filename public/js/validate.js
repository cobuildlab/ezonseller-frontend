//validate Form Register
$().ready(function() {
    $("#commentForm").validate({
        submitHandler: function(form) {
        $('#register_form').val('1');
        }
    });

    $("#forgotForm").validate({
        submitHandler: function(form) {
        $('#forgot_form').val('1');
        }
    });
});
