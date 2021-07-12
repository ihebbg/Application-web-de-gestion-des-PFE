import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Modal } from 'react-bootstrap'
import * as FaIcons from 'react-icons/fa'

export default function Listpfe() {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [pfeget, setPfeget] = useState([])
    const [pfe, setPFE] = useState([])
    const getallpfe = async () => {
        const res = await axios.get('http://localhost:8000/pfes/')
        setPFE(res.data)
    }
    const getpfe = (idPfe) => {
        axios
            .get(`http://localhost:8000/pfes/${idPfe}`)
            .then((res) => {
                setPfeget(res.data)
                handleShow()
            })

            .catch((err) => console.log(err))
    }
    useEffect(() => {
        getallpfe()
    }, [pfe])
    return (
        <div>
            <Table size='sm' striped bordered>
                <caption> List des PFE</caption>
                <thead>
                    <tr>
                        <th scope='col'> #</th>
                        <th scope='col'>Nom PFE</th>
                        <th scope='col'>Chaier des charges</th>
                        <th scope='col'>État</th>
                        <th scope='col'>Voir détails</th>
                    </tr>
                </thead>
                <tbody>
                    {pfe.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td> {index + 1} </td>
                                <td> {item.nom_pfe}</td>
                                <td> {item.détails}</td>
                                <td> {item.état}</td>
                                <td width='7%'>
                                    <span
                                        style={{ fontSize: '18px' }}
                                        onClick={() => getpfe(item._id)}
                                    >
                                        <FaIcons.FaInfoCircle />
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Détails d'un PFE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        <li>
                            {' '}
                            <span style={{ fontWeight: 'bold' }}>
                                {' '}
                                Nom du PFE :{' '}
                            </span>{' '}
                            {pfeget.nom_pfe}
                        </li>
                        <li>
                            {' '}
                            <span style={{ fontWeight: 'bold' }}>
                                {' '}
                                Cahier des charges:{' '}
                            </span>{' '}
                            {pfeget.détails}
                        </li>
                        <li>
                            {' '}
                            <span style={{ fontWeight: 'bold' }}>
                                {' '}
                                État du PFE :{' '}
                            </span>{' '}
                            {pfeget.état}
                        </li>
                        <li>
                            {' '}
                            <span style={{ fontWeight: 'bold' }}>
                                {' '}
                                Date d'accaptation :{' '}
                            </span>{' '}
                            {pfeget.date_acceptation}
                        </li>
                        {/* <li>
                            {' '}
                            <span style={{ fontWeight: 'bold' }}>
                                {' '}
                                Etudiant:{' '}
                            </span>{' '}
                            {pfeget.etudiant.nom}
                            &nbsp;

                            {pfeget.etudiant.prenom}
                        </li> */}
                        {/* <li>
                            {' '}
                            <span style={{ fontWeight: 'bold' }}>
                                {' '}
                                Encadrant:{' '}
                            </span>{' '}
                            {pfeget.enseignant.nom}
                            &nbsp;

                            {pfeget.enseignant.prenom}
                        </li> */}
                    </ul>
                </Modal.Body>
            </Modal>
        </div>
    )
}
