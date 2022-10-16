class Services {
    constructor (nombre, precio){
        this.nombre = nombre
        this.precio = parseInt(precio)
    }
}

const eventos = new Services("Eventos", 75000)
const estudio = new Services("Estudio", 50000)
const corporativo = new Services("Corporativo", 100000)

const array_services = []

array_services.push(eventos)
array_services.push(estudio)
array_services.push(corporativo)

console.log(array_services)

let count_menu_access=0

function menu_principal(){
    alert("Bienvenidio al sistema de administracion de servicios")
    let option = parseInt(prompt("Seleccione de las siguientes opciones: \n 1)Ingreso de un nuevo servicio \n 2)Dar de baja un servicio \n 3)Modificar los datos de un servicio existente \n 4)Realizar una consulta \n 5)Salir del sistema de administracion de servicios"))
    count_menu_access=count_menu_access+1
    return option
}

function new_service(){
    let nombre = prompt("Ingrese el nombre del servicio que desea dar de alta:")
    let precio = prompt("Ingrese el precio inicial al cual desea listar el nuevo servicio:")
    let add_service = new Services(nombre, precio)
    array_services.push(add_service)
    console.log(array_services)
}

function delete_service(){
    let nombre = prompt("Ingrese el nombre del servicio a eliminar:")
    let service_todelete = array_services.find(service_todelete => service_todelete.nombre === nombre)
    let index = array_services.indexOf(service_todelete)
    array_services.splice(index, 1)
    console.log(array_services)
}

function modify_service(){
    let nombre = prompt("Ingrese el nombre del servicio a ser modificado:")
    let service_tomodify = array_services.find(service_tomodify => service_tomodify.nombre === nombre)
    let index = array_services.indexOf(service_tomodify)
    let precio = prompt("Ingrese el nuevo precio para el servicio seleccionado:")
    let service_modified = new Services(nombre, precio)
    array_services.splice(index, 1, service_modified)
    console.log(array_services)
}

function query_service(){
    let nombre = prompt("Ingrese el nombre del servicio a consultar:")
    let service_toquery = array_services.find(service_toquery => service_toquery.nombre === nombre)
    console.log(service_toquery)
}

function exit_menu(){
    alert("Ha abandonado el sistema de administracion de servicios")
}


let option = menu_principal()
switch (option){
    case 1:
        new_service()
            break
    case 2:
        delete_service()
            break
    case 3:
        modify_service()
            break
    case 4:
        query_service()
            break
    case 5:
        exit_menu()
            break    
    default:
    alert("No ha seleccionado ningun opcion")
}