const locationInput = document.getElementById("locationInput");
const resultDiv = document.getElementById("result");
const btnSearch = document.getElementById("btnSearch");
const btnReset = document.getElementById("btnReset");

function resetForm() {
    locationInput.value = "";
    resultDiv.innerHTML = '';
}

function searchRecommendation() {
    
    resultDiv.innerHTML = '';

    var location = locationInput.value.trim().toLowerCase();
    if (location == "") {
        alert(locationInput.placeholder);
        locationInput.focus();
        return;
    }

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            

            Object.entries(data).forEach(([l1Key, l1Val]) => {
                if (l1Key === "countries") {
                    l1Val.forEach(country => {
                        //let isBingoCountry = country.name.toLowerCase() == location;

                        country.cities.forEach(city => {
                            if (city.name.toLowerCase().includes(location)) {
                                resultDiv.innerHTML += `<div>
                                    <img src="${city.imageUrl}" width="200" alt="${city.name}">
                                    <p><b>${city.name}</b><br>${city.description}
                                </div><hr><br>`;
                            }
                        });
                    })
                }
                else {
                    let isTypeMatch = l1Key.toLowerCase() == location;
                    
                    l1Val.forEach(city => {
                        if (isTypeMatch || city.name.toLowerCase().includes(location)) {
                            resultDiv.innerHTML += `<div>
                                <img src="${city.imageUrl}" width="200" alt="${city.name}">
                                <p><b>${city.name}</b><br>${city.description}
                            </div><hr><br>`;
                        }
                    });
                }
            });

            if (resultDiv.innerHTML == "") {
                alert("Not Found\nPls try popular keywords like temples and beaches");
                locationInput.focus();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}


btnSearch.addEventListener("click", searchRecommendation);
btnReset.addEventListener("click", resetForm);