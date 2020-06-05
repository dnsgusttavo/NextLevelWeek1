populateUFs();
document.querySelector("select[name=uf]").addEventListener("change", getCities);

function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`).then( res => res.json())
    .then( states => {
        for( const state of states)
            ufSelect.innerHTML += `<option  value="${state.id}">${state.nome}</option>`
    })
     
}

function getCities(event){
    
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;
    citySelect.disabled = false;

    const UFID = event.target.value;
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UFID}/municipios`).then( res => res.json())
    .then( cities => {
        for( const city of cities)
            citySelect.innerHTML += `<option  value="${city.id}">${city.nome}</option>`
    })
}

