(async function loadCountries(url) {
    async function getData(url) {
        const response = await fetch(url);

        const data = await response.json();


        return data;
    }

    const baseCountries = 'https://restcountries.eu/rest/v2/';





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
            cleanHTML();

            console.log('testing');

            const data = new FormData(document.getElementById('form'));
            console.log(data.get('name'));

            const searchCountry = await getData(`${baseCountries}name/${data.get('name')}`);
            console.log(searchCountry);




            searchCountry.forEach((country) => {
                let $container = document.querySelector('#countries');
                const htmlString = countryTemplate(country);

                const html = document.implementation.createHTMLDocument();

                html.body.innerHTML = htmlString;

                $container.append(html.body.children[0]);

            })

        })
        // let $region = document.querySelector('#region a')
        // $region = addEventListener('click', (e) => {
        //     e.preventDefault();
        //     console.log($region.value);
        // })

    const $region = document.querySelector('#region');
    $region.addEventListener('change', async(e) => {
        let regionData;
        cleanHTML();
        let region = e.target.value;
        if (region === 'all') {
            regionData = await getData(`${baseCountries}${region}`)
        } else {

            regionData = await getData(`${baseCountries}region/${region}`)
        }
        renderCountries(regionData, $countries);
    })

    function cleanHTML() {
        while ($countries.firstChild) {
            $countries.removeChild($countries.firstChild)
        }

    }
    async function cacheExist(category) {
        const listName = category
        const cacheList = window.localStorage.getItem(listName)
        if (cacheList) {
            return JSON.parse(cacheList);
        }
        const data = await getData(`${baseCountries}all`)
        window.localStorage.setItem(listName, JSON.stringify(data))
        return data;
    }


    let $countries = document.querySelector('#countries');
    // let countries = await getData(`${baseCountries}all`)
    let countries = await cacheExist('countries')
    window.localStorage.setItem('countries', JSON.stringify(countries))
    console.log(countries);

    function renderCountries(list, $container) {


        list.forEach((country) => {


            const htmlString = countryTemplate(country);

            const html = document.implementation.createHTMLDocument();

            html.body.innerHTML = htmlString;

            $container.append(html.body.children[0]);


        })
    }
    renderCountries(countries, $countries)

})()