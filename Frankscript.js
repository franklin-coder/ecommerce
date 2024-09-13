



/*aca creo las variables que voy a necesitar tanto para el off canvas como para la modal*/
let total_ = 0;
let cambioNormal = 1; // esta variable la voy a usar para multiplicar el total que vaya a usar por  1
let costoAdicionalPorLaCompra = 0;// aca inicializo en 0 pero en la funciones lo cambio al 10% por cada producto
let precioDeInpuestos = 0;
let costoTotalConTaxes =0.0;
let impuestosDelPais = "";
let impuestosDeLaProvincia = "";
let impuestoFederal = 0.05;
let province_taxes_PST = 0.0;












/*url de la API*/
let url = "https://deepblue.camosun.bc.ca/~c0180354/ics128/final/fakestoreapi.json";


//aca creo la funcion que me recibe la informacio de la url o la api y me almacena los datos, luego los convierto en jason y por ultimo accedo a ellos para pitar en el container
let getproducts = async () => {
  return new Promise(async (resolve) => {
		const response = await fetch(url);
		const data = await response.json();
		
		for(i=0 ; i < data.length ; i++){
			let product_id = data[i].id;
			let imagenDelProducto = data[i].image;
			let nombreDelProducto = data[i].title;
			let descripcionDelProducto = data[i].description;
			let precioDelProducto = data[i].price * cambioNormal ;
			precioDelProducto = precioDelProducto.toFixed(2);
			$("#container_deProductos").append(`<div class="col">
											<div class="card bg-light m-2" >
												<img id="image_product_${product_id}" src="${imagenDelProducto}" class="card-img-top" alt="don't support bootstrap" >
													<div class="card-body">
														<h5 id="title_product_${product_id}" class="card-title">${nombreDelProducto}</h5>
														<p id="descripcionDelProducto${product_id}" class="card-text">${descripcionDelProducto}</p>
														<span><b>$</b></span>
														<span id="price_product_${product_id}" class="card-text mb-3"><b>${precioDelProducto}</span>
														<p><button id="button_p${product_id}" class="botonAgregarAlCarro btn btn-success mt-3 text-center" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft" aria-controls="offcanvasLeft" data-id="${product_id}" data-title="${nombreDelProducto}" data-price="${precioDelProducto}" style="background-image: linear-gradient(to bottom, #36d6d6, rgb(6 95 82));">Add To Cart</button></p>
													</div>
												</div>
											</div>`);

		    									
		}
		resolve();
	});
};
getproducts();






















/*aca incia la funcion para calcula los totales tanto de off canvas sin impuestos como de la modal pestana 4 con impuestos sumando un 15% dolares mas por*/

function calcularTotal(){
    $("#totalCompraEnElCarrito").html("<b>Total cost is : $"+ total_.toFixed(2)+"</b>");
    $("#order_details_totals_sub").html("<b>$"+ total_.toFixed(2)+"</b>");

    /*Aqui estoy agregando el 15% adicional de shipping */
    costoAdicionalPorLaCompra = 0.15 * total_.toFixed(2);
    $("#order_details_totals_shipping").html("<b>$"+ costoAdicionalPorLaCompra.toFixed(2)+"</b>");

    precioDeInpuestos = (impuestoFederal * total_.toFixed(2)) + (province_taxes_PST * total_.toFixed(2));
    $("#order_details_totals_tax").html("<b>$"+ precioDeInpuestos.toFixed(2)+"</b>");

    costoTotalConTaxes = parseFloat(total_.toFixed(2)) + parseFloat(costoAdicionalPorLaCompra) + parseFloat(precioDeInpuestos);
    $("#order_details_totals_total").html("<b>$"+ costoTotalConTaxes.toFixed(2)+"</b>");
}











