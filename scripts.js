// Datos de ejemplo para los productos, extendidos para un total de 20
const productos = [
    { id: 1, nombre: 'camisa estampada', precio: 10, imagen: 'imagenes/camisa4.avif', pagina: 'producto1.html' },
    { id: 2, nombre: 'camisa vintage', precio: 15, imagen: 'imagenes/camisa5.webp', pagina: 'producto2.html' },
    { id: 4, nombre: 'camisa estampada', precio: 10, imagen: 'imagenes/camisa4.avif', pagina: 'producto1.html' },
    { id: 5, nombre: 'camisa vintage', precio: 15, imagen: 'imagenes/camisa5.webp', pagina: 'producto2.html' },
    { id: 7, nombre: 'camisa estampada', precio: 10, imagen: 'imagenes/camisa4.avif', pagina: 'producto1.html' },
    { id: 8, nombre: 'camisa vintage', precio: 15, imagen: 'imagenes/camisa5.webp', pagina: 'producto2.html' },
    { id: 10, nombre: 'camisa estampada', precio: 10, imagen: 'imagenes/camisa4.avif', pagina: 'producto1.html' },
    { id: 11, nombre: 'camisa vintage', precio: 15, imagen: 'imagenes/camisa5.webp', pagina: 'producto2.html' },
    { id: 13, nombre: 'camisa estampada', precio: 10, imagen: 'imagenes/camisa4.avif', pagina: 'producto1.html' },
    { id: 14, nombre: 'camisa vintage', precio: 15, imagen: 'imagenes/camisa5.webp', pagina: 'producto2.html' },
    { id: 16, nombre: 'camisa estampada', precio: 10, imagen: 'imagenes/camisa4.avif', pagina: 'producto1.html' },
    { id: 17, nombre: 'camisa vintage', precio: 15, imagen: 'imagenes/camisa5.webp', pagina: 'producto2.html' },
    { id: 19, nombre: 'camisa estampada', precio: 10, imagen: 'imagenes/camisa4.avif', pagina: 'producto1.html' },
    { id: 20, nombre: 'camisa vintage', precio: 15, imagen: 'imagenes/camisa5.webp', pagina: 'producto2.html' },
];

let carrito = [];

// Cargar carrito desde LocalStorage al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeLocalStorage();
    mostrarProductos();
    configurarBotones();
});

// Mostrar productos en la página principal
function mostrarProductos() {
    const lista = document.getElementById('productos-lista');
    if (lista) {
        productos.forEach(producto => {
            const item = document.createElement('div');
            item.className = 'producto';
            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                <a href="${producto.pagina}" target="_blank">Ver Detalles</a>
            `;
            lista.appendChild(item);
        });
    }
}

// Configurar botones del modal y del carrito
function configurarBotones() {
    const verCarritoBtn = document.getElementById('ver-carrito');
    if (verCarritoBtn) {
        verCarritoBtn.addEventListener('click', mostrarCarrito);
    }

    const modal = document.getElementById('carrito-modal');
    const closeModalBtn = document.querySelector('.close');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    const borrarCarritoBtn = document.getElementById('borrar-carrito');
    if (borrarCarritoBtn) {
        borrarCarritoBtn.addEventListener('click', borrarCarrito);
    }

    const comprarBtn = document.getElementById('comprar');
    if (comprarBtn) {
        comprarBtn.addEventListener('click', mostrarGraciasCompra);
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const productoEnCarrito = carrito.find(p => p.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarritoEnLocalStorage();
    actualizarContadorCarrito();
    alert(`${producto.nombre} ha sido agregado al carrito.`);
}

// Función para quitar un producto del carrito
function quitarDelCarrito(id) {
    const productoEnCarrito = carrito.find(p => p.id === id);

    if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
        productoEnCarrito.cantidad--;
    } else {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarritoEnLocalStorage();
    actualizarContadorCarrito();
    mostrarCarrito(); // Refrescar el modal del carrito
}

// Actualizar el contador del carrito en la navegación
function actualizarContadorCarrito() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    }
}

// Mostrar el carrito en un modal
function mostrarCarrito() {
    const modal = document.getElementById('carrito-modal');
    const carritoLista = document.getElementById('carrito-lista');
    carritoLista.innerHTML = ''; // Limpiar la lista actual

    if (carrito.length === 0) {
        carritoLista.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(producto => {
            const item = document.createElement('div');
            item.className = 'producto';
            item.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
                <button onclick="quitarDelCarrito(${producto.id})">Quitar</button>
            `;
            carritoLista.appendChild(item);
        });
    }

    mostrarTotal();
    modal.style.display = 'block';
}

// Mostrar el total en el carrito
function mostrarTotal() {
    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    const totalElemento = document.getElementById('carrito-total');
    if (totalElemento) {
        totalElemento.textContent = `Total: $${total}`;
    }
}

// Guardar el carrito en LocalStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Cargar el carrito desde LocalStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarContadorCarrito();
    }
}

// Borrar el carrito y limpiar LocalStorage
function borrarCarrito() {
    carrito = [];
    guardarCarritoEnLocalStorage();
    actualizarContadorCarrito();
    mostrarCarrito();
}

// Mostrar ventana emergente de agradecimiento
function mostrarGraciasCompra() {
    const modal = document.getElementById('gracias-modal');
    if (modal) {
        const mensaje = document.getElementById('mensaje-gracias');
        mensaje.innerHTML = `
            <h2>¡Gracias por su compra!</h2>
            <p>Para efectuar el pago, por favor utilice una de las siguientes opciones:</p>
            <ul>
                <li>Bancolombia</li>
                <li>A la mano</li>
                <li>Nequi</li>
                <li>Efecty</li>
            </ul>
            <p><strong>Datos del vendedor:</strong></p>
            <p>Nombre: Juan Pérez</p>
            <p>Celular: 3001234567</p>
            <p>Correo: juan.perez@example.com</p>
            <button onclick="cerrarGraciasCompra()">Cerrar</button>
        `;
        modal.style.display = 'block';
    }
}

// Cerrar ventana emergente de agradecimiento
function cerrarGraciasCompra() {
    const modal = document.getElementById('gracias-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}
