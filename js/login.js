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

const users = []

users.push(admin)
users.push(testUser)


//funcion login

const loginForm= document.getElementById("loginForm")
loginForm.addEventListener("submit",(e) => {
e.preventDefault()
const username=document.getElementById ("username")
const password=document.getElementById ("password")
userLogin()
//changePassword()
//deleteUser()


//console.log("El username ingresado es: "+username.value)
//console.log("El password ingresado es: "+password.value)
//console.log("Formulario enviado")
loginForm.reset()
})

//logoffUser()

function userLogin(){

    let loginAttempts=1
    let loginAttemptsLeft=3
    let loginMessage="Ok"

    do{
        loginAttemptsLeft=loginAttemptsLeft-1
        if(validateLogin(username,password)){
            alert("El usuario se logeo con exito")
            break
        }
        else if(loginAttempts < 3 && loginAttempts >= 1){
            
            if(loginAttemptsLeft==1){
                warningAttempts = "Le queda 1 intento"
            }
            else{warningAttempts="Le quedan "+loginAttemptsLeft+" intentos"
            }
            
            alert("Los datos ingresados son incorrectos, revise usuario y contraseña e intentelo nuevamente."+"\n"+"Recuerde que luego de 3 intentos su usuario sera bloqueado por seguridad."+"\n"+warningAttempts)
            
            loginAttempts=loginAttempts+1
            
        }
        else{alert("Alcanzo el numero maximo de intentos su usuario ha sigo bloqueado, por favor contactese con nuestro centro de ayuda")
            break
        }        
    }
    while(loginAttempts <= 3)
}

//support - user_login//
function validateLogin(username,password){
    if(users.find(username) === true && users.some(inputPassword === password)){
        return true
    }
    else{
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


