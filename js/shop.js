//ruta archivo JSON con coleccion de servicios
const services = "../services.json"

//creo array carrito vacio
let carrito = []

//cargar carrito si hay algo en el localstorage
recoverFromLocalStorage()

//DOM
const contenedorServicios=document.getElementById("contenedorServicios")

//Fetch servicios desde el JSON
fetch(services)
    .then(response=>response.json())
    .then((serviceList)=>{
        mostrarServicios(serviceList)
    })

//mostrar los servicios en el DOM
mostrarServicios()

//funcion para mostrar servicios
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

        //agregar servicios al carrito
        const boton = document.getElementById(`boton${service.id}`)
        boton.addEventListener("click",()=> {
            agregarAlCarrito(service.id)
        })
    })
}

//Funcion para agregar productos al carrito
const agregarAlCarrito= (id)=> {
    alert("hello")
    const service=services.find((service)=>service.id === id)
    const servicioEnCarrito = carrito.find((service)=>service.id === id)
        if(servicioEnCarrito){
            servicioEnCarrito.quantity++
        }
        else{
            carrito.push(service)
            saveToLocalStorage()
        }
    calcularTotal()
    mostrarCarrito()
}

const contenedorCarrito=document.getElementById("contenedorCarrito")
const verCarrito=document.getElementById("verCarrito")
verCarrito.addEventListener("click", ()=> {
    mostrarCarrito()
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
                <button class="btn colorBoton" id="eliminar${service.id}">Elimiar Producot</button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card)

        //eliminar servicios del carrito, resetea la cantidad de unidades del servicio a 1
        const boton=document.getElementById(`eliminar${service.id}`)
        boton.addEventListener("click", ()=> {
            service.quantity=1
            eliminarDelCarrito (service.id)
            saveToLocalStorage()
        })
    })
    calcularTotal ()
}       

//funcion para eliminar un servicio del carrito
const eliminarDelCarrito = (id) => {
    const service = carrito.find((service) => service.id === id)
    const indice = carrito.indexOf(service)
    carrito.splice(indice,1)
    mostrarCarrito()
    saveToLocalStorage()
}

//vaciar carrito de compras
const vaciarCarrito = document.getElementById("vaciarCarrito")
vaciarCarrito.addEventListener("click", ()=> {
    eliminarTodoElCarrito()
    localStorage.clear
})

const eliminarTodoElCarrito=()=>{
    carrito.forEach((service)=>{
        service.quantity=1
    carrito=[]
    mostrarCarrito()
    localStorage.clear()
})
}

//total de la compra
const total=document.getElementById("total")
const calcularTotal = () => {
    let totalCompra = 0
    carrito.forEach((service)=>{
        totalCompra += service.price * service.quantity
    })
    total.innerHTML = `$${totalCompra}`
}

//recuperar del localStorage
function recoverFromLocalStorage(){
    if (localStorage.getItem("carrito")) {
        carrito=JSON.parse(localStorage.getItem("carrito"))
    }
}

//guardar en localStorage
function saveToLocalStorage(){
localStorage.setItem("carrito",JSON.stringify(carrito))
}