/*Limpiar carrito del off canvas esta funcion borra todos los productos del off canvas */
function limpiar_carrito(){
	total_ = 0.0;
    $(".newitem").remove();
	$("#totalCompraEnElCarrito").html("<b>Total cost is : $"+ total_.toFixed(2)+"</b>");
	/*aca estoy eliminado todos los items o productos de mi off canvas*/
	$('.orderdetailsitems').empty();
	/*aca lo dejo limpio*/
	$("#order_details_totals_sub").html("<b>$"+ total_.toFixed(2)+"</b>");
	costoAdicionalPorLaCompra = 0;
	$("#order_details_totals_shipping").html("<b>$"+ costoAdicionalPorLaCompra.toFixed(2)+"</b>");
	precioDeInpuestos =0;
	$("#order_details_totals_tax").html("<b>$"+ precioDeInpuestos.toFixed(2)+"</b>");
	costoTotalConTaxes = 0;
	$("#order_details_totals_total").html("<b>$"+ costoTotalConTaxes.toFixed(2)+"</b>");
}


/*aca finaliza Limpiar carrito del off canvas esta funcion borra todos los productos del off canvas */



/*aca creo el evento para que cuando el usuario le de click borre los productos del canvas*/


$(document).on('click', '.borrarArticuloDelCarrito', function() {
  let id = $(this).data('id');
  let subtotal = $(`#total_${id}`).text();
  total_ = total_ - parseFloat(subtotal);
  calcularTotal();
  $(`.newitem_${id}`).remove();
});


/*aca finaliza  el eventlistener del evento para que cuando el usuario le de click borre  los productos del canvas*/

let cantidad = 1;  //ACA INCIO LA CANTIDAD EN 1 aca almaceno la cantidad de productos

/*aca creo el evento click y la funcion para que cuando el usuario le de click en el boton add to cart me agregue los productos al off canvas*/
$(document).on("click", ".botonAgregarAlCarro", function(){
	let id = $(this).data('id');
	let title = $(this).data('title');
	let price = $(this).data('price');
	total_ = total_ + parseFloat(price);
	calcularTotal();
	
	if($(`#title_${id}`).text() == title ) {
		/*aca valido si el prducto ya se a agregado anteriormente solo me actualizaria la variable de la cantidad*/
		let cantidadActual = parseInt($(`#quantity_${id}`).text());
		cantidadActual =  cantidadActual + cantidad; // aca le estoy sumando 1 a la cantidad 
		$(`#quantity_${id}`).text(cantidadActual); // aca le imrpimo cantidad actualizada 
		let currentTotal = parseFloat($(`#price_${id}`).text());
		currentTotal = cantidadActual * price; // aca le multiplico cantidad actualizada por el precio
		$(`#total_${id}`).text(currentTotal); // aca le imrpimo el precio actualizado
	} 
	else{
		/*aca valido si el prducto no se a agregado anteriormente lo creo en el offcanvas*/
		let nuevoArticulo = `
								<div id="button_${id}" class="col-2 text-center text-white newitem newitem_${id} mb-1"><button id="delete_item" class=" bg-dark borrarArticuloDelCarrito newitem newitem_${id}" data-subtotal="${price * cantidad}" data-id="${id}"><i class="bi bi-trash"></i></button></div>
								<div id="title_${id}" class="col-4 text-center text-white newitem newitem_${id} mb-1">${title}</div>
								<div id="quantity_${id}" class="col-2  text-center  text-white newitem newitem_${id} mb-1">${cantidad}</div>
								<div id="price_${id}" class="col-2 text-center  text-white newitem newitem_${id} mb-1">${price}</div>
								<div id="total_${id}" class="col-2 text-end  text-white newitem newitem_${id} mb-1">${price * cantidad}</div>	
								</br>						
							`;
		$('#canvas_shopping_car_subtotal').append(nuevoArticulo);
	}
});
























/*aca estoy llamando el api de la currency para cambiar a USD DOLARES DE ESTADOS UNIDOS*/
let urlDeLaApiModena = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/cad/usd.json";





// aca creo el escuchador de eventos para cambiar la moneda validando si es 1 seria canada y si es 2 seria estados unidos

