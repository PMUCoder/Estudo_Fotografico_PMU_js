const boton = document.getElementById("boton")

boton.addEventListener("click", ()=>{
    Swal.fire("Hola Mundo")
})

const botonDos = document.getElementById("botonDos")

botonDos.addEventListener("click", ()=>{
    swal.fire({
        title: "Hola comision",
        text: "gato",
        imageUrl: "https://placekitten.com/200/287",
        confirmButtonText: "Aceptar",
        background: "#fdebd0",
        backdrop: "#b7950b"
    })
})

const botonTres = document.getElementById("botonTres")

let carrito=["arroz","fideos","pan"]

botonTres.addEventListener("click", ()=>{
    swal.fire({
        title: "Estas seguro de eliminar el producto?",
        icon: "warning",
        background: "#fdebd0",
        backdrop: "#b7950b",
        confirmButtonText: "Aceptar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#b7950b",
        confirmButtonColor: "#b7950b",
    }).then((result) => {
        if(result.isConfirmed) {
            carrito=carrito.filter((producto)=>producto !== "fideos")
            console.log(carrito)
            swal.fire ({
                title:"Producto eliminado",
                icon: "success",
                confirmButtonColor: "#b7950b",
                confirmButtonText: "Aceptar",
                background: "#fdebd0"
            })
        }
    })
})

const botonCuatro = document.getElementById("botonCuatro")

botonCuatro.addEventListener("click", ()=>{
    swal.fire({
        title: "Login",
        html: `<input type="text" id="email" class="swal2-input" placeholder="Email">
        <input type="password" id="password" class="swal2-input" placeholder="password">`,
        confirmButtonText: "Enviar",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if(result.isConfirmed) {
            const email=document.getElementById("email").value
            const password=document.getElementById("password").value
            console.log(email,password)
            swal.fire({
                title: "Datos Enviados",
                icon: "success",
                confirmButtonText: "Aceptar",
            })   
        }
    }) 
})

//toastify

//notificaciones personalizadas
//solo sirve para poner un mensajito


//1.llamar a toastify y pasamos por parametro objeto las propiedades que queremos modificar, 
//2. concatenamos con metodo= showToast()


const botonCinco = document.getElementById("botonCinco")

botonCinco.addEventListener("click", ()=>{
    Toastify({
        text:"Producto agregado al Carrito",
        duration:3000,
        gravity:"top",
        position:"right",
        destination: "https://www.google.com",
        style:
        {
            background: "linear-gradient(to right, #b7950b, #fdebd0)"
        }
        //className: "nombre de la clase" --- se puede poner una clase propia
    }).showToast()
})

//luxon
// la clase principal es datetime, la definimos como const global para su mas facil acceso
const DateTime=luxon.DateTime

const fechaAnioNuevo=DateTime.local(2022,1,1,00,00)
console.log(fechaAnioNuevo)

//para transformarlo en algo mas legible puedo usar string
console.log(fechaAnioNuevo.toString())

//fecha del sistema metodo now, fecha y hora de este momento

const fechaActual=DateTime.now()
console.log("Metodo Now, fecha actual:")
console.log(fechaActual.toString())

//fecha pasando parametros
const navidad2023 = DateTime.fromObject(
    {day:25, hour:00, month:12}
)

console.log("Navidad")
console.log(navidad2023.toString())


//to locale string, me lo muestra mas amigable / se puede pasar año dia minuto segundo y week day (numero)

console.log(fechaActual.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY))

//transformacion de fechas, me permite hacer calculos sobre fechas y horas

const fechaMasTresDias = fechaActual.plus(
    {days:3}
)

//para restar en vez de plus se pone minus

console.log("Fecha mas 3 dias: ")
console.log(fechaMasTresDias.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY))

//clase duration

const Duracion=luxon.Duration

const duracion=Duracion.fromObject({days:3,hours:5,minutes:30})

//a la fecha actual le sumo la duracion

const fechaMasDuracion=fechaActual.plus(duracion)
console.log("Fecha + Duracion: ")
console.log(fechaMasDuracion.toLocaleString(DateTime.DATETIME_SHORT))