import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { Table, Modal, Button, Form } from 'react-bootstrap'

import * as FaIcons from 'react-icons/fa'

import * as AiIcons from 'react-icons/ai'

export default function List_enseignants() {
    const [enseignant, setEnseignant] = useState([])
    const [enseignantupdate, setEnseignantUpdate] = useState({})
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    function handle(e) {
        const newdata = { ...enseignantupdate }
        newdata[e.target.id] = e.target.value
        setEnseignantUpdate(newdata)
        console.log(newdata)
    }
    function delete_enseignant(idEns) {
        axios.delete(`http://localhost:8000/enseignants/${idEns}`).then(() => {
            alert('enseignant a supprimé avec succès')
        })
    }
 //get un enseignant
    const get_enseignant = (idEns) => {
        axios
            .get(`http://localhost:8000/enseignants/${idEns}`)
            .then((res) => {
                console.log(res.data)
                setEnseignantUpdate(res.data)
                handleShow()
            })

            .catch((err) => console.log(err))
    }
    //Modifier un enseingant
    const update_teacher = (e, idEns) => {
        e.preventDefault()

        let request = {
            nom: enseignantupdate.nom,
            prenom: enseignantupdate.prenom,
            datenaissance: enseignantupdate.datenaissance,
            email: enseignantupdate.email,
            cin: parseInt(enseignantupdate.cin),
            mdp: enseignantupdate.mdp,
        }
        axios
            .put(`http://localhost:8000/enseignants/${idEns}`, request)
            .then(() => {
                handleClose()
                alert('Étudiant a modifé avec succés')
            })
            .catch((err) => {
                console.log(err)
                alert('Bad Request')
            })
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:8000/enseignants')
            setEnseignant(res.data)
        }
        fetchData()
    }, [enseignant])
    return (
        <div>
            <Table size='sm' striped bordered >
                <caption> List des étudiants</caption>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Nom </th>
                        <th scope='col'>Prénom</th>
                        <th scope='col'>Date Naissance</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Cin</th>
                        <th scope='col'>Mot de passe</th>
                        <th scope='col'>Opérations</th>
                    </tr>
                </thead>
                <tbody>
                    {enseignant.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td> {index + 1}</td>
                                <td> {item.nom}</td>
                                <td> {item.prenom}</td>
                                <td> {item.datenaissance}</td>
                                <td> {item.email}</td>
                                <td> {item.cin}</td>
                                <td> {item.mdp}</td>
                                <td>
                                    <span
                                        style={{ fontSize: '18px' }}
                                        onClick={() =>
                                            window.confirm(
                                                'Êtes-vous sûr de vouloir supprimer cet enseignant',
                                            ) && delete_enseignant(item._id)
                                        }
                                    >
                                        <AiIcons.AiFillDelete />
                                    </span>{' '}
                                    &nbsp;&nbsp;
                                    <span
                                        style={{ fontSize: '18px' }}
                                        onClick={() =>
                                            get_enseignant(item._id)
                                        }
                                    >
                                        <AiIcons.AiFillEdit />
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

            {/* update enseiganant */}
            <Modal show={show} onHide={handleClose} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier un enseignant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        className='form-sm'
                        onSubmit={(e) =>
                            update_teacher(e, enseignantupdate._id)
                        }
                    >
                        <div className='form-row'>
                            <div className='col'>
                                <input
                                    id='nom'
                                    type='text'
                                    defaultValue={enseignantupdate.nom}
                                    onChange={(e) => handle(e)}
                                    className='form-control'
                                ></input>
                            </div>
                            <div className='col'>
                                <input
                                    type='text'
                                    id='prenom'
                                    defaultValue={enseignantupdate.prenom}
                                    onChange={(e) => handle(e)}
                                    className='form-control'
                                ></input>
                            </div>
                            <div className='col'>
                                <input
                                    id='datenaissance'
                                    defaultValue={
                                        enseignantupdate.datenaissance
                                    }
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
                                    defaultValue={enseignantupdate.email}
                                    type='text'
                                    className='form-control'
                                    id='email'
                                ></input>
                            </div>
                            <div className='col'>
                                <input
                                    defaultValue={enseignantupdate.cin}
                                    type='number'
                                    onChange={(e) => handle(e)}
                                    className='form-control'
                                    id='cin'
                                ></input>
                            </div>
                            <div className='col'>
                                <input
                                    defaultValue={enseignantupdate.mdp}
                                    onChange={(e) => handle(e)}
                                    type='text'
                                    id='mdp'
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
