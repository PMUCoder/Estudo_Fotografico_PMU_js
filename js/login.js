/* Objetos */
class platformUser {
    constructor(user,password){
        this.user=user
        this.password=password
        this.id=-1
        this.login = false
        this.info = function(){alert("Usuario: "&user&"\nPassword: "&password)}
    }
}

/* Array de usuarios */
const allUsers = []

/* Usuario administrador */
user1 = new platformUser ("admin","admin")
allUsers.push(user1.user)

function startLoginProcess (){
    let message = "Bienvendio. Seleccione la accion que desea realizar: "
    message +=    "\n1) Tengo usuario, quiero logearme"
    message +=    "\n2) No tengo usuario, deseo crear uno"
    message +=    "\n3) Modificar mis datos"
    message +=    "\n4) Eliminar mi usuario"
    message +=    "\n5) Salir"

let response = prompt(message)

    switch (response){

        case "1" : 
                userLogin()
                break
        case "2" :          
                createUser()
                break
        case "3" :
                modifyUser()
                break
        case "4"  : 
                deleteUser()
                break
        case "5" : 
                alert("Va a salir de la pagina, lo esperamos nuevamente");
                flag=false;
                break;        
        case null : 
                alert("Gracias por utilizar nuestra pagina :) ");
                flag=false;
                break;
        default : 
                alert ("No ingreso una opcion valida") ;                     
        }
}

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
    if(allUsers.includes(inputUser) && inputUser === user && inputPassword === password){
        return true
    }
    else{
        return false
    }
}

// acciona los eventos
document.addEventListener('DOMContentLoaded', function() {
    startLoginProcess()
})