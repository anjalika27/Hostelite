import bcrypt from "bcrypt"
import UserDB from '../models/user.js'
import { createToken, validateToken } from "../services/auth.js"

async function signup(req, res) {
    if (!req.body) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">Not valid credentials</h1>')
    console.log(req.body);
    const { username, email, rollno, password } = req.body

    try {
        const alreadyUser = await UserDB.findOne({ 'rollno': rollno })
        console.log(alreadyUser);
        if (alreadyUser) return res.status(200).redirect('/login')
        const hashedPassword = await bcrypt.hash(password, 5)
        console.log(hashedPassword);
        const newUser = await UserDB.create({ username, email, rollno, password: hashedPassword })
        console.log(newUser);
        const token = createToken(newUser)
        console.log(token);
        return res.cookie('token', token).render('home.ejs', { user: newUser.username })
    } catch (error) {
        return res.status(500).send(`<h1 style="text-align: center;" class="mt-4">${error.message}</h1>`)
    }
}

async function login(req, res) {

    if (!req.body) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">Not valid credentials</h1>')

    const { rollno, password } = req.body

    try {
        const user = await UserDB.findOne({ 'rollno': rollno })
        if (!user) return res.redirect('/signup')

        const isMatched = await bcrypt.compare(password, user.password)

        if (isMatched) {
            const token = createToken(user)
            return res.cookie('token', token).render('home.ejs', { user: user.username })
        }

        return res.send('<h1 style="text-align: center;" class="mt-4">Not valid credentials</h1>')
    } catch (error) {
        return res.status(500).send(`<h1 style="text-align: center; class="mt-4">${error.message}</h1>`)
    }
}


async function logout(req, res) {
    res.clearCookie('token').redirect('/signup')
}

export { signup, login, logout }