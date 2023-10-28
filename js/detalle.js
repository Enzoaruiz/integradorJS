let ropaDetallada = JSON.parse(localStorage.getItem("detalles"));
const contenedorDetalles = document.querySelector('.contenedor-detallado')
const URL = '../json/productos.json'
const arrayRopaDetallada = [];
let botonCarrito = document.querySelectorAll('.btn-tarjeta')
const numero = document.querySelector("#numero");
console.log(botonCarrito);
arrayRopaDetallada.push(ropaDetallada)
fetch(URL)
.then(response => {
    if (response.status === 200) {
        return response.json();
    }
})
.then((data) => {
    const productos = data;
    localStorage.setItem("productos", JSON.stringify(productos));
    detalle();
    addCarrito()
})
.catch((err) => {
    console.log(err);
})


function detalle () {
    arrayRopaDetallada.forEach(ropa => {
    contenedorDetalles.innerHTML += `
            <div class="contenedor">
                <img src="${ropa.imagen}" alt="${ropa.nombre}" class="img-tarjeta">
                <h3 class="titulo-tarjeta">${ropa.nombre}</h3>
                <p class="precio-tarjeta">$${ropa.precio}</p>
                <small class="descripcion-tarjeta">${ropa.descripcion}</small>
                <button class="btn-tarjeta" id="${ropa.id}">Agregar al carrito</button>
            </div>       
        `        
    })
}

function addCarrito () {
    botonCarrito = document.querySelectorAll('.btn-tarjeta');
    
    botonCarrito.forEach(boton => {
        boton.addEventListener('click', agregarCarrito);
    });
}
let carrito;
const productosCarritoLS = JSON.parse(localStorage.getItem("carro"));
if (productosCarritoLS){
    carrito =  productosCarritoLS;
    actualizarNumero()
} else {
    carrito = [];
}

// creamos una funcion para agregar al carrito
function agregarCarrito (e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = arrayRopaDetallada.find(ropa => ropa.id === idBoton);

    if(carrito.some(ropa => ropa.id === idBoton)) {
       const index = carrito.findIndex(ropa => ropa.id === idBoton)
       carrito[index].cantidad++;

    } else {
        productoAgregado.cantidad = 1; 
        carrito.push(productoAgregado);
    }
    actualizarNumero();

    localStorage.setItem("carro",JSON.stringify(carrito));
}


function actualizarNumero() {
    let nuevoNumero = carrito.reduce((acc, ropa) => acc + ropa.cantidad, 0);
    numero.innerText = nuevoNumero;
}