import express from "express"
const route = express.Router()
import { checkAuthentication } from "../middlewares/auth.js"

route.get('/facilities', checkAuthentication, (req, res) => res.render('facilities.ejs', { user: req.user.username }))

export default route