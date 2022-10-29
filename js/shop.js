class Service {
    constructor (id, name, price, img) {
        this.id=id
        this.name=name
        this.price=price
        this.img=img
        this.quantity=1
    }
}

const eventos = new Service (1,"Eventos",50000,"../media/Eventos.webp")
const estudio = new Service (2,"Estudio",70000,"../media/Estudio.webp")
const corporativo = new Service (3,"Corporativo",100000,"../media/Corporativo.webp")
const viajes = new Service (4,"Viajes",200000,"../media/Viajes.webp")
const estudiar = new Service (5,"Estudiar",10000,"../media/Estudiar.webp")

//creo array con todos los servicios
const services = [eventos, estudio, corporativo, viajes, estudiar]

//creo array carrito
let carrito = []

//cargar carrito si hay algo en el localstorage

if (localStorage.getItem("carrito")) {
    carrito=JSON.parse(localStorage.getItem("carrito"))
}

//DOM
const contenedorProductos=document.getElementById("contenedorProductos")

//funcion para mostrar servicios
const mostrarProductos=()=>{
    services.forEach((service)=>{
        const card =document.createElement("div")
        card.classList.add("col-xl-3","col-md-6","col-xs-12")
        card.innerHTML=`
            <div class="card">
                <img src= "${service.img}" class="card-img-top imgProductos" alt="${service.name}">
                <div class="card-body">
                <h5 class="card-title"> ${service.name} </h5>
                <p class="card-text"> ${service.price} </p>
                <button class="btn colorBoton" id="boton${service.id}">Agregar al Carrito</button>
                </div>
            </div>
        `
        contenedorProductos.appendChild(card)

        //agregar servicios al carrito
        const boton = document.getElementById(`boton${service.id}`)
        boton.addEventListener("click",()=> {
            agregarAlCarrito(service.id)
        })
    })
}

const agregarAlCarrito= (id)=> {
    const service=services.find((service)=>service.id === id)
    const productoEnCarrito = carrito.find((service)=>service.id === id)
    if(productoEnCarrito){
        productoEnCarrito.quantity++
    }
    else{
        carrito.push(service)
        localStorage.setItem("carrito",JSON.stringify(carrito))
    }
    calcularTotal ()
}

mostrarProductos()

const contenedorCarrito=document.getElementById("contenedorCarrito")
const verCarrito=document.getElementById("verCarrito")
verCarrito.addEventListener("click", ()=> {
    mostrarCarrito()
})


const mostrarCarrito=()=>{
    contenedorCarrito.innerHTML=""
    carrito.forEach((service)=>{
        const card =document.createElement("div")
        card.classList.add("col-xl-3","col-md-6","col-xs-12")
        card.innerHTML = `
            <div class="card">
                <img src= "${service.img}" class="card-img-top imgProductos" alt="${service.name}">
                <div class="card-body">
                <h5 class="card-title"> ${service.name} </h5>
                <p class="card-text"> ${service.price} </p>
                <p class="card-text"> ${service.quantity} </p>
                <button class="btn colorBoton" id="eliminar${service.id}">Elimiar Producot</button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card)

        //eliminar servicios del carrito

        const boton=document.getElementById(`eliminar${service.id}`)
        boton.addEventListener("click", ()=> {
            eliminarDelCarrito (service.id)
            localStorage.setItem("carrito",JSON.stringify(carrito))
        })
    })
    calcularTotal ()
}       


const eliminarDelCarrito = (id) => {
    const service = carrito.find((service) => service.id === id)
    const indice = carrito.indexOf(service)
    carrito.splice(indice,1)
    mostrarCarrito()

    localStorage.setItem("carrito",JSON.stringify(carrito)) 
}

//vacias carrito de compras

const vaciarCarrito = document.getElementById("vaciarCarrito")
vaciarCarrito.addEventListener("click", ()=> {
    eliminarTodoElCarrito()

    localStorage.clear()
})

const eliminarTodoElCarrito=()=>{
    carrito=[]
    mostrarCarrito()
    localStorage.clear()
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