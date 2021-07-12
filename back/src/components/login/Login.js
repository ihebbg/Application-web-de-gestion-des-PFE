import React, { useState } from 'react'
import './Login.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function Login(props) {
    let history = useHistory()
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
    // function to connect admin etudiant et enseiganant

    async function login(e) {
        e.preventDefault()

        let request = {
            email: data.email,
            mdp: data.password,
        }

        if (
            request.email === 'admin@gmail.com' &&
            request.mdp === '12345678900'
        ) {
            history.push('/admin')
        } else {
            const res = await axios.post('http://localhost:8000/login', request)
            localStorage.setItem = ('token', res.data.token)
            if (res.data.type === 'error') {
                setError(res.data.error)
            }
            if (res.data === 'Invalid password') {
                setError('Mot de passe est incorrecte')
            } else if (res.data === 'Invalid login') {
                setError('Email est incorrecte')
            } else if (res.data.message === 'student') {
           
                history.push({
                    pathname: '/espace_etudiant',
                    state: { detail: res.data.user },
                })
            } else if (res.data.message === 'teacher') {
               
                history.push({
                    pathname: '/espace_enseignant',
                    state: { detail: res.data.user },
                })
            }
        }
    }
    return (
        <div className='Login'>
            <div className='login-page'>
                <div className='form'>
                    <h3> SE CONNECTER</h3>
                    <br></br>
                    <p>
                        {' '}
                        Veuillez saisir votre email et votre mot de passe pour
                        vous connecter{' '}
                    </p>
                    <form className='login-form' onSubmit={(e) => login(e)}>
                        <input
                            value={data.email}
                            onChange={(e) => handle(e)}
                            type='text'
                            placeholder=' Saisir votre email'
                            id='email'
                        />
                        <input
                            value={data.password}
                            onChange={(e) => handle(e)}
                            type='password'
                            placeholder=' Saisir votre mot de passe'
                            id='password'
                        />
                        <button className='btn-primary'>login</button>
                    </form>
                    <br></br>
                    <div className='copyright'>
                        <p> © 2020-2021 ISAMM</p>
                    </div>
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
                </div>
            </div>
        </div>
    )
    
}
export default Login
