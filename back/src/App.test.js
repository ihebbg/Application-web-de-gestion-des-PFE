import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
describe('test application gestion pfe', () => {
    test('renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<App />, div)
        ReactDOM.unmountComponentAtNode(div)
    })
})
