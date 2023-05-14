$(document).ready(function () {

    getWithdrawItems();

    //  Start Get Withdraw
    function getWithdrawItems() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-all-withdraws',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            dataType: 'json',
            success: function (data) {
                console.log('access');
            },
            error: function () {
                console.log('false');
            },
        }).done(function (items) {
            let output = `
            `;

            if (items.data.length !== 0) {

                $.each(items.data, function (key, item) {

                    output += `
                    <div class="row" id="admin-withdraw">
                    <div class="card user">
                      <i class="fa fa-remove"></i>
                      <h3 class="text-center">Mhd Khattab</h3>
                      <div class="row">
                        <h5 class="col-xs-4">Amount:</h5>
                        <h5 class="col-xs-8">${item.user.amount}</h5>
                      </div>
                      <div class="row">
                        <h5 class="col-xs-4">Wallet:</h5>
                        <h5 class="col-xs-8">${item.user.wallet}</h5>
                      </div>
                      <div class="row">
                        <h5 class="col-xs-4">Method:</h5>
                        <h5 class="col-xs-8">${item.user.method}</h5>
                      </div>
                      <div class="row">
                        <h5 class="col-xs-4">Date:</h5>
                        <h5 class="col-xs-8">12/3/4555</h5>
                      </div>
                      <div class="footer">
                        <button class="btn btn-danger"data-toggle="modal"data-target=".modal3">Cancel</button>
                        <button class="btn btn-success"data-toggle="modal"data-target=".modal4">Accepte</button>
                      </div>
                    </div>
                    
                  </div>
                    `;

                });
                $('#admin-withdraw').empty().append(output);
                console.log("yes");

            } else {

                $('.lodding').remove();

                $('.nodata').remove();

                $('#admin-withdraw').parent().append(`<div class="nodata">There Is No Data.</div>`);
                console.log("yes");

            }

        });
    }
    //  End Get Diposit



});