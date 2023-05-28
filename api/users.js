$(document).ready(function () {

    getAllUsersItems();

    $('#all').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getAllUsersItems();
    });

    $('#users').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getUsersItems();
    });

    $('#admins').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getAdminItems();
    });


    //  Start Get All Users and Admin
    function getAllUsersItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-all-users',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
            dataType: 'json',
            success: function (data) {
                console.log('access');
            },
            error: function () {
                console.log('false');
            },
        }).done(function (items) {
            let output = '';
            let permission = '';
            let icon = '';

            if (items.data.length !== 0) {

                $.each(items.data, function (key, item) {

                    if (item.permission == 2 || item.permission == 1) {
                        permission = `
                        <button class="btn btn-danger removeAdmin" data-id="${item.id}">Remove Admin</button>
                        `;
                        icon = `                        
                        <i class=" text-center fa fa-group"></i>
                        `;
                    } else {
                        permission = '';
                        icon = `                        
                        <i class=" text-center fa fa-user"></i>
                        `;
                    }

                    output += `

                    <div class="user card ">
                    ` + icon + `
                    <div class="user-info">
                        <div class="row">
                            <h5 class="col-xs-4">Name:</h5><h5 class="col-xs-8">${item.first_name} ${item.last_name}</h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Username:</h5><h5 class="col-xs-8">${item.user_name}</h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Email:</h5><h5 class="col-xs-8">${item.email}</h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Number:</h5><h5 class="col-xs-8">${item.contury_number}${item.phone_number}</h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Date:</h5><h5 class="col-xs-8">${item.created_at}</h5>
                        </div>
                    </div>
    
                     ` + permission + `

                    </div>
                    `;

                });

                $('#admin-users').empty().append(output);
            } else {
                $('#admin-users').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
            }

        });
    }
    //  End Get All Users and Admin

    //  Start Get Users
    function getUsersItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-normal-users',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
            dataType: 'json',
            success: function (data) {
                console.log('access');
            },
            error: function () {
                console.log('false');
            },
        }).done(function (items) {
            let output = '';

            if (items.data.length !== 0) {

                $.each(items.data, function (key, item) {

                    output += `
                    <div class="user card ">
                        <i class=" text-center fa fa-user"></i>
                        <div class="user-info">
                            <div class="row">
                                <h5 class="col-xs-4">Name:</h5><h5 class="col-xs-8">${item.first_name} ${item.last_name}</h5>
                            </div>
                            <div class="row">
                                <h5 class="col-xs-4">Username:</h5><h5 class="col-xs-8">${item.user_name}</h5>
                            </div>
                            <div class="row">
                                <h5 class="col-xs-4">Email:</h5><h5 class="col-xs-8">${item.email}</h5>
                            </div>
                            <div class="row">
                                <h5 class="col-xs-4">Number:</h5><h5 class="col-xs-8">${item.contury_number}${item.phone_number}</h5>
                            </div>
                            <div class="row">
                                <h5 class="col-xs-4">Date:</h5><h5 class="col-xs-8">${item.created_at}</h5>
                            </div>
                        </div>
                    </div>
                    `;

                });

                $('#admin-users').empty().append(output);
            } else {
                $('#admin-users').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
            }

        });
    }
    //  End Get Users

    //  Start Get Admin
    function getAdminItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-admin-users',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
            dataType: 'json',
            success: function (data) {
                console.log('access');
            },
            error: function () {
                console.log('false');
            },
        }).done(function (items) {
            let output = '';

            if (items.data.length !== 0) {

                $.each(items.data, function (key, item) {

                    output += `

                    <div class="user card ">
                        <i class=" text-center fa fa-group"></i>
                        <div class="user-info">
                            <div class="row">
                                <h5 class="col-xs-4">Name:</h5><h5 class="col-xs-8">${item.first_name} ${item.last_name}</h5>
                            </div>
                            <div class="row">
                                <h5 class="col-xs-4">Username:</h5><h5 class="col-xs-8">${item.user_name}</h5>
                            </div>
                            <div class="row">
                                <h5 class="col-xs-4">Email:</h5><h5 class="col-xs-8">${item.email}</h5>
                            </div>
                            <div class="row">
                                <h5 class="col-xs-4">Number:</h5><h5 class="col-xs-8">${item.contury_number}${item.phone_number}</h5>
                            </div>
                            <div class="row">
                                <h5 class="col-xs-4">Date:</h5><h5 class="col-xs-8">${item.created_at}</h5>
                            </div>
                        </div>
                        <button class="btn btn-danger removeAdmin" data-id="${item.id}">Remove Admin</button>
                    </div>
                    `;

                });

                $('#admin-users').empty().append(output);
            } else {
                $('#admin-users').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
            }

        });
    }
    //  End Get Admin


    // On Remove click
    $('body').on('click', '.canceledButton', function (e) {
        e.preventDefault();

        localStorage.setItem('admin_card_id', $(this).data('id'))
    });

    // Remove Admin
    $('body').on('click', '.removeAdmin', function (e) {
        e.preventDefault();

        localStorage.setItem('admin_card_id', $(this).data('id'));
        $.ajax({
            url: 'http://127.0.0.1:8000/api/admin/' + localStorage.getItem('admin_card_id'),
            type: 'DELETE',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
            dataType: 'json',
            success: function (data) {
                localStorage.removeItem('admin_card_id');
                alert("Deleted Successfully..")
                location.reload();

            },
            error: function () {
                console.log("Error");
            }
        });
    });
    

    //Add Admin
    $("#addAdmin").submit(function (e) {
        e.preventDefault();
        var data = new FormData(this);

        $.ajax({
            url: "http://127.0.0.1:8000/api/admin",
            type: 'POST',
            data: data,
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function (data) {
                console.log("good")
                alert("Added Successfully..")
                location.reload()
            },
            error: function () {
                console.log("bad")
            }
        });
    });


});