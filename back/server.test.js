const mongoose = require('mongoose')
require('dotenv/config')

const createserver = require('./app')
const Etudiant = require('./models/etudiant') // new
const supertest = require('supertest')
describe('étudiants', function () {
    var savedEtudiant
    beforeAll(async function (done) {
        mongoose.connect(
            process.env.DB_CONNECTION,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            },
            () => done(),
        )
    })

    test('should return the etudiant list', async function () {
        await supertest(app)
            .get('/etudiants')
            .expect(200)
            .then((response) => {
                // Check the response type and length
                expect(Array.isArray(response.body)).toBeTruthy()
                expect(response.body.length).toEqual(1)

                // Check the response data
                expect(response.body[0]._id).toBe(savedEtudiant._id)
                expect(response.body[0].nom).toBe(savedEtudiant.nom)
                expect(response.body[0].prenom).toBe(savedEtudiant.prenom)
                expect(response.body[0].datenaissance).toBe(
                    savedEtudiant.datenaissance,
                )
                expect(response.body[0].année_etude).toBe(
                    savedEtudiant.année_etude,
                )
                expect(response.body[0].cycle).toBe(savedEtudiant.cycle)
                expect(response.body[0].specialité).toBe(
                    savedEtudiant.specialité,
                )
                expect(response.body[0].email).toBe(savedEtudiant.email)
                expect(response.body[0].cin).toBe(savedEtudiant.cin)
                expect(response.body[0].mdp).toBe(savedEtudiant.mdp)
            })
    })
})
