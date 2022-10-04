//shoppingCart//
function shoppingCart(){
    alert("Bienvenido a la pagina de compra online del Estudio Fotografico PMU")

    let cart=""
    let finishShopping=false

    while (!finishShopping){

        let serviceCode = prompt("Ingrese codigo del servicio a contratar de la siguiente lista"+"\n"+"1 - Eventos"+"\n"+"2 - Estudio"+"\n"+"3 - Corporativo"+"\n"+"4 - Viajes"+"\n"+"5 - Cursos"+"\n"+"Cuando no desee agregar mas items a su compra presione Cancel")

        let serviceDescription = getServiceDescription(serviceCode)

        if (serviceDescription){
            alert("El servicio seleccionado fue agregado con exito: "+serviceDescription)
            cart += "\n"+serviceDescription
        }
        else{
            if (serviceCode === null){
                alert("No se agrego ningun item, se cerrara el carrito")
                finishShopping = true
            }
            else {
                alert("Ingrese un codigo de producto valido")
            }
        }
    }

    if (cart != ""){
        let checkout = confirm ("Revise que los items sean los correctos y confirme la compra: "+cart)
        if (checkout){
            alert("Gracias por confiar en nosotros.")
        }
    }
}

//support - shoppingCart//
function getServiceDescription(serviceCode){

        let service
        switch(serviceCode){
            case "1":
                service = "Eventos"
                servicePrice = 50.000
                break
            case "2": 
                service = "Estudio"
                servicePrice = 40.000
                break
            case "3":
                service = "Corporativo"
                servicePrice = 30.000
                break
            case "4": 
                service = "Viajes"
                servicePrice = 100.000
                break   
            case "5": 
                service = "Cursos"
                servicePrice = 10.000
                break
            default:
                service = false         
        }
        return service
}