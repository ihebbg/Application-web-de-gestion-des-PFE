import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

export default function ListPfeEncad() {
    const location = useLocation()
    const [pfe, setPFE] = useState([])
    const getpfe_enseignant = async () => {
        const res = await axios.get(
            `http://localhost:8000/pfe_enseignant/${location.state.detail._id}`,
        )
        setPFE(res.data)
    }
    useEffect(() => {
        getpfe_enseignant()
    }, [pfe])
    return (
        <div className='listpfe' style={{marginLeft:"200px", paddingTop:"15px"}}>
            <h4 style={{fontWeight:'700',marginLeft:'260px'}}> Ma liste des PFE à encadrer</h4>
            <Table striped size='lg' bordered variant='dark'>
                <thead>
                    <tr>
                        <th scope='col'> #</th>
                        <th scope='col'>Nom PFE </th>
                        <th scope='col'>Cahier des charges</th>
                        <th scope='col'>Etudiant</th>
                        <th scope='col'> Date acceptation</th>
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
                                <td>{item.date_acceptation}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}
