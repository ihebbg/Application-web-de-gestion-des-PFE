import React from 'react'
import Admin from './components/admin/Admin'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import Login from './components/login/Login'
import Etudiant_Interface from './components/etudiant_interface/Etudiant_Interface'
import Enseignant_Interface from './components/enseignant_interface/Enseignanat_Interface'

function App() {
    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Redirect exact from='/' to='/login' />

                    <Route path='/login' component={Login} />
                    <Route path='/admin' component={Admin} />
                    <Route
                        path='/espace_etudiant'
                        component={Etudiant_Interface}
                    />
                    <Route
                        path='/espace_enseignant'
                        component={Enseignant_Interface}
                    />
                </Switch>
            </Router>
        </div>
    )
}

export default App
