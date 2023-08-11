const urlDolar = "https://api.bluelytics.com.ar/v2/latest"
const $coinName = document.getElementsByClassName("coin-name");
const $moneda = document.getElementById("moneda-1").children;
const $listaMonedas = document.getElementById("lista-monedas");
const $botonDesplegable = document.getElementById("boton-monedas");
const $monedaComprar = document.getElementById("moneda-comprar");
const $calcular = document.getElementById("calcular")
const $lista = document.getElementById("grupo-monedas")

console.log($moneda)
let precioDolar = fetch(urlDolar).then(
    response => response.json())
    .then(data => precioDolar = data)
    .then(data => console.log(data))

setTimeout(function(){
    contador = 1;
    ultimaActualizacon();
    delete precioDolar.last_update
    for (let moneda in precioDolar){
        console.log(moneda)
        console.log(precioDolar[moneda])
        if(precioDolar.hasOwnProperty(moneda)){
            let valorMoneda = document.getElementById(`moneda-${contador}`)
            valorMoneda.children[1].innerText += ` ${precioDolar[moneda].value_avg}`
            valorMoneda.children[2].innerText += ` ${precioDolar[moneda].value_sell}`
            valorMoneda.children[3].innerText += ` ${precioDolar[moneda].value_buy}`
            contador = contador +1
        }
    }
}, 2000)

// $botonDesplegable.addEventListener("click", function(){
//     $listaMonedas.style.display = "block";
// })

// $listaMonedas.addEventListener("click", function(e){
//     $botonDesplegable.innerText = e.target.innerText
//     $listaMonedas.style.display = "none"
// })

$monedaComprar.addEventListener("input", function(){
    const $mensajeAlerta = document.getElementById("mensaje-alerta");
    let valorInput = $monedaComprar.value
    if(valorInput.includes('-')){
        $mensajeAlerta.style.display = "block"
    }else{
        $mensajeAlerta.style.display = "none"
    }
})

ultimaActualizacon = ()=>{
    const $ultimaActualizacion = document.getElementById("ultima-acualizacion")
    let fechaActualiza = new Date(precioDolar.last_update)
    let fechaFormateada = fechaActualiza.toLocaleDateString('es-ES');
    let minutos = minutosActualizacion(fechaActualiza.getMinutes())
    console.log(minutos)
    $ultimaActualizacion.innerText += ` ${fechaFormateada} a las ${fechaActualiza.getHours()}:${minutos}`
}

$calcular.addEventListener("click", function(){
    let valorAConvertir = $monedaComprar.value
    if(valorAConvertir != ""){
        if($lista.children.length > 0){
            let listaIntera = $lista.getElementsByTagName("li");
            while(listaIntera.length > 0){
            $lista.removeChild(listaIntera[0])
            console.log(listaIntera);
            }
            monedasLista()
        }else{
        monedasLista()
        }   
    }
})

monedasLista = () =>{
    dolarOficialARecibir();
    dolarBlueARecibir();
    euroOficialARecibir();
    euroBlueARecibir();
    alturaTodaLaLista = precioDolarOfical.clientHeight
}

dolarOficialARecibir = () =>{
    let dolaresOficialARecibir = ($monedaComprar.value / precioDolar.oficial.value_sell).toFixed(2)
    let precioDolarOfical = document.createElement("li");
    precioDolarOfical.textContent = `Si vendés $${$monedaComprar.value} a precio de Dolar Oficial vas a recibir U$D ${dolaresOficialARecibir}`
    $lista.appendChild(precioDolarOfical)
}

dolarBlueARecibir = () =>{
    let dolaresBlueARecibir = ($monedaComprar.value / precioDolar.blue.value_sell).toFixed(2);
    let precioDolarBlue = document.createElement("li");
    precioDolarBlue.textContent = `Si vendés $${$monedaComprar.value} a precio de Dolar Blue vas a recibir U$D ${dolaresBlueARecibir}`
    $lista.appendChild(precioDolarBlue)
}

euroOficialARecibir = () =>{
    let euroOficialARecibir = ($monedaComprar.value / precioDolar.oficial_euro.value_sell).toFixed(2)
    let precioEuroOficial = document.createElement("li");
    precioEuroOficial.textContent = `Si vendés $${$monedaComprar.value} a precio de Euro Oficial vas a recibir EUR ${euroOficialARecibir}`
    $lista.appendChild(precioEuroOficial)
}

euroBlueARecibir = () =>{
    let euroBlueARecibir = ($monedaComprar.value / precioDolar.blue_euro.value_sell).toFixed(2)
    let precioEuroBlue = document.createElement("li");
    precioEuroBlue.textContent = `Si vendés $${$monedaComprar.value} a precio de Euro Blue vas a recibir EUR ${euroBlueARecibir}`
    $lista.appendChild(precioEuroBlue)
}

minutosActualizacion = (minutos) =>{
    if(minutos < 10){
        let minutosDosDigitos = minutos.toString().padStart(2, '0');
        return minutosDosDigitos;
    }else{
        return minutos;
    }
}