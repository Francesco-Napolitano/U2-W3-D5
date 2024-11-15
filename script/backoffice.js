const yearSpan = document.getElementById('current-year')
yearSpan.innerText = new Date().getFullYear()

const address = new URLSearchParams(window.location.search)
const urlCards = address.get('cardsId')
console.log('urlCards:', urlCards)

if (urlCards) {
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
        throw new Error('error')
      }
    })
    .then((data) => {
      console.log(data)
      document.getElementById('name').value = data.name
      document.getElementById('description').value = data.description
      document.getElementById('brand').value = data.brand
      document.getElementById('imageUrl').value = data.imageUrl
      document.getElementById('price').value = data.price
    })
    .catch((error) => {
      console.error('Errore:', error)
    })
    .catch((error) => console.error('Errore:', error))
} else {
}

class Concert {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _imageUrl
    this.price = _price
  }
}

const form = document.getElementById('concert-form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const brandInput = document.getElementById('brand')
  const imageInput = document.getElementById('imageUrl')
  const priceInput = document.getElementById('price')
  const createdConcert = new Concert(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    imageInput.value,
    priceInput.value
  )

  console.log(createdConcert)

  let method
  if (urlCards) {
    method = 'PUT' // modifica
  } else {
    method = 'POST' // creazione
  }

  let URLToUse
  if (urlCards) {
    URLToUse =
      'https://striveschool-api.herokuapp.com/api/product' + '/' + urlCards // specifico
  } else {
    URLToUse = 'https://striveschool-api.herokuapp.com/api/product' // generico
  }

  fetch(URLToUse, {
    method: method,
    body: JSON.stringify(createdConcert),
    headers: {
      'Content-type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWNhZDhhZDEyOTAwMTU4NzZjMjYiLCJpYXQiOjE3MzE2NjUwNjksImV4cCI6MTczMjg3NDY2OX0.0YcOr805GJRhxyyh0o19dcqvhy6eJMZv36VTLMNXpdI',
    },
  })
    .then((res) => {
      if (res.ok) {
        alert('Smartphone Aggiunto')

        return res.json()
      } else {
        throw new Error('Qualcosa è andato storto')
      }
    })
    .then((data) => console.log('Risposta:', data))
    .catch((err) => console.error('OH NO! ERRORE', err))
})

const resetButton = () => {
  const buttonReset = document.getElementById('reset')
  buttonReset.addEventListener('click', () => {
    form.reset()
  })
}
