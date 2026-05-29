document.getElementById('regForm')
.addEventListener('submit', function(e) {

    e.preventDefault();

    const user =
        document.getElementById('regUser').value;

    const pass =
        document.getElementById('regPass').value;

    const regMsg =
        document.getElementById('regMsg');

    // Save user details
    localStorage.setItem('storedUser', user);

    localStorage.setItem('storedPass', pass);

    // AUTO LOGIN after register
    localStorage.setItem('isLoggedIn', 'registered');

    regMsg.innerText =
        "Registration Successful!";

    regMsg.style.color = "#556b2f";

    setTimeout(function() {

        window.location.href = 'login.html';

    }, 1500);

});