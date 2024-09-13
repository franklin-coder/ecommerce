const creditCardInput = document.getElementById("creditCard");
const expirationDateInput = document.getElementById("expirationDate");
const expirationYearInput = document.getElementById("expirationYear");
const securityCodeInput = document.getElementById("securityCode");


// Agregar eventos input a cada campo de entrada
creditCardInput.addEventListener("input", validateForm);
expirationDateInput.addEventListener("input", validateForm);
expirationYearInput.addEventListener("input", validateForm);
// securityCodeInput.addEventListener("input", validateForm);

// Funcion que valida el formulario
function validateForm(event) {

  event.preventDefault(); 

  // La expresion regular para validar una tarjeta de crédito de 16 dígitos
const creditCardRegex =  /[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4} {0,1}[0-9]{4}/;

// La expresion regular para validar el mes de expiración
const expirationMonthRegex = /^(0?[1-9]|1[0-2])$/

// La expresion regular para validar el año de expiración a partir de 2023
const expirationYearRegex = /^20[2-9][3-9]|21\d{2}|2099$/;

// La expresion regular para validar el código de seguridad de 3 o 4 dígitos
const securityCodeRegex = /^\d{3,4}$/;
let isValid = true;

  // Validar el número de tarjeta de crédito
  if (!creditCardRegex.test(creditCardInput.value)) {
    console.log("El número de tarjeta de crédito es inválido.");  
    creditCardInput.style.border = "3px solid red";
    creditCardInput.style.boxShadow = "0 0 8px white";
    $("#text_invalid_credit_card").text("Invalid credit card, it must be typed 16 digits  !Try again!").css("color", "red");
    isValid = false;
    return;
  } else {
  
    isValid = true;
    creditCardInput.classList.add("is-valid");
    creditCardInput.style.border = "3px solid #32CD32";
    creditCardInput.style.boxShadow = "0 0 8px #00FF00";
    $("#text_invalid_credit_card").text("Valid credit card number!").css("color", "#32CD32");
    
    
  }
  





  // Validar el mes de expiracion
  if (!expirationMonthRegex.test(expirationDateInput.value)) {
    console.log("El mes de expiracion es invalido.");
    $("#text_invalid_month").text("Invalid month, it must be typed a valid Month  !Try again!").css("color", "red");
    expirationDateInput.style.border = "3px solid red";
    expirationDateInput.style.boxShadow = "0 0 8px white";
    isValid = false;
    return;
  }
  else{
    expirationDateInput.classList.add("is-valid");
    expirationDateInput.style.border = "3px solid #32CD32";
    expirationDateInput.style.boxShadow = "0 0 8px #00FF00";
    $("#text_invalid_month").text("Valid Month").css("color", "#32CD32");;
    isValid = true;
  }





  // Validar el año de expiración
  if (!expirationYearRegex.test(expirationYearInput.value)) {
    console.log("El año de expiración es inválido.");
    expirationYearInput.classList.remove("is-valid");
    $("#text_invalid_year").text("Invalid year, it must be typed a valid year (four digits)  !Try again!").css("color", "red");
    expirationYearInput.style.border = "3px solid red";
    expirationYearInput.style.boxShadow = "0 0 8px white";    
    isValid = false;
    return;
  }
  else{
    expirationYearInput.classList.add("is-valid");
    $("#text_invalid_year").text("Valid Year").css("color", "#32CD32");
    expirationYearInput.style.border = "4px solid #32CD32";
    expirationYearInput.style.boxShadow = "0 0 8px white";
    
    
  
    isValid = true;
  }





  // Validar el código de seguridad
  if (!securityCodeRegex.test(securityCodeInput.value)) {
    console.log("El código de seguridad es inválido.");
    $("#Text_security_Code").text("Enter your security code and click VALIDATE!").css("color", "orange");
    isValid = false;
    return;
    
  }
  else{

    $("#Text_security_Code").text("Valid code!").css("color", "#32CD32");
    securityCodeInput.classList.add("is-valid");
    securityCodeInput.style.border = "3px solid #32CD32";
    securityCodeInput.style.boxShadow = "0 0 8px #00FF00";
    $("#Text_security_Code").text("VALID").css("color", "GREEN");
    isValid = true;
  }

  // Si se llega aquí, todos los campos son válidos
 if(isValid){


	// activate the next tab pane
	const nextTabLink = $('.nav-pills .nav-link.active').parent().next().find('.nav-link');
	const tab = new bootstrap.Tab(nextTabLink.get(0));
	tab.show();/// simula un click en la pestaña 2
}

   // Prevenir el envio del formulario si hay entradas invalidas
 if (!isValid) {
     event.preventDefault();            
  }
}
let Boton_primer_formulario = document.getElementById("paso_al_segundo_form");
Boton_primer_formulario.addEventListener("click", validateForm); 