(async function loadCountries(url) {
    async function getData(url) {
        const response = await fetch(url);
        const data = await response.json();


        return data;
    }

    const dataCountries = await getData('https://restcountries.eu/rest/v2/all');
    console.log(dataCountries);




    function countryTemplate(country) {
        return (
            `<div class="cardItem">
            <div class="primaryPlaylistItem-image">
            <img src="${country.flag}" width="250" height="250">
            </div>
            <h2>Name : ${country.name}</h2>
            <p> Capital : ${country.capital}</p>
            <p> Continent : ${country.region}</p>
            <p> Population : ${country.population}</p>
            <p> Languages : ${country.languages[0].name} </p>
            
            </div>
        
        `)
    }

    let $countries = document.querySelector('#countries');

    dataCountries.forEach((country) => {


        const htmlString = countryTemplate(country);

        const html = document.implementation.createHTMLDocument();

        html.body.innerHTML = htmlString;

        $countries.append(html.body.children[0]);
    })

})()