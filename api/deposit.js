$(document).ready(function () {

    getAllDepositItems();
    getDepositState();

    $('#all').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getAllDepositItems();
    });

    $('#pendding').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getPenddingDepositItems();
    });

    $('#complete').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getCompleteDepositItems();
    });

    $('#canceled').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getCanceledDepositItems();
    });
    $('#on').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getOnDeposit();
    });
    $('#of').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getoffDeposit();
    });
    function getDepositState(){
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-deposit-state',
            type: 'GET',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
            dataType: 'json',
            success: function (data) {
                if(data.data == 1){
                    document.getElementById('on').style.display = "none"
                }
                else{
                    document.getElementById('of').style.display = "none"
                }
            },
            error: function () {
                console.log("Error");
            }
        });

    }
    function getOnDeposit() {

        $.ajax({
            url: 'http://127.0.0.1:8000/api/deposit-on',
            type: 'POST',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
            dataType: 'json',
            success: function () {
                alert("Deposits On..")
                location.reload();

            },
            error: function () {
                console.log("Error");
            }
        });
    }
    function getoffDeposit() {
        // e.preventDefault();

        $.ajax({
            url: 'http://127.0.0.1:8000/api/deposit-off',
            type: 'POST',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
            dataType: 'json',
            success: function () {
                alert("Deposits Off..")
                location.reload();


            },
            error: function () {
                console.log("Error");
            }
        });
    }


    //  Start Get All Deposit
    function getAllDepositItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-all-deposits',
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
            let state = '';
            let icon = '';

            if (items.data.length !== 0) {

                $.each(items.data, function (key, item) {

                    if (item.state == 0) {
                        icon = ``;
                    } else if (item.state == 1) {
                        icon = `<i class="fa fa-remove deleteDeposit" data-id="${item.id}"></i>`;

                    } else if (item.state == 2) {
                        icon = `<i class="fa fa-remove deleteDeposit" data-id="${item.id}"></i>`;
                    } else {
                        icon = ``;
                    }

                    if (item.state == 0) {
                        state = `
                            <div class="footer">
                                <button class="btn btn-danger canceledButton" data-toggle="modal" data-target=".modal3" data-id="${item.id}">Cancel</button>
                                <button class="btn btn-success acceptButton" data-toggle="modal" data-target=".modal4" data-id="${item.id}">Accept</button>
                            </div>
                        `;
                    } else {
                        state = '';
                    }

                    output += `

                    <div class="card user">
                        ` + icon + `
                        <img data-enlargable width="100" src="http://127.0.0.1:8000/storage/deposit_images/${item.photo}" />
                        <h3 class="text-center">${item.user.first_name} ${item.user.last_name} </h3>
                        <div class="row">
                            <h5 class="col-xs-4">Amount:</h5>
                            <h5 class="col-xs-8">${item.amount}$</h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Process Id:</h5>
                            <h5 class="col-xs-8">${item.proccess_id} </h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Wallet:</h5>
                            <h5 class="col-xs-8">${item.wallet} </h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Method:</h5>
                            <h5 class="col-xs-8">${item.method}</h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Date</h5>
                            <h5 class="col-xs-8">${item.created_at.substring(0, 10)}</h5>
                        </div>

                        ` + state + `

                    </div>
                    `;

                });

                $('#admin-deposit').empty().append(output);
            } else {
                $('#admin-deposit').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
            }

        });
    }
    //  End Get All Deposit

    //  Start Get Pendding Deposit
    function getPenddingDepositItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-pending-deposits',
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

                    <div class="card user">
                        <img data-enlargable width="100" src="http://127.0.0.1:8000/storage/deposit_images/${item.photo}" />
                        <h3 class="text-center">${item.user.first_name} ${item.user.last_name} </h3>
                        <div class="row">
                            <h5 class="col-xs-4">Amount:</h5>
                            <h5 class="col-xs-8">${item.amount}$</h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Process Id:</h5>
                            <h5 class="col-xs-8">${item.proccess_id} </h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Wallet:</h5>
                            <h5 class="col-xs-8">${item.wallet} </h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Method:</h5>
                            <h5 class="col-xs-8">${item.method}</h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Date</h5>
                            <h5 class="col-xs-8">${item.created_at.substring(0, 10)}</h5>
                        </div>

                        <div class="footer">
                            <button class="btn btn-danger canceledButton" data-toggle="modal" data-target=".modal3" data-id="${item.id}">Cancel</button>
                            <button class="btn btn-success acceptButton" data-toggle="modal" data-target=".modal4" data-id="${item.id}">Accept</button>
                        </div>
                    </div>
                    `;

                });

                $('#admin-deposit').empty().append(output);
            } else {
                $('#admin-deposit').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
            }

        });
    }
    //  End Get Pendding Deposit

    //  Start Get Complete Deposit
    function getCompleteDepositItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-complate-deposits',
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

                    <div class="card user">
                        <i class="fa fa-remove deleteDeposit" data-id="${item.id}"></i>
                        <img data-enlargable width="100" src="http://127.0.0.1:8000/storage/deposit_images/${item.photo}" />
                        <h3 class="text-center">${item.user.first_name} ${item.user.last_name} </h3>
                        <div class="row">
                            <h5 class="col-xs-4">Amount:</h5>
                            <h5 class="col-xs-8">${item.amount}$</h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Process Id:</h5>
                            <h5 class="col-xs-8">${item.proccess_id} </h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Wallet:</h5>
                            <h5 class="col-xs-8">${item.wallet} </h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Method:</h5>
                            <h5 class="col-xs-8">${item.method}</h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Date</h5>
                            <h5 class="col-xs-8">${item.created_at.substring(0, 10)}</h5>
                        </div>
                    </div>
                    `;

                });

                $('#admin-deposit').empty().append(output);
            } else {
                $('#admin-deposit').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
            }

        });
    }
    //  End Get Complete Deposit

    //  Start Get Canceled Deposit
    function getCanceledDepositItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-canceled-deposits',
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

                    <div class="card user">
                        <i class="fa fa-remove deleteDeposit" data-id="${item.id}"></i>
                        <img data-enlargable width="100" src="http://127.0.0.1:8000/storage/deposit_images/${item.photo}" />
                        <h3 class="text-center">${item.user.first_name} ${item.user.last_name} </h3>
                        <div class="row">
                            <h5 class="col-xs-4">Amount:</h5>
                            <h5 class="col-xs-8">${item.amount}$</h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Process Id:</h5>
                            <h5 class="col-xs-8">${item.proccess_id} </h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Wallet:</h5>
                            <h5 class="col-xs-8">${item.wallet} </h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Method:</h5>
                            <h5 class="col-xs-8">${item.method}</h5>
                        </div>
                        <div class="row">
                            <h5 class="col-xs-4">Date</h5>
                            <h5 class="col-xs-8">${item.created_at.substring(0, 10)}</h5>
                        </div>
                    </div>
                    `;

                });

                $('#admin-deposit').empty().append(output);
            } else {
                $('#admin-deposit').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
            }

        });
    }
    //  End Get Canceled Deposit



    // On Accept click
    $('body').on('click', '.acceptButton', function (e) {
        e.preventDefault();

        localStorage.setItem('deposit_card_id', $(this).data('id'))
    });

    // On Cancele click
    $('body').on('click', '.canceledButton', function (e) {
        e.preventDefault();

        localStorage.setItem('deposit_card_id', $(this).data('id'))
    });

    // Accept Deposit
    $("#acceptForm").submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: "http://127.0.0.1:8000/api/accept-deposit/" + localStorage.getItem('deposit_card_id'),
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
            type: "POST",
            data: $("#acceptForm").serialize(),
            dataType: 'JSON',
            success: function (data) {
                localStorage.removeItem('deposit_card_id');
                location.reload();
            },
            error: function () {
                console.log("Error");
            }
        });
    });

    // Cancel Deposit
    $("#canceledFrom").submit(function (e) {
        e.preventDefault();

        $.ajax({
            url: "http://127.0.0.1:8000/api/cancel-deposit/" + localStorage.getItem('deposit_card_id'),
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
            type: "POST",
            data: $("#canceledFrom").serialize(),
            dataType: 'JSON',
            success: function (data) {
                localStorage.removeItem('deposit_card_id');
                location.reload();

            },
            error: function () {
                console.log("Error");
            }
        });
    });


    //Delete Deposit 
    $('body').on('click', '.deleteDeposit', function (e) {
        e.preventDefault();

        localStorage.setItem('Deposit_card_id', $(this).data('id'));
        $.ajax({
            url: 'http://127.0.0.1:8000/api/delete-deposit/' + localStorage.getItem('Deposit_card_id'),
            type: 'DELETE',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
            dataType: 'json',
            success: function (data) {
                localStorage.removeItem('Deposit_card_id');
                alert("Deleted Successfully..")
                location.reload();

            },
            error: function () {
                console.log("Error");
            }
        });
    });

});