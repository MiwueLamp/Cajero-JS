const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const Users = JSON.parse(localStorage.getItem('users')) || []
    let validUser = Users.find(user => user.email === email && user.password === password)
    if (!validUser) {
        return alert('Usuario y/o contraseña incorrecta!')
    }
    alert(`Bienvenido ${validUser.name}`)
    localStorage.setItem('login_success',JSON.stringify(validUser))
    sessionStorage.setItem("nombre", validUser.name)
    sessionStorage.setItem("email", validUser.email)
    sessionStorage.setItem("password", validUser.password)
    sessionStorage.setItem("monto", validUser.monto)       
    
    window.location.href = 'index.html'
})
