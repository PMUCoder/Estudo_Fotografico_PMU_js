//Ruta archivo JSON con coleccion de servicios
const services = "../services.json"

//Fetch servicios desde el JSON
fetch(services)
    .then(response=>response.json())
    .then((serviceList)=>{
        mostrarServicios(serviceList)
    })

//inicializo array del carrito vacio
let carrito = []

//Cargar carrito si hay algo en el LocalStorage
recoverFromLocalStorage()

//Activo el EventListener por si quedo algun item en el carrito que la notificacion se actualice
document.addEventListener("DOMContentLoaded", function() {
    quantityNotification()
})

//DOM identificar el div donde van los servicios a la venta
const contenedorServicios=document.getElementById("contenedorServicios")

//Funcion para mostrar servicios en el DOM
function mostrarServicios(serviceList) {
    serviceList.forEach((service)=>{
        let priceService=service.price
        let textPriceService=priceService.toLocaleString("es-AR", {style:"currency", currency:"ARS"})
        const card =document.createElement("div")
        card.classList.add("col-xl-3","col-md-6","col-xs-12")
        card.innerHTML=`
            <div class="card">
                <img src= "${service.img}" class="card-img-top imgServices" alt="${service.name}">
                <div class="card-body">
                    <h5 class="card-title"> ${service.name} </h5>
                    <p class="card-text"> ${textPriceService} </p>
                    <button class="btn btn-success" id="boton${service.id}">Agregar al Carrito</button>
                </div>
            </div>
        `
        contenedorServicios.appendChild(card)

        //Agregar servicios al carrito
        const boton = document.getElementById(`boton${service.id}`)
        boton.addEventListener("click",()=> {
            agregarAlCarrito(service.id)
        })
    })
}

//Funcion para agregar los servicios al carrito
const agregarAlCarrito = (id) => {
    fetch(services)
        .then(response => response.json())
        .then((serviceList) => {
            const service = serviceList.find((service) => service.id === id)
            const servicioEnCarrito = carrito.find((service) => service.id === id)
            if (servicioEnCarrito) {
                servicioEnCarrito.quantity++
                saveToLocalStorage()
            }
            else {
                carrito.push(service)
                saveToLocalStorage()
            }
            calcularTotal()
            quantityNotification()
            mostrarCarrito()
            Toastify({
                text:"Se agrego el servicio al carrito con éxito",
                duration:3000,
                gravity:"top",
                position:"center",
                style:
                {
                    background: "linear-gradient(to right, #000080, #8A2BE2)",
                }
            }).showToast()
    })
}

//EventListener del boton "mostrarCarrito" con evento "click"
const verCarrito=document.getElementById("verCarrito")
verCarrito.addEventListener("click", ()=> {
    if (carrito.length===0){
        Swal.fire('El carrito esta vacio, seleccione al menos un Servicio')
    }
    else{
        mostrarCarrito()
    }
})

//Funcion para mostrar carrito
const contenedorCarrito=document.getElementById("contenedorCarrito")
const mostrarCarrito=()=>{
    contenedorCarrito.innerHTML=""
    carrito.forEach((service)=>{
        let priceService=service.price
        let textPriceService=priceService.toLocaleString("es-AR", {style:"currency", currency:"ARS"})
        let card =document.createElement("div")
        card.classList.add("row")
        card.innerHTML = `
            <div class="col-3 d-flex align-items-center p-2 border-bottom">
                <img src="${service.img}" width="60"/>
            </div>
            <div class="col-2 d-flex align-items-center p-2 border-bottom">
                ${service.name}
            </div>
            <div class="col-2 d-flex align-items-center justify-content-center p-2 border-bottom">
                ${textPriceService}
            </div>
            <div class="col-1 d-flex align-items-center justify-content-center p-2 border-bottom">
                ${service.quantity}
            </div>
            <div class="col-1 d-flex align-items-center justify-content-center p-2 border-bottom">
                <a href="javascript:addQuantity(${service.id})">
                    <i class="fa-solid fa-square-plus"></i>
                </a>
            </div>
            <div class="col-1 d-flex align-items-center justify-content-center p-2 border-bottom">
                <a href="javascript:reduceQuantity(${service.id})">
                    <i class="fa-solid fa-square-minus"></i>
                </a>
            </div>
            <div class="col-1 d-flex align-items-center justify-content-center p-2 border-bottom">
                <a href="javascript:eliminarDelCarrito(${service.id})">
                    <i class="fa-solid fa-xmark text-danger"></i>
                </a>
            </div>
        `
        contenedorCarrito.appendChild(card)
    })
    quantityNotification()
    calcularTotal()
}       

