import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'

export default function Form(props) {
    const [error, setError] = useState('')

    const [data, setData] = useState({
        nom: '',
        prenom: '',
        datenaissance: '',
        email: '',
        cin: '',
        mdp: '',
    })
    function clearData(e) {
        e.preventDefault()

        setData({
            nom: '',
            prenom: '',
            datenaissance: '',
            email: '',
            cin: '',
            mdp: '',
        })
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata);
    }
  

    return (
        <div className='container'>
            <form onSubmit={(e) => add_teacher(e)}>
                <legend
                    style={{
                        fontFamily: 'sans-serif',
                        fontWeight: '600',
                        fontSize: '23px',
                    }}
                >
                    Informations d'un enseignant:{' '}
                </legend>
                <div className='form-row'>
                    <div className='col'>
                        <input
                            type='text'
                            value={data.nom}
                            onChange={(e) => handle(e)}
                            id='nom'
                            className='form-control'
                            placeholder='Nom '
                        ></input>
                    </div>
                    <div className='col'>
                        <input
                            type='text'
                            value={data.prenom}
                            onChange={(e) => handle(e)}
                            id='prenom'
                            className='form-control'
                            placeholder='Prénom '
                        ></input>
                    </div>
                </div>
                <br></br> <br></br>
                <div className='form-row'>
                    <div className='col'>
                        <input
                            value={data.dateNaissance}
                            type='date'
                            onChange={(e) => handle(e)}
                            id='dateNaissance'
                            className='form-control '
                        ></input>
                    </div>

                    <div className='col'>
                        <input
                            value={data.email}
                            type='text'
                            onChange={(e) => handle(e)}
                            id='email'
                            className='form-control'
                            placeholder='Email'
                        ></input>
                    </div>
                </div>
                <br></br> <br></br>
                <div className='form-row'>
                    <div className='col'>
                        <input
                            value={data.cin}
                            type='number'
                            onChange={(e) => handle(e)}
                            id='cin'
                            className='form-control'
                            placeholder='Cin '
                        ></input>
                    </div>
                    <div className='col'>
                        <input
                            value={data.mdp}
                            type='password'
                            onChange={(e) => handle(e)}
                            id='mdp'
                            className='form-control'
                            placeholder='Mot de passe'
                        ></input>
                    </div>
                </div>
                <br></br>
                <div className='button'>
                    <Button type='submit' variant='success'>
                        Ajouter
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button variant='warning' onClick={clearData}>
                        Annuler
                    </Button>
                </div>
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
            </form>
        </div>
    )

    async function add_teacher(e) {
        e.preventDefault()
        let request = {
            nom: data.nom,
            prenom: data.prenom,
            datenaissance: data.dateNaissance,
            email: data.email,
            cin: parseInt(data.cin),
            mdp: data.mdp,
        }
        const res = await axios.post(
            'http://localhost:8000/enseignants',
            request,
        )
        try {
            if (res.data.type === 'error') {
                setError(res.data.error)
            } else {
                alert('Enseignant a ajouté avec succès')
                clearData(e)
            }
        } catch (err) {
            setError('bad request')
        }
    }
}
