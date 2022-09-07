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
            job: "Tour Guide",
            description:"Tour guides are often the most direct expression of a museum’s main goal: to educate. They show visitors around museums; answer questions; and provide specific knowledge about objects, historical periods, and exhibitions. Tour guides must have great people skills and the ability to retain a lot of information, offering it up as visitors ask questions.",
            museumId:1
        },
        {
            id:2,
            job: "Curator",
            description:"Museum curators are responsible for maintaining part or all of a museum’s collection. They can sell or acquire new pieces, decide what to store and what to display, and set the museum’s tone by selecting different exhibition designs and themes. Curators must have deep knowledge in their area and may also help with outreach and public relations.",
            museumId:1
        },
        {
            id:3,
            job: "Archivist",
            description:"Archivists help preserve and maintain documents, files, and other artifacts. They may use different techniques, such as restoration, or preserve pieces in specialized storage vaults or humidified rooms. Archivists often handle sensitive documents or artwork, helping to determine if they are ready for display as well as their condition. Archivists manage archives using spreadsheets and other organizational tools.",
            museumId:2
        },
        {
            id:4,
            job: "Outreach Director",
            description:"Outreach directors are the connection between museums and the public. These professionals often play a large role in attracting funding and general support for a museum. Outreach directors can arrange for school tours or send museum representatives to the schools themselves. They may also meet with potential donors to sell them on the merits of their institution or plan fundraising events.",
            museumId:3
        },
        {
            id:5,
            job: "Volunteer",
            description:"Volunteers fill many different roles at museums. They can serve as tour guides and docents, work in the visitors centers as greeters, help with maintenance, or act as informational hosts for exhibitions. Many museums rely on volunteer workers, who often enjoy perks such as complimentary parking and free visits to special exhibitions around town.",
            museumId:3
        }
    ]
    const createworktable = db.prepare(`
    CREATE TABLE IF NOT EXISTS works (
        id INTEGER NOT NULL,
        job TEXT NOT NULL,
        description TEXT NOT NULL,
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
    INSERT INTO works (job, description, museumId) VALUES (?,?,?);
    `)
    for (let work of works) {
        creaateWorks.run(work.job, work.description, work.museumId)
    }
    
}
    createmuseums()
    createWorks()