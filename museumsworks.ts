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

// POST MUSEUM
const postMuseum = db.prepare(`
INSERT INTO museums (name, type, location) VALUES (?, ?, ?);
`)
app.post('/museums', (req, res) => {
  const name = req.body.name
  const type = req.body.type
  const location = req.body.location
    let errors: string[] = []
    
    if (typeof req.body.name !== 'string') {
        errors.push('Add a proper NAME!')
      }
   
    if(typeof req.body.type  !=='string') {
        errors.push('Add a proper TYPE OF MUSEUM')
    }
    if (typeof req.body.location !== 'string') {
      errors.push('Add a proper LOCATION!')
    }
    if( errors.length === 0)  {
      const museum = postMuseum.run(name, type, location)
      const newmuseum = getMuseumsById.get(museum.lastInsertRowid)
      res.send(newmuseum)
    }
    else {
        res.status(400).send({ errors: errors })
      }
})
//POST WORK

const postWork = db.prepare(`
INSERT INTO works (work, author, image, museumId) VALUES (?, ?, ?,?);
`)
app.post('/works', (req, res) => {
  const work = req.body.work
  const author = req.body.author
  const image = req.body.image
  const museumId = req.body.museumId
    let errors: string[] = []
    
    if (typeof req.body.work !== 'string') {
        errors.push('Add a proper WORK!')
      }
   
    if(typeof req.body.author  !=='string') {
        errors.push('Add a proper TYPE OF AUTHOR')
    }
    if (typeof req.body.image !== 'string') {
      errors.push('Add a proper IMAGE!')
    }
    if (typeof req.body.museumId !== 'number') {
      errors.push('Add a proper MUSEUMID NUMBER!')
    }
    if( errors.length === 0)  {
      const workInfo = postWork.run(work, author, image, museumId)
      const newWork = getWorksById.get(workInfo.lastInsertRowid)
      res.send(newWork)
    }
    else {
        res.status(400).send({ errors: errors })
      }
})
const deleteWorks = db.prepare(`
DELETE FROM works WHERE id = ?;
`)
app.delete('/works/:id', (req, res) => {
  const id = Number(req.params.id)
  const work = deleteWorks.run(id)
    if (work) {
        res.send({ message: 'Work deleted successfully.' })
    }
    else {
        res.status(404).send({ error: 'Work not found.' })
      }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

