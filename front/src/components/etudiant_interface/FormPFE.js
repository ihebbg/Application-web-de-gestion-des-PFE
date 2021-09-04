import React from 'react'
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

import axios from 'axios'
export default function FormPFE(props) {
    const [pfe, setPfe] = useState({})
    const [error, setError] = useState('')
    const location = useLocation()

    function clearData(e) {
        e.preventDefault()
        setPfe({
            nom_pfe: '',
            détails: '',
        })
    }
    function handle(e) {
        const newdata = { ...pfe }
        newdata[e.target.id] = e.target.value
        setPfe(newdata)
        console.log(newdata)
    }
    async function add_pfe(e) {
        e.preventDefault()
        let request = {
            nom_pfe: pfe.nom_pfe,
            détails: pfe.détails,
            etudiant: location.state.detail._id,
        }
        const res = await axios.post('http://localhost:8000/pfe', request)
        try {
            if (
                res.data.type === 'error' ||
                res.data.type === 'délais' ||
                res.data.type === 'depose'
            ) {
                setError(res.data.error)
            } else {
                alert('PFE a ajouté avec succès')
                clearData(e)
            }
        } catch (err) {
            setError('Bad Request')
        }
    }

    return (
        <div className='container' style={{ paddingTop: '15px' }}>
            <Form onSubmit={(e) => add_pfe(e)}>
                <legend style={{ fontFamily: 'bold' }}>
                    Informations d'un projet fin d'étude:{' '}
                </legend>
                <div className='col'>
                    <input
                        type='text'
                        value={pfe.nom_pfe}
                        onChange={(e) => handle(e)}
                        id='nom_pfe'
                        className='form-control'
                        placeholder='Nom du PFE '
                    ></input>
                </div>
                <br></br>
                <div className='col'>
                    <textarea
                        id='détails'
                        type='text'
                        placeholder=' Cahier des charges du mon PFE'
                        className='form-control'
                        value={pfe.détails}
                        rows='5'
                        onChange={(e) => handle(e)}
                    ></textarea>
                </div>
                <br></br>
                <Button type='submit' variant='success'>
                    Ajouter
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant='warning' type='reset' onClick={clearData}>
                    Annuler
                </Button>
                <br></br>
                <br></br>
                {error && (
                    <div
                        style={{
                            color: 'red',
                            fontWeight: 'bold',
                            fontFamily: 'monospace',
                            fontSize: '17px',
                        }}
                        severity='error'
                        onClick={() => setError(null)}
                    >
                        {props.error || error}
                    </div>
                )}
            </Form>
        </div>
    )
}
