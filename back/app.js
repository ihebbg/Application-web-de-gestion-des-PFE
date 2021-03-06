const express = require('express')
const cors = require('cors')
// require('./connexion')

const route_etudiant = require('./routes/etudiant_routes')
const route_enseignant = require('./routes/enseignant_routes')
const route_auth = require('./routes/auth_routes')
const route_anneeUniv = require('./routes/annee_universitairesRoutes')
const route_pfe = require('./routes/pfe_routes')

function createserver() {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())
    app.use('/', route_auth)
    app.use('/', route_etudiant)
    app.use('/', route_enseignant)
    app.use('/', route_anneeUniv)
    app.use('/', route_pfe)

 
    return app
}
module.exports = createserver
