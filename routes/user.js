import express from "express"
const route = express.Router()
import { signup, login, logout } from "../controllers/user.js"

route.get('/signup', (req, res) => res.render('signup.ejs'))
    .get('/login', (req, res) => res.render('login.ejs'))
    .post('/login', login)
    .post('/signup', signup)
    .get('/logout', logout)


export default route