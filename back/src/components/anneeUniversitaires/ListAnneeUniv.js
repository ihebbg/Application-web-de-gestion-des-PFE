import React, { useState, useEffect } from 'react'
import { Table, Modal, Button, Form } from 'react-bootstrap'

import axios from 'axios'
import './List_annéeuniv.css'
export default function ListAnnéeUniv() {
    const [anneeuniv, setAnneeuniv] = useState([])
    const [anneeunivupdate, setAnneeunivUpdate] = useState({})
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    function handle(e) {
        const newdata = { ...anneeunivupdate }
        newdata[e.target.id] = e.target.value
        setAnneeunivUpdate(newdata)
    }
    const getAnnéeUniv = (idAnn) => {
        axios
            .get(`http://localhost:8000/annees_universitaires/${idAnn}`)
            .then((res) => {
                console.log(res.data)
                setAnneeunivUpdate(res.data)
                handleShow()
            })

            .catch((err) => console.log(err))
    }
    const update_anneeuniv = (e, idAnn) => {
        e.preventDefault()

        let request = {
            délais_dépot_pfe: anneeunivupdate.délais_dépot_pfe,
        }
        axios
            .put(
                `http://localhost:8000/annees_universitaires/${idAnn}`,
                request,
            )
            .then(() => {
                handleClose()
                alert('Année universitaire a modifié avec succés')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                'http://localhost:8000/annees_universitaires',
            )
            setAnneeuniv(res.data)
        }
        fetchData()
    }, [année_univ])
    return (
        <div>
            <Table className='table table-bordered table-sm table-hover'>
                <caption> List des années universitaires</caption>

                <thead>
                    <tr>
                        <th scope='col'> #</th>
                        <th scope='col'>Année universitaire</th>
                        <th scope='col'>Délais dépot pfe</th>
                        <th scope='col'>Opérations</th>
                    </tr>
                </thead>
                <tbody>
                    {anneeuniv.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td> {index + 1}</td>
                                <td>{item.nom}</td>
                                <td>{item.délais_dépot_pfe}</td>
                                <td>
                                    <button
                                        className='btn btn-sm btn-primary'
                                        onClick={() => getAnnéeUniv(item._id)}
                                    >
                                        {' '}
                                        Paramétrer le délais de PFE
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier une année universitaire</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={(e) => {
                            update_anneeuniv(e, année_univupdate._id)
                        }}
                    >
                        <div className='form-row'>
                            <div className='col'>
                                <input
                                    disabled
                                    id='nom'
                                    type='text'
                                    defaultValue={année_univupdate.nom}
                                    className='form-control'
                                ></input>
                            </div>
                            <div className='col'>
                                <input
                                    type='date'
                                    defaultValue={
                                        année_univupdate.délais_dépot_pfe
                                    }
                                    id='délais_dépot_pfe'
                                    onChange={(e) => handle(e)}
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