const monedaSeleccionada = document.getElementById("monedaSeleccionada");
monedaSeleccionada.addEventListener("change", function() {
	let TipoDeMoneda = monedaSeleccionada.value;
	switch(TipoDeMoneda) {
		case "CAD":
			/* si el usuario elige canada entonces uso mi cambio normal la variable y le pongo 1 para que me de el mismo valor original del producto que traigo con el id*/ 
			cambioNormal = 1;
			setTimeout(async () => {
				await CambiarModena(cambioNormal);
			}, 0);
			break;
		case "USD":
			/* si el usuario elige usd entonces uso mi la api  CAMBIAR MI VALOR original que traigo con el id.. pero a usd pasando por parametro el cambio normal*/ 
			let LlamandoApiModenas = async () => {
				const response = await fetch(urlDeLaApiModena);
				const costoDeLaModena = await response.json();
				cambioNormal = parseFloat(costoDeLaModena.usd); // EN ESTA LINEA ESTOY LLAMANDO y tomando usando EL VALOR DE USD 
				setTimeout(async () => {
					await CambiarModena(cambioNormal);
				}, 0);
			};
			LlamandoApiModenas();
			break;
		default:
			console.log("Moneda no reconocida");
	}
});





//aca actualizo los pruductos despues que se ha seleccionado la moneda y actualizo en mi carrito osea el off canvas


let CambiarModena = async (cambiarValor) => {
	total_ = 0; //La variable "total_" se inicializa en cero.

  // ACA ELIMINO LOS PRDUCTOS EXISTENTES
  $("#container_deProductos").empty();
  // ACA LLAMO LA FUNCION getproducts con el parametro cambiarValor
  await getproducts(cambiarValor);
	const element = document.getElementById('canvas_shopping_car_subtotal'); //capturo elemento HTML con el ID "canvas_shopping_car_subtotal" y se guarda en la variable "element"
	let numb = element.childNodes.length; //cuento el numero de  hijos de mi carrito y la almaneco aca en esta variable "numb".
	if (numb > 1){ //  si tengo por lo menos un hijo osea un producto en mi carrito entonces 
		const divs_newitem = document.getElementsByClassName("newitem"); // capturo mis nuevos prductos
		let priceNumbers = []; //Creo um array [para almacenar mis produtos]
		// inicializo un bucle para contar los precios de los elemtnos todos usando el .length
		for (let i = 0; i < divs_newitem.length; i++) {
			let div = divs_newitem[i]; // cre mi variable
			let id = div.id;
			if (id.startsWith("price_")) {	// aca comparo todos los id que inicien con "price_"			
				let priceNumber = parseInt(id.split("_")[1]); // aca estoy tomando sol la parte numerica del id
				priceNumbers.push(priceNumber); // aca relleno mi array priceNumers 
			}
		}


		for(let f = 0;f < priceNumbers.length; f++){ // aca uso mi mi array priceNumers usando todo su largo de elementos
			let currentPrice = parseFloat($(`#price_product_${priceNumbers[f]}`).text()); 
			$(`#price_${priceNumbers[f]}`).text(currentPrice);
			let cantidadActual = parseInt($(`#quantity_${priceNumbers[f]}`).text());
			$(`#total_${priceNumbers[f]}`).text(currentPrice * cantidadActual);
			total_ = total_ + parseFloat(currentPrice * cantidadActual);
		}
		calcularTotal();
	}
};





















































//aca inicio la validacion del formulario DOS EN LA MODAL OSEA EL el primer formulario  de la direccion 

let fname_regex = /^[^\s]+$/; // regex para el nomrbre

const input_fname = document.getElementById("inputFName");

input_fname.addEventListener("input", function (){
	let fname_input = $("#inputFName").val();
	if (fname_regex.test(fname_input)){
		$("#inputFName").removeClass("is-invalid");
		$("#inputFName").classList.add("is-valid");
	}
	else{
		$("#inputFName").removeClass("is-valid");
		$("#inputFName").addClass("is-invalid");
	}

});
const input_lname = document.getElementById("inputLName");
input_lname.addEventListener("input", function (){
	let lname_input = $("#inputLName").val();
	if (fname_regex.test(lname_input)){
		$("#inputLName").removeClass("is-invalid");
		$("#inputLName").addClass("is-valid");
	}
	else{
		$("#inputLName").removeClass("is-valid");
		$("#inputLName").addClass("is-invalid");
	}
});

const input_postalcode = document.getElementById("inputPostalcode");
input_postalcode.addEventListener("input", function (){
	let postalcode_input = $("#inputPostalcode").val();
	let postalcode_regex = /^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z] [0-9][ABCEGHJ-NPRSTV-Z][0-9]$/;
	if (postalcode_regex.test(postalcode_input)){
		$("#inputPostalcode").removeClass("is-invalid");
		$("#inputPostalcode").addClass("is-valid");
	}
	else{
		$("#inputPostalcode").removeClass("is-valid");
		$("#inputPostalcode").addClass("is-invalid");
	}
});

