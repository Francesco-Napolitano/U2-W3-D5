const yearSpan = document.getElementById('current-year')
yearSpan.innerText = new Date().getFullYear()

const address = new URLSearchParams(window.location.search)
const urlCards = address.get('cardsId')
console.log('urlCards:', urlCards)

fetch('https://striveschool-api.herokuapp.com/api/product' + '/' + urlCards, {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWNhZDhhZDEyOTAwMTU4NzZjMjYiLCJpYXQiOjE3MzE2NjUwNjksImV4cCI6MTczMjg3NDY2OX0.0YcOr805GJRhxyyh0o19dcqvhy6eJMZv36VTLMNXpdI',
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error("Errore nel recupero dei dettagli dell'evento")
    }
  })
  .then((singleCard) => {
    console.log('Dettagli della card:', singleCard)
    const col = document.getElementById('card-container')
    col.innerHTML = `
        <div class="card">
            <img src="${singleCard.imageUrl}" class="card-img-top" alt="${singleCard.name}">
            <div class="card-body">
                <h5 class="card-title">${singleCard.name}</h5>
                <p class="card-text">${singleCard.description}</p>
                <p class="card-text">Brand: ${singleCard.brand}</p>
                <p class="card-text">Prezzo: ${singleCard.price}€</p>
                <a class="btn btn-warning" href="./backoffice.html?cardsId=${singleCard._id}">MODIFICA</a>
                <button class="btn btn-danger" onclick="deleteCard()">ELIMINA</button>
            </div>
        </div>
    `
  })
  .catch((error) => {
    console.error('Errore:', error)
  })

// Funzione per eliminare una card
function deleteCard() {
  fetch('https://striveschool-api.herokuapp.com/api/product/' + urlCards, {
    method: 'DELETE',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWNhZDhhZDEyOTAwMTU4NzZjMjYiLCJpYXQiOjE3MzE2NjUwNjksImV4cCI6MTczMjg3NDY2OX0.0YcOr805GJRhxyyh0o19dcqvhy6eJMZv36VTLMNXpdI',
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log('Card eliminata con successo')
        window.location.href = './index.html' // Reindirizza alla home dopo l'eliminazione
      } else {
        throw new Error("Errore durante l'eliminazione della card")
      }
    })
    .catch((error) => console.error('Errore eliminazione:', error))
}
