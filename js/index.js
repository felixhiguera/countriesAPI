(async function loadCountries(url) {
    async function getData(url) {
        const response = await fetch(url);
        debugger
        const data = await response.json();


        return data;
    }

    const baseCountries = await getData('https://restcountries.eu/rest/v2/');





    function countryTemplate(country) {
        return (
            `<div class="cardItem">
            <div class="primaryPlaylistItem-image">
            <img src="${country.flag}" width="250" height="250">
            </div>
            <h2>${country.name}</h2>
            <p> Capital : ${country.capital}</p>
            <p> Continent : ${country.region}</p>
            <p> Population : ${country.population}</p>
            <p> Languages : ${country.languages[0].name} </p>
            
            </div>
        
        `)
    }

    let $form = document.querySelector('#form');
    $form = addEventListener('submit', async(e) => {
        e.preventDefault();
        console.log('testing');

        const data = new FormData(document.getElementById('form'));
        console.log(data.get('name'));

        const searchCountry = await getData(`${baseCountries}name/${data.get('name')}`);
        console.log(searchCountry.name);

    })

    let $countries = document.querySelector('#countries');

    baseCountries.forEach((country) => {


        const htmlString = countryTemplate(country);

        const html = document.implementation.createHTMLDocument();

        html.body.innerHTML = htmlString;

        $countries.append(html.body.children[0]);
    })



})()