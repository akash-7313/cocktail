function loadDetails() {
    const input = document.getElementById('input');
    const inputText = input.value;
    if(inputText == ''){
        alert('plz write something to search');
    }
    else {
        input.value = '';
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayDetails(data))
    }
}
function displayDetails(data) {
    // console.log(data);
    const cocktails = data.drinks;
    console.log(cocktails);
    if(cocktails == null) {
        alert('no matching result found, plz try again');
    }
    else {
        document.getElementById('details').innerText = '';
        const parentCall = document.getElementById('cocktail');
        parentCall.textContent = '';

        for (const cocktail of cocktails) {
        // console.log(cocktail);

            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <img onclick="moreDetail(${cocktail.idDrink})" src="${cocktail.strDrinkThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${cocktail.strDrink}</h5>
                        <h6 class="card-title">${cocktail.strCategory}</h6>
                    </div>
                </div>
            `
            parentCall.appendChild(div);
        }
    }
}


function moreDetail(id) {
    // console.log(id);
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showMoreDetail(data))
}
function showMoreDetail(data) {
    document.getElementById('cocktail').innerText = '';
    // console.log(data);
    const details = data.drinks;
    // console.log(details);

    const parentCall = document.getElementById('details');
    parentCall.textContent = '';

    for (const detail of details) {
        console.log(detail);
        const div = document.createElement('div');
        div.classList.add('col-9');
        div.innerHTML = `
            <div class="card h-100">
                <div class="row g-0 w-75">   
                    <div class="col-md-6">
                        <img src="${detail.strDrinkThumb}" class="card-img-top" alt="...">
                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <h4 class="card-title">Drink: ${detail.strDrink}</h4>
                            <h5 class="card-title">Category: ${detail.strCategory}</h5>
                            <h6 class="card-text">${detail.strAlcoholic}</h6>
                            <h6 class="card-text">Glass: ${detail.strGlass}</h6>
                            <p class="card-text">${detail.strInstructions}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
        parentCall.appendChild(div);
    }
}


































