let productosCarrito = JSON.parse(localStorage.getItem("carro"));
const contenedorCarrito = document.querySelector('#contenedor-carrito')
let btnEliminar = document.querySelectorAll('.btn-delete');

console.log('productos del carrito', productosCarrito);

productosCarrito.forEach(elemento => {

    let div_producto = document.createElement('div');
    div_producto.className = 'producto-carrito';

    let divAgregados = document.createElement('div');
    divAgregados.className = 'producto';

    let precioTotal = document.createElement('div');
    precioTotal.className = "total";

    let precioFinal = document.createElement('div');
    precioFinal.className = 'fin';

    divAgregados.innerHTML = `
        <img src="${elemento.imagen} class="img-carrito">
        <h3 class="titulo-carrito">${elemento.nombre}</h3>
        <p class="precio-carrito">$${elemento.precio}</p>
        <span class="cantidad-carrito">Cantidad Producto: ${elemento.cantidad}</span>
        <span class="eliminar">❌</span>

    `
    // precioTotal.innerHTML = `<div class="a-pagar">${total}</div>`
    // precioTotal.appendChild(precioFinal)
    // div_producto.appendChild(precioTotal)
    div_producto.appendChild(divAgregados)
    contenedorCarrito.appendChild(div_producto)
});