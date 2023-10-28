
// guardamos la url de la api de los productos
const URL = '../json/productos.json'


const contenedorProductos = document.querySelector(".contenedor-productos")
const botonesCategorias = document.querySelectorAll(".boton-categoria")

// obtenemos los productos cargados en el localStorage:
let ropas = JSON.parse(localStorage.getItem("productos"));
let botonesVerMas = document.querySelectorAll('.btn-tarjeta')

// guardamos la url del html para mostrar productos
const URLdetalle = './pages/detalle.html'

const contendorDetalles = document.querySelector('#contenedor-detallado')
// let ropaDetallada = JSON.parse(localStorage.getItem("detalles"));
const numero = document.querySelector("#numero");

// creamos una funcion para mostrar los productos en pantalla:
function producto (productosElegidos) {
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(ropa => {
       
        let div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML += `
        <div class="contenedor-tarjetas">
        <img src="${ropa.imagen}" alt="${ropa.nombre}" class="img-tarjeta">
        <h3 class="titulo-tarjeta">${ropa.nombre}</h3>
        <p class="precio-tarjeta">$${ropa.precio}</p>
        <small class="descripcion-tarjeta">${ropa.descripcion}</small>
        <button class="btn-tarjeta" id="${ropa.id}">Ver más</button>
        </div>       
        `
        contenedorProductos.append(div);
    })
    btnDetalles();
}
botonesCategorias.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active");
        
        const productosCategorias = ropas.filter(ropa => ropa.categoria.id === e.currentTarget.id);
        producto(productosCategorias)
    })
    
})

    
    fetch(URL)
    .then(response => {
        if (response.status === 200) {
            console.log('Datos cargados exitosamente');
            return response.json();
        }
    })
    .then((data) => {
        const productos = data;
        localStorage.setItem("productos", JSON.stringify(productos));
        producto(ropas);
    })
    .catch((err) => {
        console.log(err);
    })
    
    
// creamos la funcion para ver el detalle del producto
function btnDetalles () {
        botonesVerMas = document.querySelectorAll('.btn-tarjeta')
        botonesVerMas.forEach(btnAgregar => {
            btnAgregar.addEventListener('click', (e) => {
                const idDetalle = e.currentTarget.id;
                const filtro = ropas.find(ropa => ropa.id === idDetalle);
                localStorage.setItem("detalles", JSON.stringify(filtro));
                location.href = URLdetalle
            })
        })
    }
