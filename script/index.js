const yearSpan = document.getElementById('current-year')
yearSpan.innerText = new Date().getFullYear()

fetch('https://striveschool-api.herokuapp.com/api/product', {
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
    const row = document.getElementById('concerts-row')
    const spinner = document.querySelector('.spinner-border')
    data.forEach((cards) => {
      const col = document.createElement('div')
      col.classList.add('col', 'col-12', 'col-md-6', 'col-lg-4')

      col.innerHTML = `
      <div class="spinner-border text-info" role="status">
      <span class="visually-hidden">Loading...</span>
</div>
      `
      col.innerHTML = `
            <div class="card">
            <img src="${cards.imageUrl}" class="w-100 card-img-top" alt="${cards.name}" style="height: 50vh; object-fit: contain">
            <div class="card-body">
            <h5 class="card-title">${cards.name}</h5>
            <p class="card-text">${cards.description}</p>
            <p class="card-text">${cards.brand}</p>
                    <p class="card-text">${cards.price}€ 
                    <a href="./details.html?cardsId=${cards._id}" class="btn btn-primary ms-4">Vai ai dettagli!</a>
                    </div>
                    </div>
                    `

      row.appendChild(col)
    })
    spinner.classList.add('d-none')
  })
  .catch((err) => console.log(err))
