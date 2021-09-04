const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { validation_user } = require('../validation/validation')
require('dotenv/config')
//validate data befor register

const connect = async (req, res) => {
    const { error } = validation_user(req.body)
    if (error)
        return res.send({ type: 'error', error: error.details[0].message })
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.send('Invalid login')

    const validpassord = await req.body.mdp.localeCompare(user.mdp)
    if (validpassord) return res.send('Invalid password')
    if (user.role == 'student') {
        const tokenStu = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.send({ token: tokenStu, message: 'student', user: user })
    }
    if (user.role == 'teacher') {
        const tokenTea = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.send({ token: tokenTea, message: 'teacher', user: user })
    }
}
module.exports = {
    connect,
}
