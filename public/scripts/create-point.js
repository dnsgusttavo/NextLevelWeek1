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
    citySelect.disabled = true;
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    const UFID = event.target.value;
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UFID}/municipios`).then( res => res.json())
    .then( cities => {
        
        for( const city of cities)
            citySelect.innerHTML += `<option  value="${city.nome}">${city.nome}</option>`
        citySelect.disabled = false;
        })
}

const itemsToCollect = document.querySelectorAll(".items-grid li");
const collectedItems = document.querySelector("input[name=items");

for (const item of itemsToCollect)
    item.addEventListener("click", handleSelectedItem);

let selectedItems = [];
function handleSelectedItem(event){
    const itemLi = event.target;
    const itemID = itemLi.dataset.id;
    itemLi.classList.toggle("selected");

    let selected = itemLi.classList.contains('selected')
    let positionInArray = selectedItems.indexOf(itemID);
    if((positionInArray == -1) && (selected))
        selectedItems.push(itemID);
    else
        selectedItems.splice(selectedItems.indexOf(itemID),1);
    
    selectedItems.sort();
    collectedItems.value = selectedItems;
    
}