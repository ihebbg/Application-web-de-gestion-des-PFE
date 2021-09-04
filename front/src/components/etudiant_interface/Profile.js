import React, { useEffect, useState } from 'react'
import Img from './student.png'
import { useLocation } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import { Modal, Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import './Profile.css'
import axios from 'axios'
export default function Profile() {
    const location = useLocation()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [etudiant, setEtudiant] = useState({})
    const [passwordupdate, setPasswordUpdate] = useState({})
    let history = useHistory()
    const logout = () => {
        history.push('/login')
    }
    function handle(e) {
        const newdata = { ...passwordupdate }
        newdata[e.target.id] = e.target.value
        setPasswordUpdate(newdata)
        console.log(newdata)
    }
    const update_password = (e, idEtud) => {
        let request = {
            mdp: passwordupdate.mdp,
        }
        e.preventDefault()
        axios
            .put(`http://localhost:8000/changer_password/${idEtud}`, request)
            .then(() => {
                handleClose()
                alert(' Le mot de passe a changé avec succés')
            })

            .catch((err) => console.log(err))
    }
    const getinfo = () => {
        axios
            .get(`http://localhost:8000/etudiants/${location.state.detail._id}`)
            .then((res) => {
                console.log(res.data)
                setEtudiant(res.data)
            })

            .catch((err) => console.log(err))
    }
    useEffect(() => {
        getinfo()
    }, [etudiant])
    return (
        <div className='card'>
            <img src={Img}></img>
            <br></br>
            <h2>
                {etudiant.nom} {etudiant.prenom}
            </h2>
            <br></br>
            <h6>
                {etudiant.cycle} {etudiant.specialité}
            </h6>
            <br></br>

            <p>
                <AiIcons.AiOutlineMail /> {etudiant.email}
                <br></br>
                <RiIcons.RiLockPasswordFill /> {etudiant.mdp}
            </p>
            <div className='update_password'>
                <Button
                    variant='secondary'
                    onClick={() => {
                        handleShow()
                    }}
                >
                    {' '}
                    Cahanger Mot de passe ?
                </Button>
            </div>
            <Button
                onClick={logout}
                variant='info'
                style={{
                    marginTop: '500px',
                }}
            >
                {' '}
                <AiIcons.AiOutlineLogout /> Déconnexion
            </Button>
            <Modal show={show} onHide={handleClose} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h5>Changer un mot de passe d'un étudiant</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        
                        onSubmit={(e) => {
                            update_password(e, etudiant._id)
                        }}
                    >
                        <div className='col'>
                            Nouveau mot de passe:
                            <input
                                id='mdp'
                                onChange={(e) => handle(e)}
                                type='text'
                                className='form-control'
                                defaultValue={location.state.detail.mdp}
                            ></input>
                        </div>
                        <Modal.Footer>
                            <Button variant='success' type='submit'>
                                Confirmer
                            </Button>
                            <Button variant='warning' onClick={handleClose}>
                                Annuler
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