const input_inputPhonenumber = document.getElementById("inputPhonenumber");
input_inputPhonenumber.addEventListener("input", function (){
	let phonenumber_input = $("#inputPhonenumber").val();
	let phonenumber_regex = /^\d{10}$/;
	if (phonenumber_regex.test(phonenumber_input)){
		$("#inputPhonenumber").removeClass("is-invalid");
		$("#inputPhonenumber").addClass("is-valid");
	}
	else{
		$("#inputPhonenumber").removeClass("is-valid");
		$("#inputPhonenumber").addClass("is-invalid");
	}
});

const input_inputEmail = document.getElementById("inputEmail");
input_inputEmail.addEventListener("input", function (){
	let email_input = $("#inputEmail").val();
	let email_regex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (email_regex.test(email_input)){
		$("#inputEmail").removeClass("is-invalid");
		$("#inputEmail").addClass("is-valid");
	}
	else{
		$("#inputEmail").removeClass("is-valid");
		$("#inputEmail").addClass("is-invalid");
	}
});

//aca creo los estados , provincias de cada pais en esta caso USA Y CAD 

function ProvinciasDeLosPaise(NombreoDelPais){
	let PaisSeleccionado = NombreoDelPais;
	switch(PaisSeleccionado){
		case "CAD":	
		//imprimo las provicnias de canada en mi lista 
		$("#inputProvince").empty();
		$("#inputProvince").append("<option>Alberta</option>");
		$("#inputProvince").append("<option>BC</option>");
		$("#inputProvince").append("<option>Manitoba</option>");
		$("#inputProvince").append("<option>New Brunswick</option>");
		$("#inputProvince").append("<option>Newfoundland and Labrador</option>");
		$("#inputProvince").append("<option>Northwest Territories</option>");
		$("#inputProvince").append("<option>Nova Scotia</option>");
		$("#inputProvince").append("<option>Nunavut</option>");
		$("#inputProvince").append("<option>Ontario</option>");
		$("#inputProvince").append("<option>Prince Edward Island</option>");
		$("#inputProvince").append("<option>Quebec</option>");
		$("#inputProvince").append("<option>Saskatchewan</option>");
		$("#inputProvince").append("<option>Yukon</option>");
		break;

		case "USD":
		//imprimo las provicnias de USA en mi lista 
		$("#inputProvince").empty();
		$("#inputProvince").append("<option>Alabama</option>");
		$("#inputProvince").append("<option>Alaska</option>");
		$("#inputProvince").append("<option>Arizona</option>");
		$("#inputProvince").append("<option>Arkansas</option>");
		$("#inputProvince").append("<option>California</option>");
		$("#inputProvince").append("<option>Colorado</option>");
		$("#inputProvince").append("<option>Connecticut</option>");
		$("#inputProvince").append("<option>Delaware</option>");
		$("#inputProvince").append("<option>Florida</option>");
		$("#inputProvince").append("<option>Georgia</option>");
		$("#inputProvince").append("<option>Hawaii</option>");
		$("#inputProvince").append("<option>Idaho</option>");
		$("#inputProvince").append("<option>Illinois</option>");
		$("#inputProvince").append("<option>Indiana</option>");
		$("#inputProvince").append("<option>Iowa</option>");
		$("#inputProvince").append("<option>Kansas</option>");
		$("#inputProvince").append("<option>Kentucky</option>");
		$("#inputProvince").append("<option>Louisiana</option>");
		$("#inputProvince").append("<option>Maine</option>");
		$("#inputProvince").append("<option>Maryland</option>");
		$("#inputProvince").append("<option>Massachusetts</option>");
		$("#inputProvince").append("<option>Michigan</option>");
		$("#inputProvince").append("<option>Minnesota</option>");
		$("#inputProvince").append("<option>Mississippi</option>");
		$("#inputProvince").append("<option>Missouri</option>");
		$("#inputProvince").append("<option>Montana</option>");
		$("#inputProvince").append("<option>Nebraska</option>");
		$("#inputProvince").append("<option>Nevada</option>");
		$("#inputProvince").append("<option>New Hampshire</option>");
		$("#inputProvince").append("<option>New Jersey</option>");
		$("#inputProvince").append("<option>New Mexico</option>");
		$("#inputProvince").append("<option>New York</option>");
		$("#inputProvince").append("<option>North Carolina</option>");
		$("#inputProvince").append("<option>North Dakota</option>");
		$("#inputProvince").append("<option>Ohio</option>");
		$("#inputProvince").append("<option>Oklahoma</option>");
		$("#inputProvince").append("<option>Oregon</option>");
		$("#inputProvince").append("<option>Pennsylvania</option>");
		$("#inputProvince").append("<option>Rhode Island</option>");
		$("#inputProvince").append("<option>South Carolina</option>");
		$("#inputProvince").append("<option>South Dakota</option>");
		$("#inputProvince").append("<option>Tennessee</option>");
		$("#inputProvince").append("<option>Texas</option>");
		$("#inputProvince").append("<option>Utah</option>");
		$("#inputProvince").append("<option>Vermont</option>");
		$("#inputProvince").append("<option>Virginia</option>");
		$("#inputProvince").append("<option>Washington</option>");
		$("#inputProvince").append("<option>West Virginia</option>");
		$("#inputProvince").append("<option>Wisconsin</option>");
		$("#inputProvince").append("<option>Wyoming</option>");
 		break;
	}
	
}

