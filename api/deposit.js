$(document).ready(function () {

    getAllDepositItems();

    //  Start Get Deposit
    function getAllDepositItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-all-deposits',
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

                    if(item.state == 0) {
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
                        <i class="fa fa-remove"></i>
                        <img data-enlargable width="100" src="" />
                        <h3 class="text-center">${item.user.first_name} ${item.user.last_name} </h3>
                        <div class="row">
                            <h5 class="col-xs-4">Amount:</h5>
                            <h5 class="col-xs-8">${item.amount} </h5>
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
                            <h5 class="col-xs-8">${item.created_at.substring(0,10)}</h5>
                        </div>

                        ` + state + `

                    </div>
                    `;

                });

                $('#admin-deposit').empty().append(output);
            } else {
                $('#admin-deposit').parent().append(`<div class="nodata">There Is No Data.</div>`);
            }

        });
    }
    //  End Get Deposit

    // On Accept click
    $('body').on('click', '.acceptButton', function(e){
        e.preventDefault();

        localStorage.setItem('deposit_card_id', $(this).data('id'))
    });

    // On Cancele click
    $('body').on('click', '.canceledButton', function(e){
        e.preventDefault();

        localStorage.setItem('deposit_card_id', $(this).data('id'))
    });


    // Accept Deposit
    $("#acceptForm").submit(function (e) {
        e.preventDefault();
        

        $.ajax({
            url: "http://127.0.0.1:8000/api/accept-deposit/" + localStorage.getItem('deposit_card_id'),
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
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
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
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

});