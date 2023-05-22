  //  Start Get Referral
  getAllUserReferral()
  function getAllUserReferral() {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/get-all-referrals',
        headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
        dataType: 'json',
        success: function (data) {
        },
        error: function () {
        },
    }).done(function (items) {
        let output = `
            <tr style="background-color: black;">
                <th>Name</th>
                <th>Date</th>
                <th>Quantity</th>
                <th>Way</th>
            </tr>
        `;

        if (items.data.length !== 0) {

            $.each(items.data, function (key, item) {

                output += `
                    <tr>
                        <td><h5>${item.user.first_name} ${item.user.last_name}</h5></td>
                        <td><h5>${item.email}$</h5></td>
                        <td><h5>${item.created_at.substring(0,10)}</h5></td>
                    </tr>
                `;

            });
            $('#user-referral').empty().append(output);

        } else {
            $('.lodding').remove();

            $('.nodata').remove();

            $('#user-referral').parent().append(`<div class="nodata">There Is No Data.</div>`);
        }

    });
}
//  End Get Referral