const input_inputCountry = $("#inputCountry");
input_inputCountry.on("input", function () {
	let PaisSeleccionado = input_inputCountry.val(); // ACA CAPTURO EL VALOR DEL INPUT del pais seleccionado
	ProvinciasDeLosPaise(PaisSeleccionado);
});


//aca creo la validacion si esta marcado el checkbox entonces no me muestre el formulario sino entonces me lo muestra para llenarlo

let shipping_check_value = $('#shipping_CheckChecked').prop('checked');


$('#shipping_form').hide(); //inicialmente esta cerrado con esta linea.

//aca creo la funcion para excuchar el cambio de falso en el chequeo del check box
$('#shipping_CheckChecked').on("change", function () {
	shipping_check_value = $(this).prop('checked');
	if (shipping_check_value) {
		$('#shipping_form').hide();
		impuestosDelPais = $('#inputCountry').val();
		impuestosDeLaProvincia = $("#inputProvince").val();
	}
	else {
		$('#shipping_form').show();
		impuestosDelPais = $('#inputCountry_shipping').val();
		impuestosDeLaProvincia = $("#inputProvince").val();
	}
});

//aca inicio la validacion del segundo formulario
const inputFName_shipping_ = document.getElementById("inputFName_shipping");
inputFName_shipping_.addEventListener("input", function (){
	let FName_shipping_input = $("#inputFName_shipping").val();
	if (fname_regex.test(FName_shipping_input)){
		$("#inputFName_shipping").removeClass("is-invalid");
		$("#inputFName_shipping").addClass("is-valid");
	}
	else{
		$("#inputFName_shipping").removeClass("is-valid");
		$("#inputFName_shipping").addClass("is-invalid");
	}
});
const inputLName_shipping_ = document.getElementById("inputLName_shipping");
inputLName_shipping_.addEventListener("input", function (){
	let LName_shipping_input = $("#inputLName_shipping").val();
	if (fname_regex.test(LName_shipping_input)){
		$("#inputLName_shipping").removeClass("is-invalid");
		$("#inputLName_shipping").addClass("is-valid");
	}
	else{
		$("#inputLName_shipping").removeClass("is-valid");
		$("#inputLName_shipping").addClass("is-invalid");
	}
});

