import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

import { Table, Button } from 'react-bootstrap'
import './PfeList.css'
export default function PfeList() {
    const datenow = new Date()
    const location = useLocation()

    const [pfe, setPFE] = useState([])
    // const [ setPfeupdate] = useState([])
    const getallpfe = async () => {
        const res = await axios.get('http://localhost:8000/pfes/')
        setPFE(res.data)
    }
    const encadrer = async (idPfe) => {
        let request = {
            état: 'Accepter',
            date_acceptation: datenow,
            enseignant: location.state.detail._id,
        }
        const res = await axios.put(
            `http://localhost:8000/encadrerpfe/${idPfe}`,
            request,
        )
        setPFE(res.data)
    }
    useEffect(() => {
        getallpfe()
    }, [pfe])
    return (
        <div className='listpfe' style={{ paddingTop: '15px' }}>
            <Table bordered striped size='lg'>
                <caption> List des PFE</caption>
                <thead>
                    <tr>
                        <th scope='col'> #</th>
                        <th scope='col'>Nom PFE </th>
                        <th scope='col'>Cahier des charges</th>
                        <th scope='col'>Etudiant</th>

                        <th scope='col'>Opération</th>
                    </tr>
                </thead>
                <tbody>
                    {pfe.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td> {index + 1} </td>
                                <td> {item.nom_pfe}</td>
                                <td> {item.détails}</td>
                                <td>
                                    {' '}
                                    {item.etudiant.nom} {item.etudiant.prenom}
                                </td>

                                <td>
                                    <Button
                                        onClick={() =>
                                            window.confirm(
                                                'Êtes-vous sûr de vouloir encadrer cet étudiant',
                                            ) && encadrer(item._id)
                                        }
                                    >
                                        {' '}
                                        Encadrer
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
