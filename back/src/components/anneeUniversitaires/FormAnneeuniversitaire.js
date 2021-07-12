import React, { useState } from 'react'
import axios from 'axios'
export default function Form(props) {
    const [data, setData] = useState({
        nom: '',
        délais_dépot_pfe: '',
    })

    const [error, setError] = useState('')
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    function clearData(e) {
        e.preventDefault()

        setData({
            nom: '',
            délais_dépot_pfe: '',
        })
    }
    async function add_année_univ(e) {
        e.preventDefault()
        let request = {
            nom: data.nom,
            délais_dépot_pfe: data.délais_dépot_pfe,
        }
        const res = await axios.post(
            'http://localhost:8000/annees_universitaires',
            request,
        )
        try {
            if (res.data.type === 'error') {
                setError(res.data.error)
            } else {
                alert(' Année universitaire a ajouté avec succès')
                setData(res.data)
                clearData(e)
            }
        } catch (err) {
            setError('bad request')
        }
    }
    return (
        <div className='container'>
            <form onSubmit={(e) => add_année_univ(e)} className='form-sm'>
                <legend style={{ fontFamily: 'bold' }}>
                    Informations d'une annee universitaire{' '}
                </legend>
                <div className='form-row'>
                    <div className='col'>
                        <input
                            type='text'
                            value={data.nom}
                            onChange={(e) => handle(e)}
                            id='nom'
                            className='form-control'
                            placeholder='Une année universitaire '
                        ></input>
                    </div>
                    <div className='col'>
                        <input
                            type='date'
                            value={data.délais_dépot_pfe}
                            onChange={(e) => handle(e)}
                            id='délais_dépot_pfe'
                            className='form-control'
                            placeholder='Délais dépot PFE '
                        ></input>
                    </div>
                </div>
                <br></br>
                <div className='button'>
                    <button type='submit' className='btn btn-success'>
                        Ajouter
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                        type='reset'
                        className='btn btn-warning '
                        onClick={clearData}
                    >
                        Annuler
                    </button>
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
}
