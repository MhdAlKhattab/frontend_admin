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
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('permission', data.permission);
                $(location).attr('href', 'deposit.html');
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
                $(location).attr('href', 'login.html');
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
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            type: "POST",
            data: $("#changePasswordForm").serialize(),
            dataType: "json",
            success: function (data) {
                localStorage.setItem('access_token', data.access_token);
                $(location).attr('href', 'control.html');
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
    // $("#checkOut").click(function (e) {
    //     e.preventDefault();
    //     $.ajax({
    //         url: "http://127.0.0.1:8000/api/logout",
    //         headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
    //         dataType: "json",
    //         success: function (data) {
    //             localStorage.removeItem('access_token');
    //             localStorage.removeItem('withdraw-method');
    //             localStorage.removeItem('withdraw-amount');
    //             localStorage.removeItem('deposit-method');
    //             localStorage.removeItem('deposit-amount');
    //             $(location).attr('href', 'login.html');
    //         },
    //         error: function (error) {
    //         }
    //     });
    // });
});