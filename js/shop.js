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

//DOM
const contenedorServicios=document.getElementById("contenedorServicios")

//Funcion para mostrar servicios en el DOM
function mostrarServicios(serviceList) {
    serviceList.forEach((service)=>{
        const card =document.createElement("div")
        card.classList.add("col-xl-3","col-md-6","col-xs-12")
        card.innerHTML=`
            <div class="card">
                <img src= "${service.img}" class="card-img-top imgServices" alt="${service.name}">
                <div class="card-body">
                <h5 class="card-title"> ${service.name} </h5>
                <p class="card-text"> ${service.price} </p>
                <button class="btn colorBoton" id="boton${service.id}">Agregar al Carrito</button>
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
            mostrarCarrito()
    })
}

//Funcionalidad del boton "mostrarCarrito" con evento "click"
const contenedorCarrito=document.getElementById("contenedorCarrito")
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
const mostrarCarrito=()=>{
    contenedorCarrito.innerHTML=""
    carrito.forEach((service)=>{
        const card =document.createElement("div")
        card.classList.add("col-xl-3","col-md-6","col-xs-12")
        card.innerHTML = `
            <div class="card">
                <img src= "${service.img}" class="card-img-top imgServices" alt="${service.name}">
                <div class="card-body">
                    <h5 class="card-title"> ${service.name} </h5>
                    <p class="card-text"> ${service.price} </p>
                    <p class="card-text"> ${service.quantity} </p>
                    <button class="btn colorBoton" id="eliminar${service.id}">Elimiar Servicio</button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card)

        //Funcionalidad del boton "Eliminar Servicio" con evento "click" / elimina el servicio seleccionado del carrito y resetea cantidad a 1
        const boton=document.getElementById(`eliminar${service.id}`)
        boton.addEventListener("click", ()=> {
            service.quantity=1
            eliminarDelCarrito (service.id)
            saveToLocalStorage()
            Toastify({
                text:"Se eliminó el servicio del carrito",
                duration:3000,
                gravity:"top",
                position:"center",
                style:
                {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast() 
        })
    })
    calcularTotal ()
}       

//Funcion para eliminar un servicio del carrito
const eliminarDelCarrito = (id) => {
    const service = carrito.find((service) => service.id === id)
    const indice = carrito.indexOf(service)
    carrito.splice(indice,1)
    mostrarCarrito()
    saveToLocalStorage()
}

//Funcionalidad del boton "Vaciar Carrito" con evento "click" vaciar todo el carrito de compras
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
                background: "linear-gradient(to right, #00b09b, #96c93d)",
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

//Mostrar el total de la compra a medida que se agregan servicios
const total=document.getElementById("total")
const calcularTotal = () => {
    fetch(services)
        .then(response => response.json())
        .then(() => {
            let totalCompra = 0
            carrito.forEach((service)=>{
            totalCompra += service.price * service.quantity
            })  
        total.innerHTML = `$${totalCompra}`
        })
}

//Simulador concretar compra del carrito presionando boton "Comprar Carrito"
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

//Recuperar del localStorage
function recoverFromLocalStorage(){
    if (localStorage.getItem("carrito")) {
        carrito=JSON.parse(localStorage.getItem("carrito"))
    }
}

//Guardar en localStorage
function saveToLocalStorage(){
localStorage.setItem("carrito",JSON.stringify(carrito))
}