const input_inputCountry_shipping = $("#inputCountry_shipping");
input_inputCountry_shipping.on("input", function () {
	let PaisSeleccionado = input_inputCountry_shipping.val();
	if (PaisSeleccionado === "1") {
		
		$("#inputProvince_shipping").empty();
		$("#inputProvince_shipping").append("<option>Alberta</option>");
		$("#inputProvince_shipping").append("<option>BC</option>");
		$("#inputProvince_shipping").append("<option>Manitoba</option>");
		$("#inputProvince_shipping").append("<option>New Brunswick</option>");
		$("#inputProvince_shipping").append("<option>Newfoundland and Labrador</option>");
		$("#inputProvince_shipping").append("<option>Northwest Territories</option>");
		$("#inputProvince_shipping").append("<option>Nova Scotia</option>");
		$("#inputProvince_shipping").append("<option>Nunavut</option>");
		$("#inputProvince_shipping").append("<option>Ontario</option>");
		$("#inputProvince_shipping").append("<option>Prince Edward Island</option>");
		$("#inputProvince_shipping").append("<option>Quebec</option>");
		$("#inputProvince_shipping").append("<option>Saskatchewan</option>");
		$("#inputProvince_shipping").append("<option>Yukon</option>");

	} else if (PaisSeleccionado === "2") {
		
		$("#inputProvince_shipping").empty();
		$("#inputProvince_shipping").append("<option>Alabama</option>");
		$("#inputProvince_shipping").append("<option>Alaska</option>");
		$("#inputProvince_shipping").append("<option>Arizona</option>");
		$("#inputProvince_shipping").append("<option>Arkansas</option>");
		$("#inputProvince_shipping").append("<option>California</option>");
		$("#inputProvince_shipping").append("<option>Colorado</option>");
		$("#inputProvince_shipping").append("<option>Connecticut</option>");
		$("#inputProvince_shipping").append("<option>Delaware</option>");
		$("#inputProvince_shipping").append("<option>Florida</option>");
		$("#inputProvince_shipping").append("<option>Georgia</option>");
		$("#inputProvince_shipping").append("<option>Hawaii</option>");
		$("#inputProvince_shipping").append("<option>Idaho</option>");
		$("#inputProvince_shipping").append("<option>Illinois</option>");
		$("#inputProvince_shipping").append("<option>Indiana</option>");
		$("#inputProvince_shipping").append("<option>Iowa</option>");
		$("#inputProvince_shipping").append("<option>Kansas</option>");
		$("#inputProvince_shipping").append("<option>Kentucky</option>");
		$("#inputProvince_shipping").append("<option>Louisiana</option>");
		$("#inputProvince_shipping").append("<option>Maine</option>");
		$("#inputProvince_shipping").append("<option>Maryland</option>");
		$("#inputProvince_shipping").append("<option>Massachusetts</option>");
		$("#inputProvince_shipping").append("<option>Michigan</option>");
		$("#inputProvince_shipping").append("<option>Minnesota</option>");
		$("#inputProvince_shipping").append("<option>Mississippi</option>");
		$("#inputProvince_shipping").append("<option>Missouri</option>");
		$("#inputProvince_shipping").append("<option>Montana</option>");
		$("#inputProvince_shipping").append("<option>Nebraska</option>");
		$("#inputProvince_shipping").append("<option>Nevada</option>");
		$("#inputProvince_shipping").append("<option>New Hampshire</option>");
		$("#inputProvince_shipping").append("<option>New Jersey</option>");
		$("#inputProvince_shipping").append("<option>New Mexico</option>");
		$("#inputProvince_shipping").append("<option>New York</option>");
		$("#inputProvince_shipping").append("<option>North Carolina</option>");
		$("#inputProvince_shipping").append("<option>North Dakota</option>");
		$("#inputProvince_shipping").append("<option>Ohio</option>");
		$("#inputProvince_shipping").append("<option>Oklahoma</option>");
		$("#inputProvince_shipping").append("<option>Oregon</option>");
		$("#inputProvince_shipping").append("<option>Pennsylvania</option>");
		$("#inputProvince_shipping").append("<option>Rhode Island</option>");
		$("#inputProvince_shipping").append("<option>South Carolina</option>");
		$("#inputProvince_shipping").append("<option>South Dakota</option>");
		$("#inputProvince_shipping").append("<option>Tennessee</option>");
		$("#inputProvince_shipping").append("<option>Texas</option>");
		$("#inputProvince_shipping").append("<option>Utah</option>");
		$("#inputProvince_shipping").append("<option>Vermont</option>");
		$("#inputProvince_shipping").append("<option>Virginia</option>");
		$("#inputProvince_shipping").append("<option>Washington</option>");
		$("#inputProvince_shipping").append("<option>West Virginia</option>");
		$("#inputProvince_shipping").append("<option>Wisconsin</option>");
		$("#inputProvince_shipping").append("<option>Wyoming</option>");

	}
	
});

