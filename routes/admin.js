import express from 'express'
import { authRole } from '../middlewares/authRole.js'
import { loginAdmin, getAllComplaintsOfAllStudents, getAllStudents, changeComplaintStatusToAccept, changeComplaintStatusToReject, getAllNotices, addNotice, deleteNotice } from '../controllers/admin.js'
const route = express.Router()

route.post('/', authRole('ADMIN'), loginAdmin)
    .get('/', async (req, res) => res.render('admin/loginAdmin.ejs'))
    .get('/allComplaints', getAllComplaintsOfAllStudents)
    .get('/allStudents', getAllStudents)
    .get('/acceptComplaint/:id', changeComplaintStatusToAccept)
    .get('/rejectComplaint/:id', changeComplaintStatusToReject)
    .get('/allNotices', getAllNotices)
    .get('/addNotice', async (req, res) => res.render('admin/addNotice.ejs'))
    .post('/addNotice', addNotice)
    .get('/deleteNotice/:id', deleteNotice)


export default route