import '../../node_modules/cypress-xpath' 


Cypress.on('uncaught:exception', (err, runnable) => {  //Esto es para silenciar los errores propios de la página que están fuera de mi control.
  return false;
});



describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('app is running')
  })
});


/*
  Nombre del caso: Login fallido
  Objetivo: Intentar loguearse a la página con un usuario y contraseña incorrectos, es decir, no registrados
  Casos de prueba: [[email: josh_jd@estudiantec.cr, contraseña: 123]] 
  Resultado esperado: Una interfaz con un mensaje que dice 'El Usuario o Contraseña son incorrectos o su cuenta no esta activa.'
*/


describe('Login fallido', function() {
  beforeEach(function () {
    cy.visit('https://www.casas.co.cr/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0'
      }
    });
  });

  it('Usuario o contraseña inválidos', () => {
      cy.xpath('/html/body/div[1]/div/div[2]/form/div/div[2]/input').type('josh_jd@estudiantec.cr');
      cy.xpath('/html/body/div[1]/div/div[2]/form/div/div[3]/input').type('123');
      cy.xpath('/html/body/div[1]/div/div[2]/form/div/div[4]/input').click().then(function() {
      cy.contains('El Usuario o Contraseña son incorrectos o su cuenta no esta activa.').should('exist');
    });
  });

});



/*
  Nombre del caso: Buscar casas 1
  Objetivo: Buscar casas según alguna propiedad seleccionada
  Casos de prueba: [[Tipo de propiedad: Lote]] 
  Resultado esperado: Cambio de la url a https://www.casas.co.cr/search_es.php y despliegue de las casas según la propiedad seleccionada
*/


describe('Buscar casas 1', function() { //No existe forma de verificar el orden dentro de la página, por lo que la prueba está hecha para verificar que la url cambió a la de zona de ventas.
  beforeEach(function () {              //Al ejecutar la prueba, se puede verificar en la interfaz que efectivamente se hizo la búsqueda según el filtro seleccionado.
    cy.visit('https://www.casas.co.cr/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0'
      }
    });
  });

  it('Búsqueda seleccionando propiedad', () => {
    cy.xpath('/html/body/div[4]/div/form/div/div[2]/select').select('2');
    cy.xpath('/html/body/div[4]/div/form/div/div[4]/input').click();
    cy.url().should('include', 'search_es.php');
  });

});


/*
  Nombre del caso: Buscar casas 2
  Objetivo: Buscar casas según una provincia y un cantón
  Casos de prueba: [[Provincia-cantón: San José-Acosta]] 
  Resultado esperado: Cambio de la url a https://www.casas.co.cr/search_es.php y despliegue de las casas según la provincia y cantón seleccionados
*/


describe('Buscar casas 2', function() {
  beforeEach(function () {
    cy.visit('https://www.casas.co.cr/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0'
      }
    });
  });

  it('Búsqueda seleccionando provincia-cantón', () => {
    cy.xpath('/html/body/div[4]/div/form/div/div[3]/select').select('1-112');
    cy.xpath('/html/body/div[4]/div/form/div/div[4]/input').click();
    cy.url().should('include', 'search_es.php');
  });

});


/*
  Nombre del caso: Buscar casas 3
  Objetivo: Buscar casas según un interés, ya sea comprar, alquilar o ambas
  Casos de prueba: [[Interés: Solo comprar]] 
  Resultado esperado: Cambio de la url a https://www.casas.co.cr/search_es.php y despliegue de las casas según el interés seleccionado
*/


describe('Buscar casas 3', function() {
  beforeEach(function () {
    cy.visit('https://www.casas.co.cr/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0'
      }
    });
  });

  it('Búsqueda seleccionando según interés', () => {
      cy.get('select[name="ESTADO"]').select('1'); //Otra forma de hacer la prueba en lugar de usar xpath :D
      cy.get('input[name="SUBMIT"]').click();
      cy.url().should('include', 'search_es.php');

  });

});

