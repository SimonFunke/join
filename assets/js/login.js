async function login() {
    let email = document.getElementById('mail');
    let pswd = document.getElementById('pass');
    let login = false;

    await loadUsers();

    users.forEach(e => {
        if (e.eMail == email.value) {
            if (e.password == pswd.value) {
                localStorage.setItem('user', JSON.stringify(e));
                document.getElementById('login_error').classList.add('d-none');
                email.value = '';
                pswd.value = '';
                login = true;
                location.href = 'summary.html';
            }
        }
    });
    if (!login) {
        email.classList.add('error-border');
        email.value = '';
        pswd.classList.add('error-border');
        pswd.value = '';
        document.getElementById('login_error').classList.remove('d-none');
        users = [];
    }
}

function loginGuest() {

    localStorage.setItem('user', JSON.stringify(
        { 'id': 0, 'firstName': 'Guest', 'lastName': '', 'eMail': '' }
    ));
    location.href = 'summary.html';
}