import React, { Component } from 'react'
import Profile from './Profile'
import FormPFE from './FormPFE'
import MonPFE from './MonPFE'
export default class Etudiant_Interface extends Component {
    render() {
        return (
            <div className='etudiant'>
                <Profile />
                <FormPFE />
                <br></br>
                <br></br>
                <MonPFE />
            </div>
        )
    }
}
