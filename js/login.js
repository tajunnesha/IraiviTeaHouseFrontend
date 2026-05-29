document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const role = params.get('role');

    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const msg = document.getElementById('msg');

    // ADMIN LOGIN
    if (role === 'admin') {

        if (user === 'iraivi_admin' && pass === 'iraivi@admin') {

            localStorage.setItem('isLoggedIn', 'admin');

            window.location.href = 'DailyAccount.html';

        } else {

            msg.innerText = "Invalid Admin Credentials!";
        }

        return;
    }

    // USER LOGIN
    if (role === 'user') {

        if (user === 'iraivi_staff' && pass === 'staff@iraivi') {

            localStorage.setItem('isLoggedIn', 'user');

            window.location.href = 'Stock.html';

        } else {

            msg.innerText = "Invalid User Credentials!";
        }

        return;
    }

    // REGISTERED USER LOGIN
    const correctUser = localStorage.getItem('storedUser');
    const correctPass = localStorage.getItem('storedPass');

    console.log(correctUser, correctPass);

    if (user === correctUser && pass === correctPass) {

        localStorage.setItem('isLoggedIn', 'registered');

        window.location.href = 'index.html';

    } else {

        msg.innerText = "Invalid Credentials! Register first.";
    }

});