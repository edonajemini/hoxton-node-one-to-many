import Database from "better-sqlite3";
const db = Database("./db/data.db", {verbose:console.log})

function createmuseums () {
    const museums = [
        {
            id:1,
            name: "The Getty",
            type:"Art museum",
            location:"Los Angeles"
        },
        {
            id:2,
            name: "Smithsonian national air and space museum",
            type:"Aviation museum",
            location:"Washington, D.C."
        },
        {
            id:3,
            name: "Louver museum",
            type:"Art museum and historic",
            location:"Paris"
        },
        {
            id:4,
            name: "The British Museum",
            type:"Human history, art and culture",
            location:"London, UK"
        },
        {
            id:5,
            name: "Rijksmuseum",
            type:"National museum Art museum History",
            location:"Amsterdam, Netherlands"
        },
    ]
    const createmuseumstable = db.prepare(`
    CREATE TABLE IF NOT EXISTS museums (
        id INTEGER NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        location TEXT NOT NULL,
        PRIMARY KEY (id)
      );
    `)
    createmuseumstable.run()
    
    const deleteMuseums = db.prepare(`
    DELETE from museums;
    `)
    deleteMuseums.run()
    
    const creaateMuseums = db.prepare(`
    INSERT INTO museums (name, type, location) VALUES (?,?,?);
    `)
    for (let museum of museums) {
        creaateMuseums.run(museum.name, museum.type, museum.location)
    }
    
    }
function createWorks(){
    const works = [
        {
            id:1,
            work: "Irises",
            author:"Vincent van Gogh",
            image:"https://www.vincentvangogh.org/images/paintings/irises.jpg",
            museumId:1
        },
        {
            id:2,
            work: "Wright Flyer",
            author:"The Wright Brothers",
            image:"https://www.nps.gov/common/uploads/stories/images/nri/20160902/articles/2D3ACA52-1DD8-B71B-0B2E5304562E32D0/2D3ACA52-1DD8-B71B-0B2E5304562E32D0.jpg",
            museumId:2
        },
        {
            id:3,
            work: "Command Module, Apollo 11",
            author:"North American Rockwell",
            image:"https://assets.newatlas.com/dims4/default/fc62440/2147483647/strip/true/crop/1627x1080+0+0/resize/1627x1080!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2Fapollo-11-tour-11.jpg",
            museumId:2
        },
        {
            id:4,
            work: "mona lisa",
            author:"Leonardo da Vinci",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/640px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
            museumId:3
        },
        {
            id:5,
            work: "The Night Watch",
            author:"Rembrandt van Rijn",
            image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1200px-The_Night_Watch_-_HD.jpg",
            museumId:3
        }
    ]
    const createworktable = db.prepare(`
    CREATE TABLE IF NOT EXISTS works (
        id INTEGER NOT NULL,
        work TEXT NOT NULL,
        author TEXT NOT NULL,
        image TEXT NOT NULL,
        museumId INTEGER NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (museumId) REFERENCES museums(id)
      );
    `)
    createworktable.run()
    
    const deleteWorks = db.prepare(`
    DELETE from works;
    `)
    deleteWorks.run()
    
    const creaateWorks = db.prepare(`
    INSERT INTO works (work, author, image, museumId) VALUES (?,?,?,?);
    `)
    for (let work of works) {
        creaateWorks.run(work.work, work.author, work.image, work.museumId)
    }
    
}
    createmuseums()
    createWorks()