const table = document.getElementById("tableBody");
let input = document.getElementById("drink");
let filter = input.value;
let cocktails = [];

document.addEventListener("DOMContentLoaded", () => { 
    const searchBtn = document.querySelector("#search");
})
function loadTable(){ //fetch operation
    let completeUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter}`;

    fetch(completeUrl) 
    .then(response => response.json()) 
    .then(data => {
        cocktails = []; 

        for(let i = 0; i < data.drinks.length; i++){
            let drink = { 
                drinkName: data.drinks[i].strDrink,
                drinkImg: data.drinks[i].strDrinkThumb,
                alcoholic: data.drinks[i].strAlcoholic,
                ingredients: []
            };

            let allIng = Object.values(data.drinks[i]).slice(17, 32);
            allIng.forEach((ing) => {
                if(ing != null && ing != "") drink.ingredients.push(" " + ing);
            });
            cocktails.push(drink);
        }

       deleteRows();
       createRows();
    })
    return cocktails;
}

function deleteRows(){ 
    let rowCount = table.rows.length;
    for(let i = rowCount; i > 0; i--){
        table.deleteRow(0);
    }
}
function createRows(){ 
    for(let i = 0; i < cocktails.length; i++){ 
        let newRow = table.insertRow(i); 

            let cell = newRow.insertCell(0); 
            cell.innerText = cocktails[i].drinkName;

            cell = newRow.insertCell(1); 
            cell.appendChild(image(cocktails[i].drinkImg));

            cell = newRow.insertCell(2); 
            cell.innerText = cocktails[i].alcoholic;

            cell = newRow.insertCell(3); 
            cell.innerText = cocktails[i].ingredients;            
    }
}
function image(pic){ 
    let img = document.createElement('img');
    img.src = pic; 
    img.style.height = "100px";
    return img;
}
function tableSubmit(event){ 
    event.preventDefault(); 
    loadTable();
}
let drinkForm = document.getElementById("drink-form");
drinkForm.addEventListener("submit", tableSubmit); 
    input.addEventListener("change", () => { 
        filter = input.value;
        return filter;
    });