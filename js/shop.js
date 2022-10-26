class Producto {
    constructor (id, nombre, precio, img) {
        this.id=id
        this.nombre=nombre
        this.precio=precio
        this.img=img
        this.cantidad=1
    }
}

const arroz = new Producto (1,"Arroz",50000,"../media/Eventos.webp")
const azucar = new Producto (2,"Azucar",70000,"../media/Estudio.webp")
const fideos = new Producto (3,"Fideos",100000,"../media/Corporativo.webp")
const mermelada = new Producto (4,"Mermelada",200000,"../media/Viajes.webp")
const queso = new Producto (5,"Queso",10000,"../media/Estudiar.webp")

//creo array con todos mis productos
const productos = [arroz, azucar, fideos, mermelada, queso]

//creo array carrito
let carrito = []

//cargar carrito si hay algo en el localstorage

if (localStorage.getItem("carrito")) {
    carrito=JSON.parse(localStorage.getItem("carrito"))
}

//DOM
const contenedorProductos=document.getElementById("contenedorProductos")

//funcion para mostrar productos
const mostrarProductos=()=>{
    productos.forEach((producto)=>{
        const card =document.createElement("div")
        card.classList.add("col-xl-3","col-md-6","col-xs-12")
        card.innerHTML=`
            <div class="card">
                <img src= "${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <button class="btn colorBoton" id="boton${producto.id}">Agregar al Carrito</button>
                </div>
            </div>
        `
        contenedorProductos.appendChild(card)

        //agregar productos al carrito
        const boton = document.getElementById(`boton${producto.id}`)
        boton.addEventListener("click",()=> {
            agregarAlCarrito(producto.id)
        })
    })
}

const agregarAlCarrito= (id)=> {
    const producto=productos.find((producto)=>producto.id === id)
    const productoEnCarrito = carrito.find((producto)=>producto.id === id)
    if(productoEnCarrito){
        productoEnCarrito.cantidad++
    }
    else{
        carrito.push(producto)
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
    carrito.forEach((producto)=>{
        const card =document.createElement("div")
        card.classList.add("col-xl-3","col-md-6","col-xs-12")
        card.innerHTML = `
            <div class="card">
                <img src= "${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
                <div class="card-body">
                <h5 class="card-title"> ${producto.nombre} </h5>
                <p class="card-text"> ${producto.precio} </p>
                <p class="card-text"> ${producto.cantidad} </p>
                <button class="btn colorBoton" id="eliminar${producto.id}">Elimiar Producot</button>
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card)

        //eliminar productos del carrito

        const boton=document.getElementById(`eliminar${producto.id}`)
        boton.addEventListener("click", ()=> {
            eliminarDelCarrito (producto.id)
            localStorage.setItem("carrito",JSON.stringify(carrito))
        })
    })
    calcularTotal ()
}       


const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id)
    const indice = carrito.indexOf(producto)
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
    carrito.forEach((producto)=>{
        totalCompra += producto.precio * producto.cantidad
    })
    total.innerHTML = `$${totalCompra}`
}