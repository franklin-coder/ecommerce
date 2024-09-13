const billingAddressInput = document.getElementById('inputAddress'); // capturo el input de la direccion
const billingAddressTwoInput = document.getElementById('inputAddress2');//capturo el input de la direccion alternative

billingAddressInput.addEventListener('input', async () => { // creo el evento del input para que me lea cada caracter
  const address = billingAddressInput.value;// para que me lea cada caracter aca obtengo la info el vlor o el value
  const url = `https://geocoder.ca/?autocomplete=1&locate=${address}&geoit=xml&auth=test&json=1`; // aqui paso como variable la informaciond el usuario
  


    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    for(i=0 ; i < data.length; i++){

      let street = data[i].streets.street;
      console.log(data);
      console.log(street);
    }
 
    if (data.standard) {
      const possibleAddresses = data.standard.map(addr => `${addr.city}, ${addr.prov}, ${addr.postal}`);

   
      console.log("possibleAddresses");
      billingAddressInput.innerHTML = possibleAddresses.street;
    }
 


});



/*aca inicia el intento para la direccion alternativa */
billingAddressTwoInput.addEventListener('input', async () => {
    const address = billingAddressInput.value;
    const url = `https://geocoder.ca/?autocomplete=1&locate=${address}&geoit=xml&auth=test&json=1`;


    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
        console.log("prueba de que esta entrando en la direccion 2");


        if (data.standard) {
            let possibleAddresses = data.standard.map(addr => `${addr.city}, ${addr.prov}, ${addr.postal}`);
            let possibleStreet = data.standard.map(addr => addr.street);

            // display the possible addresses as a dropdown muestran 
            // replace this with your own implementation
            console.log(possibleAddresses);
            console.log(possibleStreet);
          billingAddressInput.textContent = data.standard[0].street;
        
        }
    } catch (error) {
        console.error(error);
    }

    console.log("prueba de que esta capturando el error en la direccion 2");
});