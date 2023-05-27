  //  Start Get Referral
  getAllUserReferral()
  function getAllUserReferral() {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/get-all-referrals',
        headers: { "Authorization": "Bearer " + localStorage.getItem('access_token_admin') },
        dataType: 'json',
        success: function (data) {
        },
        error: function () {
        },
    }).done(function (items) {
        let output = `
            <tr style="background-color: black;">
                <th>Name</th>
                <th>Invited</th>
                <th>Email</th>
                <th>Benefit</th>
                <th>Date</th>
            </tr>
        `;

        if (items.data.length != 0) {

            $.each(items.data, function (key, item) {

                output += `
                    <tr>
                        <td><h5>${item.user.first_name} ${item.user.last_name}</h5></td>
                        <td><h5>${item.referral_first_name} ${item.referral_last_name}</h5></td>
                        <td><h5>${item.referral_email}</h5></td>
                        <td><h5>${item.benefit}$</h5></td>
                        <td><h5>${item.updated_at.substring(0,10)}</h5></td>
                    </tr>
                `;

            });
            $('#admin-referral').empty().append(output);

        } else {
            $('.lodding').remove();

            $('.nodata').remove();

            $('#admin-referral').parent().append(`<div class="nodataTable">There Is No Data.</div>`);
        }
        console.log('jkkbdvk')
    });
}
//  End Get Referral
