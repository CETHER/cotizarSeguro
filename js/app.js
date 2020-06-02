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


//Objetos con sus prototypes
//Instancia Seguro
function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function() {
  /**
   * 1 = americano 1.15
   * 2 = asiatico 1.05
   * 3 = europeo 1.35
  */
  let cantidad; 
  const base = 2000;
  switch (this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35; 
      break;
  }

  //leer el año
  const diferencia = new Date().getFullYear() - this.anio;
  
  //cada año de diferencia se reduce el 3% el vaor del seguro
  cantidad = cantidad * (1 - (diferencia*.03))
  
  /**
   * Si el seguro es basico se multiplica por 30%
   * Si el seguro es completo 50% mas
   */
  if (this.tipo === 'basico') {
    cantidad *= 1.30;
  } else {
    cantidad *= 1.50;
  }
  return cantidad  
}

//Todo lo que se muestra
//Instancia interfaz
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
    const seguro = new Seguro(marcaSleccionada, anioSeleccionado, tipoSeleccionado);
    
    //Cotizar el seguro
    const cantidad = seguro.cotizarSeguro();
    
  }
}