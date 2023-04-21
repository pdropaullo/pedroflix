let search = document.querySelector('.search')
let pesquisa = document.querySelector('.pesquisa')
let cards = document.querySelector('.cards')
let card = document.querySelector('.card')
let btn = document.querySelector('.btn')
let vermais = document.getElementById("vermais")
let reset = document.getElementById("reset")
let currentPage = 1

search.addEventListener('submit', (event) => {
    event.preventDefault();
    getApi(pesquisa.value);
    currentPage = 1;
    vermais.classList.add("show");
})

vermais.addEventListener("click", () => {
    const nextPage = currentPage + 1;
    getApi(pesquisa.value, nextPage);
    currentPage = nextPage;
    cards.scrollIntoView({ behavior: 'smooth', block: 'end' });
})

reset.addEventListener("click", () => {

})

async function getApi(media, page) {
    let response = await fetch(`https://www.omdbapi.com/?s=${media}&apikey=75bdc9fb&page=${page}`)
    let data = await response.json()

    for (var i = 0; i < data[`Search`].length; i++) {
        cards.innerHTML += `<div class="card">
                             <img class="poster" src="${data.Search[i].Poster}">
                             <h3 class="title">${data.Search[i].Title}</h3> 
                             <h3 class="year">${data.Search[i].Year}</h3>
                             </div>`
    }

    if (page === 1) {
        vermais.classList.add("show");
    }

    if (data[`Search`].length < 10) {
        vermais.style.display = "none";
    }

    window.scrollTo({
        top: document.documentElement.scrollHeight - window.innerHeight,
        behavior: 'smooth'
    });

}