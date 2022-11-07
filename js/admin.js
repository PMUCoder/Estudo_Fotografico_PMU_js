const usuarios = [  {user: "pablo", password: "contra123"}, {email: "ejemplo2@gmail.com", password:"12345"} ]

let userIngresado = "pablo"
let passwordIngresada = "contra123"

usuarios.forEach(usuario => {
    if(usuario.user === userIngresado) {
        if(usuario.password === passwordIngresada) {
            alert("login")
        }
    }
})
