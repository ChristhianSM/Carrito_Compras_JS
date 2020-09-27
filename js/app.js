// Variables
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

//EventosListener
EventosListener();
function EventosListener(){
    listaCursos.addEventListener('click', agregarCurso);

    btnVaciarCarrito.addEventListener('click', (e) => {
        e.preventDefault();
        articulosCarrito = [];
        limpiarCarritoHTML();
    });
    carrito.addEventListener('click',eliminarArticulo);

    document.addEventListener("DOMContentLoaded", () =>{
        articulosCarrito = JSON.parse(localStorage.getItem('articulos')) || [];
        mostrarCarritoHTML();
    });

}

//Funciones
function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        const infoCurso ={
            img : cursoSeleccionado.querySelector('img').src,
            titulo: cursoSeleccionado.querySelector('h4').textContent,
            precio: cursoSeleccionado.querySelector('.precio span').textContent,
            idCurso : cursoSeleccionado.querySelector('a').getAttribute
            ('data-id'),
            cantidad : 1
        }

        const existeRepetido = articulosCarrito.some( articulo => articulo.idCurso === infoCurso.idCurso);

        if(existeRepetido){
            const cursos = articulosCarrito.map( curso =>{
                if ( curso.idCurso === infoCurso.idCurso) {
                    curso.cantidad ++
                    return curso;
                }else{
                    return curso;
                }
                articulosCarrito = [...cursos];
            })
        }else{
            articulosCarrito = [...articulosCarrito , infoCurso]
        }
        mostrarCarritoHTML();
    }
}

function eliminarArticulo(e){
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const id = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( articulo => articulo.idCurso !== id);
        mostrarCarritoHTML();
    }
}

function mostrarCarritoHTML(){
    limpiarCarritoHTML();

    articulosCarrito.forEach( articulo => {
        const {img , titulo, precio, cantidad, idCurso} = articulo;
        const row= document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src = ${img} width = "200">
            </td>
            <t> ${titulo}</td>
            <td> ${precio}</td>
            <td> ${cantidad}</td>
            <td>
                <a href ="#" data-id = ${idCurso} class = "borrar-curso"> X </a>
            </td>
        `
        listaCarrito.appendChild(row)
    })
    sincronizarLocalStorage(articulosCarrito);
}
function sincronizarLocalStorage(articulosCarrito){
    localStorage.setItem('articulos', JSON.stringify(articulosCarrito))
}

function limpiarCarritoHTML(){
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild)
    }
}