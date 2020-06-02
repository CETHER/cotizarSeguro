// Variables
const max = new Date().getFullYear();
const min = max - 20;
const formulario = document.getElementById('cotizar-seguro');
const selectAnios = document.getElementById('anio');
const marca = document.getElementById('marca');
const anio = document.getElementById('anio');

//Event listeners


(() => {
  
  formulario.addEventListener('submit', enviarDatos);
  
  for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
  }
})();



//Funciones
function enviarDatos(e) {
  e.preventDefault();

  //leer la marca seleccionada del select
  const marcaSleccionada = marca.options[marca.selectedIndex].value;
  
  //lee el valor del año
  const anioSeleccionado = anio.options[anio.selectedIndex].value;
  
  //lee el valor del tipo de seguro
  const tipoSeleccionado = document.querySelector('input[name="tipo"]:checked').value;
  ;
  //Crear instancia de interfaz
  const interfaz = new Interfaz();

  //revisar que los campos no estén vacios
  if (marcaSleccionada === '' || anioSeleccionado === '' || tipoSeleccionado === '') {
    //Interfaz, imprime un error
    interfaz.mostrarError('Faltan datos, revisa el formulario e intenta de nuevo', 'error');
  } else {
    //Instanciar y mostrar interfaz
  }
}



//Constructor para seguro
function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}

//Todo lo que se muestra
function Interfaz() { }

//Mensaje que imprime en el HTML

Interfaz.prototype.mostrarError = function(mensaje, tipo) {
  const div = document.createElement('div');

  if (tipo === 'error') {
    div.classList.add('mensaje', 'error');
  } else {
    div.classList.add('mensaje', 'correcto');
  }

  div.innerHTML = `${mensaje}`;
  formulario.insertBefore(div, document.querySelector('.form-group'));
  
  setTimeout(() => {
    document.querySelector('.mensaje').remove();
  }, 3000);
}