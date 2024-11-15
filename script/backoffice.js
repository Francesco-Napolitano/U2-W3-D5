class Concert {
  constructor(_name, _description, _price, _time) {
    this.name = _name
    this.description = _description
    this.price = _price
    this.time = _time
  }
}
const form = document.getElementById('concert-form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const priceInput = document.getElementById('price')
  const timeInput = document.getElementById('time')
  const createdConcert = new Concert(
    nameInput.value,
    descriptionInput.value,
    priceInput.value,
    timeInput.value
  )
  console.log(createdConcert)

  fetch('https://striveschool-api.herokuapp.com/api/product', {
    method: 'POST',
    body: JSON.stringify(createdConcert),
    headers: {
      'Content-type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MWNhZDhhZDEyOTAwMTU4NzZjMjYiLCJpYXQiOjE3MzE2NjUwNjksImV4cCI6MTczMjg3NDY2OX0.0YcOr805GJRhxyyh0o19dcqvhy6eJMZv36VTLMNXpdI',
    },
  })
    .then((res) => {
      if (res.ok) {
        alert('Concerto creato correttamente!')
        nameInput.value = ''
        descriptionInput.value = ''
        priceInput.value = ''
        timeInput.value = ''
      } else {
        throw new Error('Qualcosa è andato storto')
      }
    })

    .catch((err) => console.log('OH NO! ERRORE', err))
})
