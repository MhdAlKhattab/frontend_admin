$(document).ready(function () {

    getAllStatisitics();

    //////////// Start Statisitics
    function getAllStatisitics() {
        $.ajax({
            url: 'http://127.0.0.1:8000/api/get-statistics',
            headers: { "Authorization": "Bearer " + localStorage.getItem('access_token') },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                // User
                $('#num_admin_users').text(data.data.num_admin_users);
                $('#num_normal_users').text(data.data.num_normal_users);


                // Investment
                let sum_invests = data.data.total_progress_invest + data.data.total_pendding_invest + data.data.total_complete_invest + data.data.total_canceled_invest;
                let OldRange_invest = (sum_invests - 0)
                let NewRange_invest = (100 - 0)
                let total_progress_invest = (((data.data.total_progress_invest) * NewRange_invest) / OldRange_invest)
                let total_pendding_invest = (((data.data.total_pendding_invest) * NewRange_invest) / OldRange_invest)
                let total_complete_invest = (((data.data.total_complete_invest) * NewRange_invest) / OldRange_invest)
                let total_canceled_invest = (((data.data.total_canceled_invest) * NewRange_invest) / OldRange_invest)

                $('#total_progress_invest').text(data.data.total_progress_invest + '$');
                $('#total_pendding_invest').text(data.data.total_pendding_invest + '$');
                $('#total_complete_invest').text(data.data.total_complete_invest + '$');
                $('#total_canceled_invest').text(data.data.total_canceled_invest + '$');
                document.getElementById('total_progress').style.height = total_progress_invest + '%';
                document.getElementById('total_pendding').style.height = total_pendding_invest + '%';
                document.getElementById('total_complete').style.height = total_complete_invest + '%';
                document.getElementById('total_canceled').style.height = total_canceled_invest + '%';

                // Deposit
                let sum_deposits = data.data.total_complete_deposits + data.data.total_canceled_deposits + data.data.total_pendding_deposits;
                let OldRange_deposit = (sum_deposits - 0)
                let NewRange_deposit = (360 - 0)
                let total_complete_deposits = (((data.data.total_complete_deposits) * NewRange_deposit) / OldRange_deposit)
                let total_canceled_deposits = (((data.data.total_canceled_deposits) * NewRange_deposit) / OldRange_deposit)
                let total_pendding_deposits = (((data.data.total_pendding_deposits) * NewRange_deposit) / OldRange_deposit)

                $('#total_complete_deposits').text(data.data.total_complete_deposits);
                $('#total_canceled_deposits').text(data.data.total_canceled_deposits);
                $('#total_pendding_deposits').text(data.data.total_pendding_deposits);
                document.getElementById('circle-deposit').style.backgroundImage = 'conic-gradient(#ddd ' + total_pendding_deposits + 'deg,#004085 ' + (total_pendding_deposits + total_complete_deposits) + 'deg,#ff8e31 ' + (total_pendding_deposits + total_complete_deposits + total_canceled_deposits) + 'deg)';

                // Withdraw
                let sum_withdraws = data.data.total_complete_withdraws + data.data.total_canceled_withdraws + data.data.total_pendding_withdraws;
                let OldRange_withdraw = (sum_withdraws - 0)
                let NewRange_withdraw = (360 - 0)
                let total_complete_withdraws = (((data.data.total_complete_withdraws) * NewRange_withdraw) / OldRange_withdraw)
                let total_canceled_withdraws = (((data.data.total_canceled_withdraws) * NewRange_withdraw) / OldRange_withdraw)
                let total_pendding_withdraws = (((data.data.total_pendding_withdraws) * NewRange_withdraw) / OldRange_withdraw)

                $('#total_complete_withdraws').text(data.data.total_complete_withdraws);
                $('#total_canceled_withdraws').text(data.data.total_canceled_withdraws);
                $('#total_pendding_withdraws').text(data.data.total_pendding_withdraws);
                document.getElementById('circle-withdraw').style.backgroundImage = 'conic-gradient(#ddd ' + total_pendding_withdraws + 'deg,#004085 ' + (total_pendding_withdraws + total_complete_withdraws) + 'deg,#ff8e31 ' + (total_pendding_withdraws + total_complete_withdraws + total_canceled_withdraws) + 'deg)';

            },
            error: function () {
            },
        });
    }
});