//validate Form Register
setTimeout(function(){ 
    $().ready(function() {
        console.log(1);
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

        $("#myFormEditProfile").validate({
            submitHandler: function(form) {
            $('#editProfile_form').val('1');
            }
        });

        $("#myFormImage").validate({
            submitHandler: function(form) {
            console.log(1)    
            $('#image_form').val('1');
            }
        });

        $("#formChangePassword").validate({
            submitHandler: function(form) {
            console.log(1)    
            $('#changePassword_form').val('1');
            }
        });

        $("#formEditPassword").validate({
            submitHandler: function(form) {
            console.log(1)    
            $('#editPassword_form').val('1');
            }
        });
        
        
    });
}, 3000); 