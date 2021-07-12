import React, { Component } from 'react'
import Navbar from '../navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import etudiant from '../etudiants/Etudiant'
import enseignant from '../enseignants/Enseignant'
import pfe from '../pfe/Pfe'

import Stat from './Stat'
import AnnéeUniversitaire from '../annéeUniversitaires/AnnéeUniversitaire'
export default class admin extends Component {
    render() {
        return (
            <div className='admin'>
                <Router>
                    <Navbar />

                    <div>
                        {' '}
                        <Switch>
                            <Route exact path='/admin' component={Stat} />
                            <Route
                                path='/admin/etudiants'
                                component={etudiant}
                            />
                            <Route
                                path='/admin/enseignants'
                                component={enseignant}
                            />
                            <Route
                                path='/admin/années_universitaires'
                                component={AnnéeUniversitaire}
                            />
                            <Route path='/admin/pfe' component={pfe} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}
