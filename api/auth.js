$(document).ready(function () {


    // Login
    $("#loginForm").submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "http://127.0.0.1:8000/api/login",
            type: "POST",
            data: $("#loginForm").serialize(),
            dataType: 'JSON',
            success: function (data) {
                localStorage.setItem('access_token', data.access_token);
                $(location).attr('href', 'users.html');
            },
            error: function () {
                $('.error-message').empty().append('<span class="badge badge-danger">Invalid login details</span>');
            }
        });
    });

    // Change Passport
    // $("#changePassportForm").submit(function (e) {
    //     e.preventDefault();

    //     $.ajax({
    //         url: "http://127.0.0.1:8000/api/change-password",
    //         headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
    //         type: "POST",
    //         data: $("#changePassportForm").serialize(),
    //         dataType: "json",
    //         success: function (data) {
    //             localStorage.setItem('access_token', data.access_token);
    //             $(location).attr('href', 'control.html');
    //         },
    //         error: function (error) {
    //             $('.error-message').empty().append('<span class="badge badge-danger">Invalid login details</span><br>');
    //         }
    //     });
    // });

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