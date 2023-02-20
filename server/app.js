const express = require('express')
const userResponse = require('./usersResponse')
const app = express()

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

const port = 8080

const allUsers = JSON.parse(userResponse)

const waitFor = () => new Promise((res) => {
  setTimeout(() => {
    res()
  }, 1000)
})

app.get('/api/users', async (req, res) => {
  const { query } = req
  
  const searchText = String(query.search_text || '')
  const page = Number(query.page)
  const perPage = Number(query.per_page)

  if (String(page) === 'NaN' || String('perPage') === 'NaN') {
    return res.send({ results: [], meta: { totalPages: 0, totalResults: 0 } })
  }

  const totalPages = Math.ceil(allUsers.length / perPage)
  const startIdx = (page - 1) * perPage

  const results = allUsers.slice(startIdx, startIdx + perPage)

  const meta = { totalPages, page, totalResults: allUsers.length }

  if (searchText) {
    const filteredResults = results.filter(user => 
      user.profile.name.toUpperCase().includes(searchText.toUpperCase())
    )

    await waitFor()

    return res.send({ results: filteredResults, meta })
  }
  
  await waitFor()

  return res.send({ results, meta })
})

app.get('/api/users/:id', async (req, res) => {
  const { originalUrl } = req

  const id = originalUrl.split('/')[3]

  const user = allUsers.find(user => user.id === id)

  await waitFor()

  return res.send(user)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})