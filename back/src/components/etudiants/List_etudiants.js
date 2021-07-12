import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Modal, Button, Form } from 'react-bootstrap'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
export default function List_etudiants() {
    const [etudiant, setEtudiant] = useState([])
    const [etudiantupdate, setEtudiantUpdate] = useState({})
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    function handle(e) {
        const newdata = { ...etudiantupdate }
        newdata[e.target.id] = e.target.value
        setEtudiantUpdate(newdata)
    }
    //get etudiant by id
    const getetudiant = (idEtud) => {
        axios
            .get(`http://localhost:8000/etudiants/${idEtud}`)
            .then((res) => {
                console.log(res.data)
                setEtudiantUpdate(res.data)
                handleShow()
            })

            .catch((err) => console.log(err))
    }

    const update_etudiant = (e, idEtud) => {
        let request = {
            nom: etudiantupdate.nom,
            prenom: etudiantupdate.prenom,
            datenaissance: etudiantupdate.datenaissance,
            année_etude: etudiantupdate.année_etude,
            cycle: etudiantupdate.cycle,
            specialité: etudiantupdate.specialité,
            email: etudiantupdate.email,
            cin: parseInt(etudiantupdate.cin),
            mdp: etudiantupdate.mdp,
        }
        e.preventDefault()
        axios
            .put(`http://localhost:8000/etudiants/${idEtud}`, request)
            .then(() => {
                handleClose()
                alert('Étudiant a modifié avec succés')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const delete_etudiant = (idEtud) => {
        axios.delete(`http://localhost:8000/etudiants/${idEtud}`).then(() => {
            alert('etudiant a supprimé avec succès')
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:8000/etudiants')
            setEtudiant(res.data)
        }
        fetchData()
    }, [etudiant])
    return (
        <div>
            <Table size='sm' striped bordered>
                <caption> List des étudiants</caption>
                <thead>
                    <tr>
                        <th scope='col'> #</th>
                        <th scope='col'>Nom </th>
                        <th scope='col'>Prénom</th>
                        <th scope='col'>Date Naissance</th>
                        <th scope='col'>Annee d'etude</th>
                        <th scope='col'>Cycle</th>
                        <th scope='col'>Spécialité</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Cin</th>
                        <th scope='col'>Mot de passe</th>
                        <th scope='col'>Opérations</th>
                    </tr>
                </thead>

                <tbody>
                    {etudiant.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td> {index + 1} </td>
                                <td> {item.nom}</td>
                                <td> {item.prenom}</td>
                                <td> {item.datenaissance}</td>
                                <td> {item.année_etude}</td>
                                <td> {item.cycle}</td>
                                <td> {item.specialité}</td>
                                <td> {item.email}</td>
                                <td> {item.cin}</td>
                                <td> {item.mdp}</td>
                                <td>
                                    <span
                                        style={{ fontSize: '18px' }}
                                        onClick={() =>
                                            window.confirm(
                                                'Êtes-vous sûr de vouloir supprimer cet étudiant',
                                            ) && delete_etudiant(item._id)
                                        }
                                    >
                                        <AiIcons.AiFillDelete />
                                    </span>
                                    &nbsp;&nbsp;
                                    <span
                                        style={{ fontSize: '18px' }}
                                        onClick={() => getetudiant(item._id)}
                                    >
                                        <AiIcons.AiFillEdit />
                                    </span>
                                    &nbsp;&nbsp;
                                    <span
                                        style={{ fontSize: '18px' }}
                                        onClick={() =>
                                            window.confirm(
                                                'Êtes-vous sûr de vouloir bannir cet étudiant',
                                            )
                                        }
                                    >
                                        <FaIcons.FaBan />
                                    </span>
                                    &nbsp;&nbsp;
                                    <span style={{ fontSize: '18px' }}>
                                        <FaIcons.FaInfoCircle />
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>


                    {/* /*upddate etudiant */ }


            <Modal show={show} onHide={handleClose} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier un étudiant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={(e) => {
                            update_etudiant(e, etudiantupdate._id)
                        }}
                    >
                        <div className='form-row'>
                            <div className='col'>
                                <input
                                    id='nom'
                                    type='text'
                                    defaultValue={etudiantupdate.nom}
                                    onChange={(e) => handle(e)}
                                    className='form-control'
                                ></input>
                            </div>
                            <div className='col'>
                                <input
                                    id='prenom'
                                    type='text'
                                    defaultValue={etudiantupdate.prenom}
                                    onChange={(e) => handle(e)}
                                    className='form-control'
                                ></input>
                            </div>
                            <div className='col'>
                                <input
                                    id='datenaissance'
                                    defaultValue={etudiantupdate.datenaissance}
                                    type='text'
                                    onChange={(e) => handle(e)}
                                    className='form-control'
                                ></input>
                            </div>
                        </div>
                        <br></br>
                        <div className='form-row'>
                            <div className='col'>
                                <input
                                    onChange={(e) => handle(e)}
                                    defaultValue={etudiantupdate.année_etude}
                                    type='text'
                                    id='annéeEtude'
                                    className='form-control'
                                ></input>
                            </div>
                            <div className='col'>
                                <input
                                    id='cycle'
                                    onChange={(e) => handle(e)}
                                    defaultValue={etudiantupdate.cycle}
                                    type='text'
                                    className='form-control'
                                ></input>
                            </div>
                            <div className='col'>
                                <input
                                    id='specialité'
                                    defaultValue={etudiantupdate.specialité}
                                    type='text'
                                    className='form-control'
                                ></input>
                            </div>
                        </div>
                        <br></br>
                        <div className='form-row'>
                            <div className='col'>
                                <input
                                    id='email'
                                    onChange={(e) => handle(e)}
                                    defaultValue={etudiantupdate.email}
                                    type='text'
                                    className='form-control'
                                ></input>
                            </div>
                            <div className='col'>
                                <input
                                    id='cin'
                                    defaultValue={etudiantupdate.cin}
                                    type='number'
                                    onChange={(e) => handle(e)}
                                    className='form-control'
                                ></input>
                            </div>
                            <div className='col'>
                                <input
                                    id='mdp'
                                    defaultValue={etudiantupdate.mdp}
                                    onChange={(e) => handle(e)}
                                    type='text'
                                    className='form-control'
                                ></input>
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant='primary' type='submit'>
                                Confirmer
                            </Button>
                            <Button variant='secondary' onClick={handleClose}>
                                Annuler
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
