$(document).ready(function () {


    // Login
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "http://127.0.0.1:8000/api/admin-login",
            type: "POST",
            data: $("#loginForm").serialize(),
            dataType: 'JSON',
            success: function (data) {
                localStorage.setItem('access_token_admin', data.access_token);
                localStorage.setItem('permission', data.permission);
                $(location).attr('href', 'statisitics.html');
            },
            error: function () {
                $('.error-message').empty().append('<span class="badge badge-danger">Invalid login details</span>');
            }
        });
    });

    // Forget My Password
    $("#forgetForm").submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "http://127.0.0.1:8000/api/forget-password",
            type: "POST",
            data: $("#forgetForm").serialize(),
            dataType: 'JSON',
            success: function (data) {
                console.log("yeees");
                $(location).attr('href', 'reset-password.html');
            },
            error: function (error) {
                $('.error-message').empty().append('<span class="badge badge-danger">User Does not Exists</span>');
            }
        });
    });

    // Reset Password
    $("#resetPasswordForm").submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "http://127.0.0.1:8000/api/reset-password",
            type: "POST",
            data: $("#resetPasswordForm").serialize(),
            dataType: 'JSON',
            success: function (data) {
                console.log("yeees");
                $(location).attr('href', 'index.html');
            },
            error: function (error) {
                output = '';
                if (error.responseJSON.errors) {
                    for (var er in error.responseJSON.errors) {
                        output += `
                            ${error.responseJSON.errors[er][0]}
                            <br>
                        `;
                    }
                } else {
                    output = error.responseJSON.data;
                }

                $('.error-message').empty().append('<span class="badge badge-danger">' + output + '</span>');
            }
        });
    });

    // Change Password
    $("#changePasswordForm").submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "http://127.0.0.1:8000/api/change-password",
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
            type: "POST",
            data: $("#changePasswordForm").serialize(),
            dataType: "json",
            success: function (data) {                
                $(location).attr('href', 'deposit.html');
            },
            error: function (error) {
                output = '';
                if (error.responseJSON.errors) {
                    for (var er in error.responseJSON.errors) {
                        output += `
                            ${error.responseJSON.errors[er][0]}
                            <br>
                        `;
                    }
                } else {
                    output = error.responseJSON.data;
                }

                $('.error-message').empty().append('<span class="badge badge-danger">' + output + '</span>');

            }
        });
    });

    // Check Out
    $("#checkOut").click(function (e) {
        e.preventDefault();
        console.log("hellllo");
        $.ajax({
            url: "http://127.0.0.1:8000/api/logout",
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
            dataType: "json",
            success: function (data) {
                localStorage.removeItem('access_token_admin');
                localStorage.removeItem('permission-method');
                localStorage.removeItem('deposit_card_id');
                localStorage.removeItem('withdraw_card_id');
                localStorage.removeItem('investment_card_id');
                $(location).attr('href', 'index.html');
            },
            error: function (error) {
            }
        });
    });
});