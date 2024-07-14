import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import path from "path"
import userRoute from './routes/user.js'
import facilitiesRoute from './routes/facilities.js'
import complaintRoute from './routes/complaint.js'
import adminRoute from './routes/admin.js'
import cookieParser from "cookie-parser"
import { checkAuthentication } from "./middlewares/auth.js"
dotenv.config()

const app = express()

const PORT = process.env.PORT || 8000

app.set('views', path.resolve('./views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieParser())

app.use(express.urlencoded({ extended: false }))


mongoose.connect(process.env.MONGO_DB_URL, { dbName: 'Hostelite' })
    .then((res) => {
        console.log('DB Connected');
        app.listen(PORT, () => {
            console.log('server running on http://localhost:3000');
        })
    })
    .catch((err) => {
        console.log(err.message);
    })


app.get('/', checkAuthentication, (req, res) => {
    res.render('home.ejs', { user: req.user.username })
})

app.use('/admin',adminRoute)
app.use('/', [userRoute, facilitiesRoute, complaintRoute])