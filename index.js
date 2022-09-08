const table = document.getElementById("tableBody");
let input = document.getElementById("drink");
let filter = input.value;
let cocktails = [];


document.addEventListener("DOMContentLoaded", () => { //Make sure these work after page loads...
    const searchBtn = document.querySelector("#search");
})


function loadTable(){ //Umbrella function for deleting old table, and generating new table from the filter.
    let completeUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${filter}`;

    fetch(completeUrl) //Fetch info from TheCocktailDB.
    .then(response => response.json()) //Converts response to JSON.
    .then(data => {
        cocktails = []; //Delete old Array.

        for(let i = 0; i < data.drinks.length; i++){
            let drink = { //Object of the cocktail.
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
    return cocktails; //Update cocktails in the global scope.
}


function deleteRows(){ //Function to delete rows before new table is generated.
    let rowCount = table.rows.length;
    for(let i = rowCount; i > 0; i--){
        table.deleteRow(0);
    }
}


function createRows(){ //Function to add rows (with cells) for newly generated table
    for(let i = 0; i < cocktails.length; i++){ //For the number of cocktails (vertical).
        let newRow = table.insertRow(i); //Create the (horizontal) row for the cocktail.

            let cell = newRow.insertCell(0); //Cell [0, i]
            cell.innerText = cocktails[i].drinkName;

            cell = newRow.insertCell(1); //Cell [1, i]
            cell.appendChild(image(cocktails[i].drinkImg));

            cell = newRow.insertCell(2); //Cell [2, i]
            cell.innerText = cocktails[i].alcoholic;

            cell = newRow.insertCell(3); //Cell [3, i]
            cell.innerText = cocktails[i].ingredients;            
    }
}


function image(pic){ //Function to create Image element from URL.
    let img = document.createElement('img');
    img.src = pic; //Set img source to the arbitrary "pic" value(cocktails[i].drinkImg).
    img.style.height = "100px";
    return img;
}


function tableSubmit(event){ 
    event.preventDefault(); //Prevent reloading of page.
    loadTable();
}


let drinkForm = document.getElementById("drink-form");
drinkForm.addEventListener("submit", tableSubmit); //Invoke the tableSubmit function with the search button.


    input.addEventListener("change", () => { //Event Listener to set filter = input.value.
        filter = input.value;
        return filter;
    });