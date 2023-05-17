$(document).ready(function () {

  getAllWithdrawItems();

  $('#all').click(function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active')
      getAllWithdrawItems();
  });

  $('#pendding').click(function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active')
      getPenddingWithdrawItems();
  });

  $('#complete').click(function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active')
      getCompleteWithdrawItems();
  });

  $('#canceled').click(function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active')
      getCanceledWithrawItems();
  });

  //  Start Get All Withdraw
  function getAllWithdrawItems() {
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
          let output = '';
          let state = '';
          let icon = '';

          if (items.data.length !== 0) {

              $.each(items.data, function (key, item) {

                if (item.state == 0) {
                    icon = ``;
                } else if (item.state == 1) {
                  icon = `<i class="fa fa-remove deleteWithdraw" data-id="${item.id}"></i>`;

                } else if (item.state == 2) {
                    icon = `<i class="fa fa-remove deleteWithdraw" data-id="${item.id}"></i>`;
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
                  <h3 class="text-center">${item.user.first_name} ${item.user.last_name}</h3>
                    <div class="row">
                      <h5 class="col-xs-4">Amount:</h5>
                      <h5 class="col-xs-8">${item.amount}$</h5>
                    </div>
                    <div class="row">
                      <h5 class="col-xs-4">Wallet:</h5>
                      <h5 class="col-xs-8">${item.wallet}</h5>
                    </div>
                    <div class="row">
                      <h5 class="col-xs-4">Method:</h5>
                      <h5 class="col-xs-8">${item.method}</h5>
                    </div>
                    <div class="row">
                      <h5 class="col-xs-4">Date:</h5>
                      <h5 class="col-xs-8">${item.created_at.substring(0, 10)}</h5>
                    </div>
                    ` + state + `
                  </div>
                `;

            });

              $('#admin-withdraw').empty().append(output);
          } else {
              $('#admin-withdraw').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
          }

      });
  }
  //  End Get All Withdraw

  //  Start Get Pendding Withdraw
  function getPenddingWithdrawItems() {
      $.ajax({
          url: 'http://127.0.0.1:8000/api/get-pending-withdraws',
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

                output += `
                  <div class="card user">
                    <h3 class="text-center">${item.user.first_name} ${item.user.last_name}</h3>
                    <div class="row">
                      <h5 class="col-xs-4">Amount:</h5>
                      <h5 class="col-xs-8">${item.amount}$</h5>
                    </div>
                    <div class="row">
                      <h5 class="col-xs-4">Wallet:</h5>
                      <h5 class="col-xs-8">${item.wallet}</h5>
                    </div>
                    <div class="row">
                      <h5 class="col-xs-4">Method:</h5>
                      <h5 class="col-xs-8">${item.method}</h5>
                    </div>
                    <div class="row">
                      <h5 class="col-xs-4">Date:</h5>
                      <h5 class="col-xs-8">${item.created_at.substring(0, 10)}</h5>
                    </div>
                    <div class="footer">
                      <button class="btn btn-danger canceledButton" data-toggle="modal" data-target=".modal3" data-id="${item.id}">Cancel</button>
                      <button class="btn btn-success acceptButton" data-toggle="modal" data-target=".modal4" data-id="${item.id}">Accept</button>
                    </div>
                  </div>
                `;

              });

              $('#admin-withdraw').empty().append(output);
          } else {
              $('#admin-withdraw').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
          }

      });
  }
  //  End Get Pendding Withdraw

  //  Start Get Complete Withdraw
  function getCompleteWithdrawItems() {
      $.ajax({
          url: 'http://127.0.0.1:8000/api/get-complate-withdraws',
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

                output += `
                  <div class="card user">
                  <i class="fa fa-remove deleteWithdraw" data-id="${item.id}"></i>
                  <h3 class="text-center">${item.user.first_name} ${item.user.last_name}</h3>
                    <div class="row">
                      <h5 class="col-xs-4">Amount:</h5>
                      <h5 class="col-xs-8">${item.amount}$</h5>
                    </div>
                    <div class="row">
                      <h5 class="col-xs-4">Wallet:</h5>
                      <h5 class="col-xs-8">${item.wallet}</h5>
                    </div>
                    <div class="row">
                      <h5 class="col-xs-4">Method:</h5>
                      <h5 class="col-xs-8">${item.method}</h5>
                    </div>
                    <div class="row">
                      <h5 class="col-xs-4">Date:</h5>
                      <h5 class="col-xs-8">${item.created_at.substring(0, 10)}</h5>
                    </div>
                  </div>
                `;

              });

              $('#admin-withdraw').empty().append(output);
          } else {
              $('#admin-withdraw').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
          }

      });
  }
  //  End Get Complete Withdraw

  //  Start Get Canceled Withdraw
  function getCanceledWithrawItems() {
      $.ajax({
          url: 'http://127.0.0.1:8000/api/get-canceled-withdraws',
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

                output += `
                  <div class="card user">
                  <i class="fa fa-remove deleteWithdraw" data-id="${item.id}"></i>
                  <h3 class="text-center">${item.user.first_name} ${item.user.last_name}</h3>
                    <div class="row">
                      <h5 class="col-xs-4">Amount:</h5>
                      <h5 class="col-xs-8">${item.amount}$</h5>
                    </div>
                    <div class="row">
                      <h5 class="col-xs-4">Wallet:</h5>
                      <h5 class="col-xs-8">${item.wallet}</h5>
                    </div>
                    <div class="row">
                      <h5 class="col-xs-4">Method:</h5>
                      <h5 class="col-xs-8">${item.method}</h5>
                    </div>
                    <div class="row">
                      <h5 class="col-xs-4">Date:</h5>
                      <h5 class="col-xs-8">${item.created_at.substring(0, 10)}</h5>
                    </div>
                  </div>
                `;

              });

              $('#admin-withdraw').empty().append(output);
          } else {
              $('#admin-withdraw').empty().append(`<div class="nodata col-12">There Is No Data.</div>`);
          }

      });
  }
  //  End Get Canceled Deposit



  // On Accept click
  $('body').on('click', '.acceptButton', function (e) {
      e.preventDefault();

      localStorage.setItem('withdraw_card_id', $(this).data('id'))
  });

  // On Cancele click
  $('body').on('click', '.canceledButton', function (e) {
      e.preventDefault();

      localStorage.setItem('withdraw_card_id', $(this).data('id'))
  });

  // Accept Deposit
  $("#acceptForm").submit(function (e) {
      e.preventDefault();
      $.ajax({
          url: "http://127.0.0.1:8000/api/accept-withdraw/" + localStorage.getItem('withdraw_card_id'),
          headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
          type: "POST",
          data: $("#acceptForm").serialize(),
          dataType: 'JSON',
          success: function (data) {
              localStorage.removeItem('withdraw_card_id');
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
          url: "http://127.0.0.1:8000/api/cancel-withdraw/" + localStorage.getItem('withdraw_card_id'),
          headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
          type: "POST",
          data: $("#canceledFrom").serialize(),
          dataType: 'JSON',
          success: function (data) {
              localStorage.removeItem('withdraw_card_id');
              location.reload();

          },
          error: function () {
              console.log("Error");
          }
      });
  });
  $('body').on('click', '.deleteWithdraw', function (e) {
    e.preventDefault();

    localStorage.setItem('Withdraw_card_id', $(this).data('id'));
    $.ajax({
        url: 'http://127.0.0.1:8000/api/delete-withdraw/' + localStorage.getItem('Withdraw_card_id'),
        type: 'DELETE',
        headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
        dataType: 'json',
        success: function (data) {
            localStorage.removeItem('Withdraw_card_id');
            alert("Deleted Successfully..")
            location.reload();

        },
        error: function () {
            console.log("Error");
        }
    });
});

});