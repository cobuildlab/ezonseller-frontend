//validate Form Register
$( "body" ).mousemove(function( event ) {

    jQuery.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[a-zA-Z ]{2,30}$/i.test(value);
    }, "Letters only please"); 

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
        $('#image_form').val('1');
        }
    });

    $("#formChangePassword").validate({
        submitHandler: function(form) {
        $('#changePassword_form').val('1');
        }
    });

    $("#formEditPassword").validate({
        submitHandler: function(form) {
        $('#editPassword_form').val('1');
        }
    });

    $("#formCreditCard").validate({
        submitHandler: function(form) {
            $('#creditCard_form').val('1');
        },
			rules: {
				name: {
                    required: true,
                    lettersonly: true 
                },
				number_card: {
                    required: true,
                    creditcard: true
                },
				cod_security: {
					required: true,
                    minlength: 3,
                    maxlength: 4,
                    number: true
				},
				year: {
					required: true,
					minlength: 2,
                    maxlength: 2,
                    number: true,
                    range: [18, 40]
				},
				month: {
					required: true,
					minlength: 2,
                    maxlength: 2,
                    number: true,
                    range: [01, 12]
				}
			},
			messages: {
				month: {
					range: "Month invalid"
                },
                year: {
					range: "Year invalid"
				}
            }
        });

        $("#myFormCancel").validate({
            submitHandler: function(form) {
            }
        });
    
        $("#myFormPurchasePlan").validate({
            submitHandler: function(form) {
        },
        rules: {
            card: {
            required: true
            }
        }
    });    
});