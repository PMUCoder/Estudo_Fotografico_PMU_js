
class Service {
    constructor (nombre,precio){
        this.nombre = nombre
        this.precio = precio
        this.id = -1
    }
    
    show_description(){
        return (this.id + " - " +this.nombre + " - $" + this.precio)
    }

    set_id(new_id){
        this.id = new_id
    }
}

let array_servicios = new Array ()

let gen_id = 1
function service_system (){

    alert("Bienvenidos al sistema de gestion de servicios")

    let flag = true

    while (flag){

        let message = "Seleccione el numero del menu de abajo:"
        message +=    "\n1) Cargar nuevo servicio"
        message +=    "\n2) Eliminar servicio"
        message +=    "\n3) Mostrar los servicios disponibles"
        message +=    "\n4) Salir"

        let response = prompt(message)

        switch (response){
            case "1": 
                add_new_service()
                break
            case "2":          
                delete_service()
                break
            case "3":
                show_services()
                break
            case "4": 
                alert("Gracias por utilizar el modulo de servicios")
                flag=false
                break 
            case null: 
                alert("Gracias por utilizar el modulo de servicios")
                flag=false
                break
            default: 
                alert ("No ingreso una opcion valida")                
        }
    }
}

function add_new_service(){

    let service = new_service ()

    if (service) {
        service.set_id(gen_id)
        gen_id ++
        array_servicios.push(service)
        alert(array_servicios)
    }
}

function new_service(){

    let check = true

    while (check){

        let inputmsg = ""

        let nombre = prompt("Ingrese el nombre del servicio").trim()
        let precio = parseFloat(prompt ("Ingrese el precio"))
        if (!nombre){
            inputmsg += "\nDebe ingresar el nombre del servicio"
        }
        if (isNaN(precio)){
            inputmsg += "\nDebe ingresar un valor numerico"
        }
        if (inputmsg != ""){
            alert(inputmsg)
            check = confirm ("Desea reintentar la carga?")
        }
        else{
            return new Service (nombre,precio)
        }
    }
}

function delete_service (){

    if (service_exists()){

        show_services()
        let id_ingresado = prompt("Ingrese el id del servicio a eliminar")
        if (id_ingresado){
            let service_found = array_servicios.find((a)=> a.id == id_ingresado)
            if (service_found){
                let response = confirm ("Esta seguro de que desea eliminar el servicio "+service_found.show_description() + " ?")
                if (response) {
                    array_servicios=array_servicios.filter ((a) => a.id != id_ingresado)
                    alert("El servicio fue eliminado con éxito")
                }
            }
        }
    }
}

function service_exists(){
    if (array_servicios.length == 0) {
        alert("No hay ningun servicio cargado")
        return false
    }
    return true
}

function show_services(){
    if (service_exists()) {
        let response = prompt("El listado de Servicios se mostrara por ordenada por precio.\n Desea verla en forma Ascendente (A) o Desendente (D)").toUpperCase()
        if (response == "A") {
            array_servicios.sort((a,b) =>{
                if (a.precio > b.precio) {
                    return 1
                }
                if (a.precio < b.precio) {
                    return -1
                }
                return 0
            })
        }
        if (response == "D"){
            array_servicios.sort((a,b) =>{
                if (a.precio > b.precio) {
                    return -1
                }
                if (a.precio < b.precio) {
                    return 1
                }
                return 0
            })
        }
        show_description()
    }
}

document.addEventListener('DOMContentLoaded', function() {
    service_system()
})