//aca creo la funcion de el boton de pagar el que dice  PAY NOW en el DOM

function Pagar(){
	if (total_ == 0 ){
		$('.orderdetailsitems').remove();
		$("#order_details_totals_sub").html("<b>$"+ total_.toFixed(2)+"</b>");
		costoAdicionalPorLaCompra = 0;
		$("#order_details_totals_shipping").html("<b>$"+ costoAdicionalPorLaCompra.toFixed(2)+"</b>");
		precioDeInpuestos =0;
		$("#order_details_totals_tax").html("<b>$"+ precioDeInpuestos.toFixed(2)+"</b>");
		costoTotalConTaxes = 0;
		$("#order_details_totals_total").html("<b>$"+ costoTotalConTaxes.toFixed(2)+"</b>");
	}
	else {
		$('.orderdetailsitems').empty();
		//ACA OBTENGO TODOS LOS IDS QUE TENGO EN EL CARRITO Y LOS MAPEO
		let ids = $('.newitem').map(function() {
			let match = $(this).attr('id').match(/\d+/);
			if (match) {
				return match[0];
			}
		}).get();

		let uniqueIds = $.unique(ids);
		
		let items_orderdetails = "";

		/* ACA ESTOY IMPRIMENDO TODOS LOS PRODUCTOS EN MI CARRITO final en el proceso de pago DE COMPRAS USANDO LOS IDS*/
		
		for(let i = 0; i < uniqueIds.length;i++){
			let order_title = $(`#title_${uniqueIds[i]}`)[0].innerHTML;
			let order_quantity = $(`#quantity_${uniqueIds[i]}`)[0].innerHTML;
			let order_price = $(`#price_${uniqueIds[i]}`)[0].innerHTML;
			let order_total = $(`#total_${uniqueIds[i]}`)[0].innerHTML;
			items_orderdetails += `
										<div id="order_title_${uniqueIds[i]}" class="col mb-3 text-center orderdetailsitems">${order_title}</div>
										<div id="order_quantity_${uniqueIds[i]}" class="col mb-3 text-center orderdetailsitems">${order_quantity}</div>
										<div id="order_price_${uniqueIds[i]}" class="col mb-3 text-center orderdetailsitems">${order_price}</div>
										<div id="order_total_${uniqueIds[i]}" class="col mb-3 text-end orderdetailsitems">${order_total}</div>

								`;

		}
		$('#order_details').append(items_orderdetails);
	}
}



/* ACA ESTOY CREADO LA FUNCION PARA EL CALCULO DE LOS IMPUESTOS*/ 
function CalculaImpuestos() {
	impuestosDelPais = $('#inputCountry_shipping').val();
	impuestosDeLaProvincia = $("#inputProvince_shipping").val();
  
	switch(impuestosDelPais) {
	  case "1": // taxes GST HST
		switch(impuestosDeLaProvincia) {
		  case "New Brunswick":
		  case "New Foundland and Labrador":
		  case "Nova Scotia":
		  case "Princes Edward Island":
			impuestoFederal = 0.15;
			break;
		  case "Ontario":
			impuestoFederal = 0.13;
			break;
		  default:
			impuestoFederal = 0.05;
		}
  
		// taxes PST
		switch(impuestosDeLaProvincia) {
		  case "BC":
		  case "Manitoba":
			province_taxes_PST = 0.07;
			break;
		  case "Quebec":
			province_taxes_PST = 0.09975;
			break;
		  case "Saskatchewan":
			province_taxes_PST = 0.06;
			break;
		  default:
			province_taxes_PST = 0.0;
		}
		break;
  
	  default: // en Estados Unidos no le sumo impuestos
		impuestoFederal= 0.0;
		province_taxes_PST = 0.0;
	}
  
	calcularTotal();
  }
  

$("#inputCountry_shipping").on("change", function(){
	CalculaImpuestos();
});
$("#inputProvince_shipping").on("change", function(){
	CalculaImpuestos();
});







