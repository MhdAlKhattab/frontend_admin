$(document).ready(function () {

    getAllStatisitics();

    //////////// Start Statisitics
    function getAllStatisitics() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-statistics',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            dataType: 'json',
            success: function (data) {
                $('#num_admin_users').empty().append(data.data.num_admin_users);
                $('#num_normal_users').empty().append(data.data.num_normal_users);
                $('#total_progress_invest').empty().append(data.data.total_progress_invest);
                $('#total_pendding_invest').empty().append(data.data.total_pendding_invest);
                $('#total_complete_invest').empty().append(data.data.total_complete_invest);
                $('#total_canceled_invest').empty().append(data.data.total_canceled_invest);
                document.getElementById('total_progress').style.height = 'data.data.total_canceled_invest';
                document.getElementById('total_pendding').style.height = 'data.data.total_canceled_invest';
                document.getElementById('total_complete').style.height = 'data.data.total_canceled_invest';
                document.getElementById('total_canceled').style.height = 'data.data.total_canceled_invest';
                document.getElementById('circle-deposit').style.backgroundImage = 'conic-gradient(#28a745` + data.data.total_pendding_deposits + `,#fff ` + data.data.total_complete_deposits + `#0c5460 ` + data.data.total_canceled_deposits + `)';
                document.getElementById('circle-withdraw').style.backgroundImage = 'conic-gradient(#28a745 '+'  data.data.total_pendding_withdraws,#fff '+'   data.data.total_complete_withdraws,#0c5460   '+' data.data.total_canceled_withdraws)';
                console.log(data.data.total_pendding_deposits)
            },
            error: function () {
            },
        });
    }
});