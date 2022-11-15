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
    let userLogged = users.find(user=>user.login_status===true)
    if (userLogged) {
        users.forEach((user)=>{
            user.login_status=false
            btnLogin.innerText= "Login"
            swal.fire({
                title: "El logoff fue exitoso. Hasta la próxima",
                icon: "success",
                confirmButtonText: "Aceptar",
            })
            storeUsers ()
        })
    }
    else{
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
            userLogin (usernameInput,passwordInput)
        }   
    })
    }
}) 

//Funcion de consulta al array para userLogin + mensajes al usuario
function userLogin (usernameInput,passwordInput) {
    let userFound = users.find(user=>user.username===usernameInput.value && user.password===passwordInput.value)
    if(userFound){
        userFound.login_status=true
        storeUsers ()
        successMessage (usernameInput)
        btnLogin.innerText= "Logoff"
    }
    else{
        errorMessage ()
        loginAttempts++
    }
}

//mensajes usuario login con exito
function successMessage (usernameInput) {
    swal.fire({
        title: "Bienvenido " +usernameInput.value,
        icon: "success",
        confirmButtonText: "Aceptar",
    })
    loginMessage.innerText= "El usuario "+usernameInput.value+" se logeo con éxito"
    loginAttempts=1
}

//mensajes usuario login con exito
function errorMessage () {
    if(loginAttempts >= loginAttemptsLimit){
        loginMessageTxt = "Alcanzó el número máximo de intentos su usuario ha sigo bloqueado, por favor contactese con nuestro centro de ayuda"
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

//Create user
btnNewUser.addEventListener("click", ()=>{
    let userLogged = users.find(user=>user.login_status===true)
    if (userLogged) {
        users.forEach((user)=>{
            swal.fire({
                title: "Ud. ya posee un usuario registrado",
                icon: "error",
                confirmButtonText: "Aceptar",
            })
        })
    }
    else{
    swal.fire({
        title: "Registrar Nuevo Usuario",
        html: `<input type="text" id="username" class="swal2-input" placeholder="username">
        <input type="password" id="password" class="swal2-input" placeholder="password">`,
        confirmButtonText: "Enviar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if(result.isConfirmed) {
            const usernameInput=document.getElementById("username")
            const passwordInput=document.getElementById("password")
            registerNewUser (usernameInput,passwordInput)
        }   
    })
    }
}) 

//Funcion de registro de nuevo usuario + validacion + mensajes al usuario
function registerNewUser (usernameInput,passwordInput) {
    let newUserFound = users.find(user=>user.username===usernameInput.value)
    if(newUserFound){
        newUserErrorMessage (newUserFound)
    }
    else{
        if (usernameInput.value=="" || passwordInput.value==""){
            newUserErrorMessage (newUserFound)
        }
        else{
            let newUser = new Login (usernameInput.value,passwordInput.value,false)
            users.push(newUser)
            storeUsers ()
            newUserSuccessMessage (usernameInput)
        }
    }    
}

//mensajes nuevo usuario creado con exito
function newUserSuccessMessage (usernameInput) {
    loginMessageTxt = "El usuario "+usernameInput.value+" se creo con éxito. Ya puede logearse con su usuario y contraseña.",
    swal.fire({
        title: loginMessageTxt,
        icon: "success",
        confirmButtonText: "Aceptar",
    })
    loginMessage.innerText= loginMessageTxt
}

//mensajes de error creacion de nuevo usuario
function newUserErrorMessage (newUserFound) {
    if (newUserFound){
        loginMessageTxt = "El usuario que usted intenta registrar ya existe por favor elija un nombre distinto"
    }
    else{
        loginMessageTxt = "Debe ingresar un valor de usuario y contraseña para completar el registro"
    }
    swal.fire({
    title: loginMessageTxt,
    icon: "error",
    confirmButtonText: "Aceptar",
    })
    loginMessage.innerText= loginMessageTxt
}   

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
