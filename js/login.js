// create object and basic users

class Login {
    constructor (username,password,id,login_status){
        this.username=username
        this.password=password
        this.id=parseInt(id)
        this.login_status=login_status
    }
}

const admin = new Login ("admin","admin",1,false)
const testUser = new Login ("testUser","12345",2,false)

let users = []
let usersName = []

users.push(admin)
users.push(testUser)
usersName.push(admin.username)
usersName.push(testUser.username)

recoverUsers ()
storeUsers ()

//funcion login
const usernameInput=document.getElementById ('username')
const passwordInput=document.getElementById ('password')
const loginForm = document.getElementById('loginForm')

loginForm.addEventListener("submit",(e) => {
e.preventDefault()

let loginAttempts=1
let loginAttemptsLeft=3
loginMessage.innerText = "Ok"

    do{
        loginAttemptsLeft=loginAttemptsLeft-1
        if(validateLogin(usernameInput,passwordInput)){
            
            loginMessage.innerText = "El usuario se logeo con exito"
        }
        else if(loginAttempts < 3 && loginAttempts >= 1){
            
            if(loginAttemptsLeft==1){
                warningAttempts= "Le queda 1 intento"
                loginMessage.innerText = "Le queda 1 intento"
            }
            else{warningAttempts="Le quedan "+loginAttemptsLeft+" intentos"
            } 
            loginMessage.innerText ="Los datos ingresados son incorrectos, revise usuario y contraseña e intentelo nuevamente."+"\n"+"Recuerde que luego de 3 intentos su usuario sera bloqueado por seguridad."+"\n"+warningAttempts
            
            loginAttempts=loginAttempts+1
            
        }
        else{loginMessage.innerText ="Alcanzo el numero maximo de intentos su usuario ha sigo bloqueado, por favor contactese con nuestro centro de ayuda"
            break
        }        
    }
    while(loginAttempts <= 3)


//loginForm.reset()

})

//support - user_login//
function validateLogin(usernameInput,passwordInput){

    // no esta funcionando
    if(usersName.includes(usernameInput) && users.some(passwordInput.value === password.value)){
        alert("includes")
        return true
    }
    else{
        alert("no coincide el user o password")
        return false
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


function storeUsers (){
localStorage.setItem("users",JSON.stringify(users))
}

function recoverUsers (){
    if (localStorage.getItem("users")) {
        users=JSON.parse(localStorage.getItem("users"))
    }
}