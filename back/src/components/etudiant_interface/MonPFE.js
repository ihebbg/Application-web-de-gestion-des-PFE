import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import './MonPFE.css'
import { Table, Modal, Button, Form } from 'react-bootstrap'
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'

export default function MonPFE() {
    const location = useLocation()
    const [show, setShow] = useState(false)
    const [pfeupdate, setPfeupdate] = useState({})
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [pfe, setPFE] = useState([])
    function handle(e) {
        const newdata = { ...pfeupdate }
        newdata[e.target.id] = e.target.value
        setPfeupdate(newdata)
        console.log(newdata)
    }
    const getpfe = async (idPfe) => {
        const res = await axios.get(`http://localhost:8000/pfes/${idPfe}`)
        setPfeupdate(res.data)
        handleShow()
    }
    const fetchpfe = async () => {
        const res = await axios.get(
            `http://localhost:8000/pfes/etudiant/${location.state.detail._id}`,
        )
        setPFE(res.data)
    }
    const update_pfe = async (e, idPfe) => {
        let request = {
            nom_pfe: pfeupdate.nom_pfe,
            détails: pfeupdate.détails,
        }
        e.preventDefault()
        try {
            const res = await axios.put(
                `http://localhost:8000/pfes/${idPfe}`,
                request,
            )
            if (res.data.type === 'error' || res.data.type === 'délais') {
                alert(res.data.error)
            }
            setPfeupdate(res.data)
            alert('PFE a modifié avec succés')
            handleClose()
        } catch (err) {
            console.log(err)
            alert('bad request')
        }
    }
    useEffect(() => {
        fetchpfe()
    }, [pfe])
    return (
        <div className='pfe'>
            <Table size='lg' bordered variant='dark'>
                <caption> Mon PFE</caption>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'> Nom du PFE</th>
                        <th scope='col'> Cahier de charges</th>
                        <th scope='col'> État</th>
                        <th scope='col'> Modifier</th>
                        <th scope='col'> Détails</th>
                    </tr>
                </thead>

                {pfe.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td> {index + 1}</td>
                            <td> {item.nom_pfe}</td>
                            <td> {item.détails}</td>
                            <td> {item.état}</td>
                            <td width='5px'>
                                <span
                                    style={{ fontSize: '18px' }}
                                    onClick={() => getpfe(item._id)}
                                >
                                    <AiIcons.AiFillEdit />
                                </span>{' '}
                            </td>
                            <td width='5px'>
                                <span style={{ fontSize: '18px' }}>
                                    <MdIcons.MdDetails />
                                </span>
                            </td>
                        </tr>
                    )
                })}
            </Table>
            <Modal show={show} onHide={handleClose} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier mon PFE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={(e) => {
                            update_pfe(e, pfeupdate._id)
                        }}
                    >
                        <div className='col'>
                            <input
                                id='nom_pfe'
                                type='text'
                                defaultValue={pfeupdate.nom_pfe}
                                onChange={(e) => handle(e)}
                                className='form-control'
                            ></input>
                        </div>
                        <br></br>
                        <div className='col'>
                            <textarea
                                id='détails'
                                type='text'
                                defaultValue={pfeupdate.détails}
                                onChange={(e) => handle(e)}
                                rows='5'
                                className='form-control'
                            ></textarea>
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
