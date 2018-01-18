
export const plusSlides = ()=>{
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

        $("#myFormimage").validate({
            submitHandler: function(form) {
            $('#image_form').val('1');
            }
        });

        

    });
}