//validate Form Register
$("body").mousemove(function (e) {
    $("iframe").width(678), jQuery.validator.addMethod("lettersonly", function (e, r) {
        return this.optional(r) || /^[a-zA-Z ]{2,30}$/i.test(e)
    }, "Letters only please"), jQuery.validator.addMethod("passwordSecurity", function (e, r) {
        return this.optional(r) || /^(([a-zA-Z]+\d+)|(\d+[a-zA-Z]+){8,15})[a-zA-Z0-9]*$/i.test(e)
    }, "The password must contain letters and numbers - minimum 8 and maximum 12 characters"), $("#commentForm").validate({
        submitHandler: function (e) {
            $("#register_form").val("1")
        },
        rules: {
            first_name: {required: !0, lettersonly: !0},
            last_name: {required: !0, lettersonly: !0},
            username: {required: !0},
            email: {required: !0, email: !0},
            password: {required: !0, passwordSecurity: !0},
            confirm_password: {required: !0, equalTo: "#password"},
            first_name_card: {required: !0, lettersonly: !0},
            last_name_card: {required: !0, lettersonly: !0},
            number_card: {required: !0, creditcard: !0},
            cod_security: {required: !0, minlength: 3, maxlength: 4, number: !0},
            year: {required: !0, minlength: 2, maxlength: 2, number: !0, range: [18, 40]},
            month: {required: !0, minlength: 2, maxlength: 2, number: !0, range: [1, 12]}
        },
        messages: {month: {range: "Month invalid"}, year: {range: "Year invalid"}}

    }), $("#forgotForm").validate({
        submitHandler: function (e) {
            $("#forgot_form").val("1")
        }
    }), $("#myFormEditProfile").validate({
        submitHandler: function (e) {
            $("#editProfile_form").val("1")
        }
    }), $("#myFormImage").validate({
        submitHandler: function (e) {
            $("#image_form").val("1")
        }
    }), $("#formChangePassword").validate({
        submitHandler: function (e) {
            $("#changePassword_form").val("1")
        }
    }), $("#formEditPassword").validate({
        submitHandler: function (e) {
            $("#editPassword_form").val("1")
        }, rules: {old_password: {required: !0}, new_password: {required: !0, passwordSecurity: !0}}
    }), $("#formEditCreditCard").validate({
        submitHandler: function (e) {
            $("#creditCard_form").val("1")
        },
        rules: {
            first_name: {required: !0, lettersonly: !0},
            last_name: {required: !0, lettersonly: !0},
            number_card: {required: !0, creditcard: !0},
            cod_security: {required: !0, minlength: 3, maxlength: 4, number: !0},
            year: {required: !0, minlength: 2, maxlength: 2, number: !0, range: [18, 40]},
            month: {required: !0, minlength: 2, maxlength: 2, number: !0, range: [1, 12]}
        },
        messages: {month: {range: "Month invalid"}, year: {range: "Year invalid"}}
    }), $("#formCreditCard").validate({
        submitHandler: function (e) {
            $("#creditCard_form").val("1")
        },
        rules: {
            first_name: {required: !0, lettersonly: !0},
            last_name: {required: !0, lettersonly: !0},
            number_card: {required: !0, creditcard: !0},
            cod_security: {required: !0, minlength: 3, maxlength: 4, number: !0},
            year: {required: !0, minlength: 2, maxlength: 2, number: !0, range: [18, 40]},
            month: {required: !0, minlength: 2, maxlength: 2, number: !0, range: [1, 12]}
        },
        messages: {month: {range: "Month invalid"}, year: {range: "Year invalid"}}
    }), $("#myFormCancel").validate({
        submitHandler: function (e) {
            $("#cancel_form").val("1")
        }
    }), $("#formAmazonKey").validate({
        submitHandler: function (e) {
        }, rules: {country_id: {required: !0}}
    }), $("#myFormSupport").validate({
        submitHandler: function (e) {
            $("#support_form").val("1")
        }, rules: {email: {required: !0, email: !0}}
    }), $("#myFormPurchasePlan").validate({
        submitHandler: function (e) {
        }, rules: {card: {required: !0}, id_card: {required: !0}}
    }), $("#myFormPurchasePlan").validate()
});