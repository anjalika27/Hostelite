import express from "express"
const route = express.Router()
import { checkAuthentication } from "../middlewares/auth.js"
import { signup, login, logout,getUserAccountDetails } from "../controllers/user.js"

route.get('/signup', (req, res) => res.render('signup.ejs'))
    .get('/login', (req, res) => res.render('login.ejs'))
    .post('/login', login)
    .post('/signup', signup)
    .get('/logout', logout)
    .get('/userDetails', checkAuthentication, getUserAccountDetails )


export default route