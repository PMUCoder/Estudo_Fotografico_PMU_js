const user="usuario1"
const password="pass123"

function userLogin(){

    let loginAttempts=1
    let loginAttemptsLeft=3

    do{
        let inputUser = prompt ("Ingrese su nombre de usuario:")
        let inputPassword = prompt ("Ingrese su password:")

        loginAttemptsLeft=loginAttemptsLeft-1

        if(validateLogin(inputUser,inputPassword)){
            shoppingCart()
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
function validateLogin(inputUser,inputPassword){
    if(inputUser === user && inputPassword === password){
        return true
    }
    else{
        return false
    }
}

// acciona los prompts
document.addEventListener('DOMContentLoaded', function() {
    userLogin()
})