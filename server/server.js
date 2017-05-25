import path from 'path';
import bodyParser from 'body-parser'
import express from 'express'
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const router = express.Router()
const staticFiles = express.static(path.join(__dirname, '../../client/build'))

app.use(staticFiles)

router.get('/cities', (req, res) => {
  const cities = [
    { name: 'Bhilai', population: 100000 },
    { name: 'Pune', population: 240000 },
    { name: 'Mumbai', population: 5000000 }
  ]
  res.json(cities)
})

app.use(router)

app.use('/*', staticFiles)

app.set('port', process.env.PORT || 3001)
app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`)
})