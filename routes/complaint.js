import express from "express"
import { allComplaintsById, addNewComplaint, getComplaintById, viewLatestComplaint } from "../controllers/complaint.js"
import { checkAuthentication } from "../middlewares/auth.js"


const route = express.Router()

route.get('/complaint', checkAuthentication, async (req, res) => res.status(200).render('addComplaint.ejs', { user: req.user.username }))
    .get('/allComplaints?:rollno', checkAuthentication, allComplaintsById)
    .get('/addComplaint', checkAuthentication, async (req, res) => res.render('addComplaint.ejs', { user: req.user.username }))
    .post('/addComplaint', checkAuthentication, addNewComplaint)
    .get('/getComplaint?:rollno?:id', checkAuthentication, getComplaintById)
    .get('/viewLatestComplaint?:rollno', checkAuthentication, viewLatestComplaint)
    
export default route