import express from "express"
import cors from "cors"
import Database from 'better-sqlite3'
const db = Database('./db/data.db', { verbose: console.log })


const app = express()
app.use(cors())
app.use(express.json())
const port = 4500

app.get('/', (req, res) => {
  res.send(`
  <ul>
  <li><a href="/museums">Museums</a></li>
  <li><a href="/works">Works</a></li>
  </ul>
  `)
})

//GET MUSEUMS WITH WORKS
const getMuseums = db.prepare(`
SELECT * FROM museums;
`)
const getWorksforMuseums = db.prepare(`
SELECT * FROM works WHERE museumId = ?;
`)
app.get('/museums', (req, res) => {
  const museums = getMuseums.all()
  for (let museum of museums){
    const works = getWorksforMuseums.all(museum.id)
    museum.works = works
  }
  res.send(museums)
})
//GET WORKS
const getWorks = db.prepare(`
SELECT * FROM works;
`)

app.get('/works', (req, res) => {
    const works = getWorks.all()
    res.send(works)
})
//GET MUSEUMS BY ID
const getMuseumsById = db.prepare(`
SELECT * FROM museums WHERE id = ?;
`)

app.get ('/museums/:id', (req, res) => {
  const id = Number(req.params.id)
  const museum = getMuseumsById.get(id)
    if (museum) {
        res.send(museum)
    }
    else {
        res.status(404).send({ error: `Museum doesn't exist!` })
    }
}
)
//GET WORKS BY ID
const getWorksById = db.prepare(`
SELECT * FROM works WHERE id = ?;
`)

app.get ('/works/:id', (req, res) => {
  const id = Number(req.params.id)
  const work = getWorksById.get(id)
    if (work) {
        res.send(work)
    }
    else {
        res.status(404).send({ error: `Work doesn't exist!` })
    }
}
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

