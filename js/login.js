// create object and basic users
class Login {
    constructor (username,password,login_status){
        this.username=username
        this.password=password
        this.login_status=login_status
    }
}

const admin = new Login ("admin","admin",false)
const testUser = new Login ("testUser","12345",false)

let users = []

users.push(admin)
users.push(testUser)

storeUsers ()

let loginAttempts=1
let loginAttemptsLimit=3

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
                swal.fire({
                    title: "Bienvenido " +usernameInput.value,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                })
                loginMessage.innerText= "El usuario "+usernameInput.value+" se logeo con exito"
                loginAttempts=1
            }
            else{
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
                loginAttempts++
            }
        }   
    })
}) 

function storeUsers (){
localStorage.setItem("users",JSON.stringify(users))
}

function recoverUsers (){
    if (localStorage.getItem("users")) {
        users=JSON.parse(localStorage.getItem("users"))
    }
}

//funcion nuevo usuario
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




// const loginForm = document.getElementById("loginForm")
// const usernameInput=document.getElementById ("username")
// const passwordInput=document.getElementById ("password")

//funcion login
//loginMessage.innerText = "Ok"

// loginForm.addEventListener("submit",(e) => {
//     e.preventDefault()
//     let userFound = users.find(user=>user.username===usernameInput.value && user.password===passwordInput.value)
//     if(userFound){
//         loginMessage.innerText = "El usuario se logeo con exito"
//     }
//     else{
//         loginAttempts >= loginAttemptsLimit ? loginMessage.innerText = "Alcanzo el numero maximo de intentos su usuario ha sigo bloqueado, por favor contactese con nuestro centro de ayuda" : loginMessage.innerText = "Los datos ingresados son incorrectos, revise usuario y contraseña e intentelo nuevamente."+"\n"+"Recuerde que luego de 3 intentos su usuario sera bloqueado por seguridad. Le quedan "+"\n"+parseInt(loginAttemptsLimit-loginAttempts)+" intentos."
//         loginAttempts++
//     }
// })
// btnLogin.click