//Funcion para eliminar un servicio puntual del carrito
const eliminarDelCarrito = (id) => {
    const service = carrito.find((service) => service.id === id)
    const indice = carrito.indexOf(service)
    carrito.splice(indice,1)
    mostrarCarrito()
    service.quantity=1
    saveToLocalStorage()
    Toastify({
        text:"Se eliminó el servicio del carrito",
        duration:3000,
        gravity:"top",
        position:"center",
        style:
        {
            background: "linear-gradient(to right, #006400, #228B22)",
        }
    }).showToast() 
}

//EventListener del boton "Vaciar Carrito" con evento "click" para vaciar todo el carrito de compras
const vaciarCarrito = document.getElementById("vaciarCarrito")
vaciarCarrito.addEventListener("click", ()=> {
    if (carrito.length===0){
        Swal.fire('El carrito ya se encuentra vacio')
    }
    else{
        eliminarTodoElCarrito()
        Toastify({
            text:"Se vació el carrito con éxito",
            duration:3000,
            gravity:"top",
            position:"center",
            style:
            {
                background: "linear-gradient(to right, #006400, #228B22)",
            }
        }).showToast()
    }
})

//Funcionalidad para eliminar todos los servicios del carrito
const eliminarTodoElCarrito=()=>{
    carrito.forEach((service)=>{
        service.quantity=1
    carrito=[]
    mostrarCarrito()
    localStorage.clear()
    })
}

//Calcula y muestra el total de la compra a medida que se agregan servicios
const total=document.getElementById("total")
const calcularTotal = () => {
    let totalCompra = 0
    carrito.forEach((service)=>{
    totalCompra += service.price * service.quantity
    })  
    let priceService=totalCompra
    let textPriceService=priceService.toLocaleString("es-AR", {style:"currency", currency:"ARS"})
    total.innerHTML = `${textPriceService}`
}

//Calcula la cantidad total de unidades en carrito para mostrar en el badge de notificacion
const totalQuantity=document.getElementById("quantityNotification")
const quantityNotification = () => {
    let quantityCart = 0
    carrito.forEach((service)=>{
        quantityCart += service.quantity
    })  
    totalQuantity.innerHTML = `${quantityCart}`
}

//Simulador para concretar compra del carrito presionando boton "Comprar Carrito"
const comprarCarrito = document.getElementById("comprarCarrito")
comprarCarrito.addEventListener("click", ()=> {
    if (carrito.length===0){
        Swal.fire('El carrito esta vacio, seleccione al menos un Servicio')
    }
    else{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Felicidades, la operacion de compra ha sido exitosa',
            showConfirmButton: false,
            timer: 3000
        })
        eliminarTodoElCarrito()
    }
})

//Boton "+" del carrito para agregar una unidad del servicio
function addQuantity (id) {
    const quantityInCart = carrito.find((service) => service.id === id)
    quantityInCart.quantity++
    mostrarCarrito()
    saveToLocalStorage()
}

//Boton "-" del carrito para reducir una unidad del servicio hasta el limite de 1 (al siguiente click lo elimina)
function reduceQuantity (id) {
    const quantityInCart = carrito.find((service) => service.id === id)
        if (quantityInCart.quantity>1) { 
            quantityInCart.quantity--
            mostrarCarrito()
            saveToLocalStorage()
        }     
        else{
            eliminarDelCarrito (id)
        }

}

//Recuperar carrito del localStorage
function recoverFromLocalStorage(){
    if (localStorage.getItem("carrito")) {
        carrito=JSON.parse(localStorage.getItem("carrito"))
    }
}

//Guardar carrito en localStorage
function saveToLocalStorage(){
localStorage.setItem("carrito",JSON.stringify(carrito))
}