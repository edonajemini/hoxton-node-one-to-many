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
    createmuseums()