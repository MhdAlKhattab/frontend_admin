$(document).ready(function () {

    getAllInvestmentItems();

    $('#all').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getAllInvestmentItems();
    });

    $('#pendding').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getPenddingInvestmentItems();
    });

    $('#progress').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getProgressInvestmentItems();
    });

    $('#complete').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getCompleteInvestmentItems();
    });

    $('#canceled').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active')
        getCanceledInvestmentItems();
    });

    //  Start Get All Investment
    function getAllInvestmentItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-all-investments',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
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
                        state = `<span class="Panding">Panding</span>`;
                        icon = ``;
                    } else if (item.state == 1) {
                        state = `<span class="Progress">In Progress</span>`;
                        icon = ``;

                    } else if (item.state == 2) {
                        state = `<span class="Canceled">Canceled</span>`;
                        icon = `<i class="fa fa-remove deleteInvensment" data-id="${item.id}"></i>`;
                    } else {
                        state = `<span class="Complete ">Complete</span>`;
                        icon = `<i class="fa fa-remove deleteInvensment" data-id="${item.id}"></i>`;
                    }

                    if (item.state == 0) {
                        st = `
                            <div class="footer">
                                <button class="btn btn-danger canceledButton" data-toggle="modal" data-target=".modal3" data-id="${item.id}">Cancel</button>
                                <button class="btn btn-success acceptButton" data-toggle="modal" data-target=".modal4" data-id="${item.id}">Accept</button>
                            </div>
                        `;
                    } else {
                        st = '';
                    }

                    output += `

                    <div class="card user">
                    ` + icon + `
                    <h3 class="text-center">${item.user.first_name} ${item.user.last_name} </h3>
        
                    <div class="line">
                      <div class="row"><h5 class="col-xs-4">Plane Name:</h5><h5 class="col-xs-8">${item.plan_name}</h5></div>
                      <div class="row"><h5 class="col-xs-4">Amount:</h5><h5 class="col-xs-8">37/43/${item.amount}</h5></div>
                    </div>
                    <div class="row line">
                      <h5 class="col-xs-4">Wallet:</h5><h5 class="col-xs-8">${item.wallet}</h5>
                    </div>
                    <div class="line">
                      <div class="row"><h5 class="col-xs-4">Benfit:</h5><h5 class="col-xs-8">${item.return_amount}</h5></div>
                      <div class="row"><h5 class="col-xs-4">Period:</h5><h5 class="col-xs-8">${item.return_period}</h5></div>
                      <div class="row"><h5 class="col-xs-4">Total Periods:</h5><h5 class="col-xs-8">${item.total_returned}</h5></div>
                    </div>
                    <div class="row line">
                      <h5 class="col-xs-4">Recieved:</h5><h5 class="col-xs-8">${item.number_returned}$ x ${item.return_amount} = ${item.number_returned * item.return_amount}$</h5>
                    </div>
                    <div class="row line">
                      <h5 class="col-xs-4">State:</h5><h5 class="col-xs-8">${state}</h5>
                    </div>

                        ` + st + `

                    </div>
                    `;

                });

                $('#admin-investment').empty().append(output);
                // checkProgress();

            } else {
                $('#admin-investment').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
            }

        });
    }
    //  End Get All Investment

    //  Start Get Pendding Investment
    function getPenddingInvestmentItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-pendding-investments',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
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

            if (items.data.length !== 0) {

                $.each(items.data, function (key, item) {

                    if (item.state == 0) {
                        state = `<span class="Panding">Panding</span>`;
                    } else if (item.state == 1) {
                        state = `<span class="Progress">In Progress</span>`;
                    } else if (item.state == 2) {
                        state = `<span class="Canceled">Canceled</span>`;
                    } else {
                        state = `<span class="Complete">Complete</span>`;
                    }

                    output += `

                    <div class="card user">
                    <h3 class="text-center">${item.user.first_name} ${item.user.last_name} </h3>
        
                    <div class="line">
                      <div class="row"><h5 class="col-xs-4">Plane Name:</h5><h5 class="col-xs-8">${item.plan_name}</h5></div>
                      <div class="row"><h5 class="col-xs-4">Amount:</h5><h5 class="col-xs-8">37/43/${item.amount}</h5></div>
                    </div>
                    <div class="row line">
                      <h5 class="col-xs-4">Wallet:</h5><h5 class="col-xs-8">${item.wallet}</h5>
                    </div>
                    <div class="line">
                      <div class="row"><h5 class="col-xs-4">Benfit:</h5><h5 class="col-xs-8">${item.return_amount}</h5></div>
                      <div class="row"><h5 class="col-xs-4">Period:</h5><h5 class="col-xs-8">${item.return_period}</h5></div>
                      <div class="row"><h5 class="col-xs-4">Total Periods:</h5><h5 class="col-xs-8">${item.total_returned}</h5></div>
                    </div>
                    <div class="row line">
                      <h5 class="col-xs-4">Recieved:</h5><h5 class="col-xs-8">${item.number_returned}$ x ${item.return_amount} = ${item.number_returned * item.return_amount}$</h5>
                    </div>
                    <div class="row line">
                      <h5 class="col-xs-4">State:</h5><h5 class="col-xs-8">${state}</h5>
                    </div>
                    <div class="footer">
                      <button class="btn btn-danger canceledButton" data-toggle="modal" data-target=".modal3" data-id="${item.id}">Cancel</button>
                      <button class="btn btn-success acceptButton" data-toggle="modal" data-target=".modal4" data-id="${item.id}">Accept</button>
                    </div>
                    </div>
                    `;

                });

                $('#admin-investment').empty().append(output);
                // checkProgress();

            } else {
                $('#admin-investment').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
            }

        });
    }
    //  End Get Pendding Investment

    //  Start Get Complete Investment
    function getCompleteInvestmentItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-complete-investments',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
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

                    if (item.state == 0) {
                        state = `<span class="Panding">Panding</span>`;
                    } else if (item.state == 1) {
                        state = `<span class="Progress">In Progress</span>`;
                    } else if (item.state == 2) {
                        state = `<span class="Canceled">Canceled</span>`;
                    } else {
                        state = `<span class="Complete">Complete</span>`;
                    }

                    output += `

                    <div class="card user">
                        <i class="fa fa-remove"></i>
                        <h3 class="text-center">${item.user.first_name} ${item.user.last_name} </h3>
            
                        <div class="line">
                            <div class="row"><h5 class="col-xs-4">Plane Name:</h5><h5 class="col-xs-8">${item.plan_name}</h5></div>
                            <div class="row"><h5 class="col-xs-4">Amount:</h5><h5 class="col-xs-8">37/43/${item.amount}</h5></div>
                        </div>
                        <div class="row line">
                            <h5 class="col-xs-4">Wallet:</h5><h5 class="col-xs-8">${item.wallet}</h5>
                        </div>
                        <div class="line">
                            <div class="row"><h5 class="col-xs-4">Benfit:</h5><h5 class="col-xs-8">${item.return_amount}</h5></div>
                            <div class="row"><h5 class="col-xs-4">Period:</h5><h5 class="col-xs-8">${item.return_period}</h5></div>
                            <div class="row"><h5 class="col-xs-4">Total Periods:</h5><h5 class="col-xs-8">${item.total_returned}</h5></div>
                        </div>
                        <div class="row line">
                            <h5 class="col-xs-4">Recieved:</h5><h5 class="col-xs-8">${item.number_returned}$ x ${item.return_amount} = ${item.number_returned * item.return_amount}$</h5>
                        </div>
                        <div class="row line">
                            <h5 class="col-xs-4">State:</h5><h5 class="col-xs-8">${state}</h5>
                        </div>
                    </div>
                    `;

                });

                $('#admin-investment').empty().append(output);
            } else {
                $('#admin-investment').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
            }

        });
    }
    //  End Get Complete Investment


    //  Start Get Canceled Investment
    function getCanceledInvestmentItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-cancele-investments',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
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

                    if (item.state == 0) {
                        state = `<span class="Panding">Panding</span>`;
                    } else if (item.state == 1) {
                        state = `<span class="Progress">In Progress</span>`;
                    } else if (item.state == 2) {
                        state = `<span class="Canceled">Canceled</span>`;
                    } else {
                        state = `<span class="Complete">Complete</span>`;
                    }

                    output += `
                    <div class="card user">
                        <i class="fa fa-remove"></i>
                        <h3 class="text-center">${item.user.first_name} ${item.user.last_name} </h3>
            
                        <div class="line">
                            <div class="row"><h5 class="col-xs-4">Plane Name:</h5><h5 class="col-xs-8">${item.plan_name}</h5></div>
                            <div class="row"><h5 class="col-xs-4">Amount:</h5><h5 class="col-xs-8">37/43/${item.amount}</h5></div>
                        </div>
                        <div class="row line">
                            <h5 class="col-xs-4">Wallet:</h5><h5 class="col-xs-8">${item.wallet}</h5>
                        </div>
                        <div class="line">
                            <div class="row"><h5 class="col-xs-4">Benfit:</h5><h5 class="col-xs-8">${item.return_amount}</h5></div>
                            <div class="row"><h5 class="col-xs-4">Period:</h5><h5 class="col-xs-8">${item.return_period}</h5></div>
                            <div class="row"><h5 class="col-xs-4">Total Periods:</h5><h5 class="col-xs-8">${item.total_returned}</h5></div>
                        </div>
                        <div class="row line">
                            <h5 class="col-xs-4">Recieved:</h5><h5 class="col-xs-8">${item.number_returned}$ x ${item.return_amount} = ${item.number_returned * item.return_amount}$</h5>
                        </div>
                        <div class="row line">
                            <h5 class="col-xs-4">State:</h5><h5 class="col-xs-8">${state}</h5>
                        </div>
                    </div>
                    `;

                });

                $('#admin-investment').empty().append(output);
            } else {
                $('#admin-investment').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
            }

        });
    }
    //  End Get Canceled Investment

    //  Start Get Canceled Investment
    function getProgressInvestmentItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-progress-investments',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
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

                    
                    if (item.state == 0) {
                        state = `<span class="Panding">Panding</span>`;
                    } else if (item.state == 1) {
                        state = `<span class="Progress">In Progress</span>`;
                    } else if (item.state == 2) {
                        state = `<span class="Canceled">Canceled</span>`;
                    } else {
                        state = `<span class="Complete">Complete</span>`;
                    }

                    output += `

                    <div class="card user">
                        <h3 class="text-center">${item.user.first_name} ${item.user.last_name} </h3>
            
                        <div class="line">
                            <div class="row"><h5 class="col-xs-4">Plane Name:</h5><h5 class="col-xs-8">${item.plan_name}</h5></div>
                            <div class="row"><h5 class="col-xs-4">Amount:</h5><h5 class="col-xs-8">37/43/${item.amount}</h5></div>
                        </div>
                        <div class="row line">
                            <h5 class="col-xs-4">Wallet:</h5><h5 class="col-xs-8">${item.wallet}</h5>
                        </div>
                        <div class="line">
                            <div class="row"><h5 class="col-xs-4">Benfit:</h5><h5 class="col-xs-8">${item.return_amount}</h5></div>
                            <div class="row"><h5 class="col-xs-4">Period:</h5><h5 class="col-xs-8">${item.return_period}</h5></div>
                            <div class="row"><h5 class="col-xs-4">Total Periods:</h5><h5 class="col-xs-8">${item.total_returned}</h5></div>
                        </div>
                        <div class="row line">
                            <h5 class="col-xs-4">Recieved:</h5><h5 class="col-xs-8">${item.number_returned}$ x ${item.return_amount} = ${item.number_returned * item.return_amount}$</h5>
                        </div>
                        <div class="row line">
                            <h5 class="col-xs-4">State:</h5><h5 class="col-xs-8">${state}</h5>
                        </div>
                    </div>
                    `;

                });

                $('#admin-investment').empty().append(output);
            } else {
                $('#admin-investment').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
            }

        });
    }
    //  End Get Progress Investment
    

    // On Accept click
    $('body').on('click', '.acceptButton', function (e) {
        e.preventDefault();

        localStorage.setItem('investment_card_id', $(this).data('id'))
    });

    // On Cancel click
    $('body').on('click', '.canceledButton', function (e) {
        e.preventDefault();

        localStorage.setItem('investment_card_id', $(this).data('id'))
    });

    // Accept Deposit
    $("#acceptForm").submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: "http://127.0.0.1:8000/api/accept-investment/" + localStorage.getItem('investment_card_id'),
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            type: "POST",
            data: $("#acceptForm").serialize(),
            dataType: 'JSON',
            success: function (data) {
                localStorage.removeItem('investment_card_id');
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
            url: "http://127.0.0.1:8000/api/cancel-investment/" + localStorage.getItem('investment_card_id'),
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            type: "POST",
            data: $("#canceledFrom").serialize(),
            dataType: 'JSON',
            success: function (data) {
                localStorage.removeItem('investment_card_id');
                location.reload();

            },
            error: function () {
                console.log("Error");
            }
        });
    });

    //Delete Investment 

    $('body').on('click', '.deleteInvensment', function (e) {
        e.preventDefault();

        localStorage.setItem('investment_card_id', $(this).data('id'));
        $.ajax({
            url: 'http://127.0.0.1:8000/api/delete-investment/' + localStorage.getItem('investment_card_id'),
            type: 'DELETE',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            dataType: 'json',
            success: function (data) {
                localStorage.removeItem('investment_card_id');
                alert("Deleted Successfully..")

                location.reload();

            },
            error: function () {
                console.log("Error");
            }
        });
    });


     // Check Progress
    //  function checkProgress() {
    //     var elements = $('.nextPayment');
    //     var nowVal = 0;
    //     var maxVal = 0;
    //     var state = 0;
    //     var progressWidth = 0;

    //     var interval = setInterval(function () {

    //         $.each(elements, function (key, element) {
    //             nowVal = parseInt(element.children[1].children[0].getAttribute('data-valuenow'));
    //             maxVal = parseInt(element.children[1].children[0].getAttribute('data-valuemax'));
    //             state = parseInt(element.children[1].children[0].getAttribute('data-state'));

    //             if (state == 1 && nowVal < maxVal) {
    //             // if(nowVal < maxVal){
    //                 nowVal += 1;
    //                 element.children[1].children[0].setAttribute('data-valuenow', nowVal);
    //                 progressWidth = (nowVal / maxVal) * 100;
    //                 element.children[1].children[0].style.width = progressWidth + '%';

    //                 changeDate(element.children[0], nowVal);
    //             }
    //         });
    //     }, 1000);
    // }

    // // Change Date Of NextPayment
    // function changeDate(element, nowVal) {

    //     // calculate (and subtract) whole days
    //     var days = Math.floor(nowVal / 86400);
    //     nowVal -= days * 86400;

    //     // calculate (and subtract) whole hours
    //     var hours = Math.floor(nowVal / 3600) % 24;
    //     nowVal -= hours * 3600;

    //     // calculate (and subtract) whole minutes
    //     var minutes = Math.floor(nowVal / 60) % 60;
    //     nowVal -= minutes * 60;

    //     // what's left is seconds
    //     var seconds = nowVal % 60;

    //     // console.log("Day:", days);
    //     // console.log("Hours:", hours);
    //     // console.log("Minutes:", minutes);
    //     // console.log("Seconds:", seconds);

    //     element.textContent = days + 'd: ' + hours + 'h: ' + minutes + 'm: ' + seconds + 's';
    // }

    });
