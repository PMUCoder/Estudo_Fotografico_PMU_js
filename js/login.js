// User Login Class
class Login {
    constructor (username,password,login_status){
        this.username=username
        this.password=password
        this.login_status=login_status
    }
}

//creacion de usuarios basicos para el funcionamiento del simulador
const admin = new Login ("admin","admin",false)
const testUser = new Login ("testUser","12345",false)

let users = []

users.push(admin)
users.push(testUser)

storeUsers ()

//variables para manejar la cantidad de intentos de login antes de bloquear el usuario por seguridad
let loginAttempts=1
let loginAttemptsLimit=3

//login
btnLogin.addEventListener("click", ()=>{
    swal.fire({
        title: "Login",
        html: `<input type="text" id="username" class="swal2-input" placeholder="username">
        <input type="password" id="password" class="swal2-input" placeholder="password">`,
        confirmButtonText: "Enviar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if(result.isConfirmed) {
            const usernameInput=document.getElementById("username")
            const passwordInput=document.getElementById("password")
            let userFound = users.find(user=>user.username===usernameInput.value && user.password===passwordInput.value)
            if(userFound){
                successMessage (usernameInput)
            }
            else{
                errorMessage ()
                loginAttempts++
            }
        }   
    })
}) 

//almacenamiento en localStorage
function storeUsers (){
localStorage.setItem("users",JSON.stringify(users))
}

//recupero de datos del localStorage
function recoverUsers (){
    if (localStorage.getItem("users")) {
        users=JSON.parse(localStorage.getItem("users"))
    }
}

//mensajes usuario login con exito
function successMessage (usernameInput) {
    swal.fire({
        title: "Bienvenido " +usernameInput.value,
        icon: "success",
        confirmButtonText: "Aceptar",
    })
    loginMessage.innerText= "El usuario "+usernameInput.value+" se logeo con exito"
    loginAttempts=1
}

//mensajes usuario login con exito
function errorMessage () {
    if(loginAttempts >= loginAttemptsLimit){
        loginMessageTxt = "Alcanzo el numero maximo de intentos su usuario ha sigo bloqueado, por favor contactese con nuestro centro de ayuda"
    }
    else{
        loginMessageTxt = "Los datos ingresados son incorrectos, revise usuario y contraseña e intentelo nuevamente."+"\n"+"Recuerde que luego de 3 intentos su usuario sera bloqueado por seguridad."+"\n"+"Le "+(loginAttempts>1 ? ("queda ") : ("quedan "))+parseInt(loginAttemptsLimit-loginAttempts)+ (loginAttempts>1 ? (" intento.") : (" intentos."))
    }
        swal.fire({
        title: loginMessageTxt,
        icon: "error",
        confirmButtonText: "Aceptar",
    })
    loginMessage.innerText= loginMessageTxt
}


//nuevo usuario
/*const btn = document.getElementById("btn")
btn.addEventListener("click", ()=> {
console.log("Hola, me hiciste click")
})

para listar la array: ejemplo
for(let i=0; i<salad.length; i++) {
console.log(`Element at index ${i} is ${salad[i]}`);
}


*/


//funcion cambio de contraseña

//funcion eliminar usuario

//funcion logoff