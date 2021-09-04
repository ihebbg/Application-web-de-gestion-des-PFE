import React, { useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'

export default function Form(props) {
    const [data, setData] = useState({
        nom: '',
        prenom: '',
        dateNaissance: '',
        annéeEtude: '',
        cycle: '',
        specialité: '',
        email: '',
        cin: '',
        mdp: '',
    })

    const [error, setError] = useState('')

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }

    function clearData(e) {
        e.preventDefault()
        setData({
            nom: '',
            prenom: '',
            dateNaissance: '',
            annéeEtude: '',
            cycle: '',
            specialité: '',
            email: '',
            cin: '',
            mdp: '',
        })
    }
    async function add_student(e) {
        e.preventDefault()
        let request = {
            nom: data.nom,
            prenom: data.prenom,
            datenaissance: data.dateNaissance,
            année_etude: data.annéeEtude,
            cycle: data.cycle,
            specialité: data.specialité,
            email: data.email,
            cin: parseInt(data.cin),
            mdp: data.mdp,
        }
        const res = await axios.post('http://localhost:8000/etudiants', request)
        try {
            if (res.data.type === 'error') {
                setError(res.data.error)
            } else {
                alert('Étudiant a ajouté avec succès')
                clearData(e)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container'>
            <form onSubmit={(e) => add_student(e)}>
                <legend
                    style={{
                        fontFamily: 'sans-serif',
                        fontWeight: '600',
                        fontSize: '25px',
                    }}
                >
                    {props.info}{' '}
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
                    <div className='col'>
                        <input
                            value={data.dateNaissance}
                            type='date'
                            onChange={(e) => handle(e)}
                            id='dateNaissance'
                            className='form-control'
                            placeholder='Date Naissance'
                        ></input>
                    </div>
                </div>
                <br></br>
                <div className='form-row'>
                    <div className='col'>
                        <input
                            value={data.annéeEtude}
                            onChange={(e) => handle(e)}
                            type='text'
                            id='annéeEtude'
                            className='form-control'
                            placeholder="Année d'étude"
                        ></input>
                    </div>
                    <div className='col'>
                        <input
                            value={data.cycle}
                            type='text'
                            onChange={(e) => handle(e)}
                            id='cycle'
                            className='form-control'
                            placeholder='Cycle'
                        ></input>
                    </div>
                    <div className='col'>
                        <input
                            value={data.specialité}
                            type='text'
                            onChange={(e) => handle(e)}
                            id='specialité'
                            className='form-control'
                            placeholder='Spécialitè'
                        ></input>
                    </div>
                </div>
                <br></br>
                <div className='form-row'>
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
                <Button type='submit' variant='success'>
                    Ajouter
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                    variant='warning
                '
                    type='reset'
                    onClick={clearData}
                >
                    Annuler
                </Button>
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
    //ajouter etudiant 
    
}
