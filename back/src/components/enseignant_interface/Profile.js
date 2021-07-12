import React, { useEffect, useState } from 'react'
import Img from './ensico.png'
import { useLocation } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import { Modal, Button, Form } from 'react-bootstrap'

import '../etudiant_interface/Profile.css'
import axios from 'axios'
export default function Profile() {
    const location = useLocation()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [enseignant, setEnseignant] = useState({})
    const [passwordupdate, setPasswordUpdate] = useState({})
    function handle(e) {
        const newdata = { ...passwordupdate }
        newdata[e.target.id] = e.target.value
        setPasswordUpdate(newdata)
        console.log(newdata)
    }
    const update_password = (e, idEns) => {
        let request = {
            mdp: passwordupdate.mdp,
        }
        e.preventDefault()
        axios
            .put(`http://localhost:8000/changer_mdp/${idEns}`, request)
            .then(() => {
                handleClose()
                alert(' Le mot de passe a changé avec succés')
            })

            .catch((err) => console.log(err))
    }
    const getinfo = () => {
        axios
            .get(
                `http://localhost:8000/enseignants/${location.state.detail._id}`,
            )
            .then((res) => {
                console.log(res.data)
                setEnseignant(res.data)
            })

            .catch((err) => console.log(err))
    }
    useEffect(() => {
        getinfo()
    }, [enseignant])
    return (
        <div className='card'>
            <img src={Img}></img>
            <br></br>
            <h2>
                {enseignant.nom} {enseignant.prenom}
            </h2>
            <br></br>
            <br></br>
            <p>
                <AiIcons.AiOutlineMail /> {enseignant.email}
                <br></br>
                <br></br>
                <RiIcons.RiLockPasswordFill /> {enseignant.mdp}
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
                        <h5>Changer un mot de passe d'un enseignant</h5>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        orm
                        onSubmit={(e) => {
                            update_password(e, enseignant._id)
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
