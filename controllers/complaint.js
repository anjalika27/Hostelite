import ComplaintDB from "../models/complaint.js"
import UserDB from '../models/user.js'

async function allComplaintsById(req, res) {
    if (!req.user) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">Probably you are not logined!</h1>')

    try {
        const { rollno } = req.user

        const student = await UserDB.findOne({ 'rollno': rollno })

        if (!student) return res.status(200).send('<h1 style="text-align: center;" class= "mt-4"> Please register yourself for making a complain</h1>')
        const complaints = await ComplaintDB.find({ 'rollno': rollno }).sort({ 'createdAt': -1 })

        if (!complaints) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">No complaints found</h1>')

        return res.status(201).render('allComplaints.ejs', { complaints: complaints, user: req.user.username })
    } catch (error) {
        return res.status(400).send(`<h1 style="text-align: center;" class="mt-4">${error.message}</h1>`)
    }
}


async function getComplaintById(req, res) {
    if (!req.user) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">Probably you are logined!</h1>')

    try {
        const { rollno, id } = req.user

        const student = await UserDB.findOne({ 'rollno': rollno, '_id': id })
        if (!student) return res.status(200).send('<h1 style = "text-align: center;" class= "mt-4" > Please register yourself for making a complain</h1>')

        const complaints = await ComplaintDB.findOne({ 'rollno': rollno, '_id': id })
        if (!complaints) return res.status(200).send('<h1 style="text-align: center;" class="mt-4">No complaint found</h1>')

        return res.status(201).json(complaints)
    } catch (error) {
        return res.status(400).send(`<h1 style="text-align: center;" class="mt-4">${error.message}</h1>`)
    }
}
async function addNewComplaint(req, res) {
    if (!req.body) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">No complaint details found</h1>')


    try {
        const { complaint } = req.body
        const { rollno } = req.user

        // const student = await UserDB.findOne({ 'rollno': rollno, 'email': email })
        // if (!student) return res.status(200).send('<h1 style = "text-align: center;" class= "mt-4" > Please register yourself for making a complain</h1>')

        const addComplaint = await ComplaintDB.create({ rollno, complaint })
        return res.redirect('/viewLatestComplaint')

    } catch (error) {
        return res.status(400).send(`<h1 style="text-align: center;" class="mt-4">${error.message}</h1>`)
    }
}

async function viewLatestComplaint(req, res) {
    if (!req.user) return res.status(400).send(`<h1 style="text-align: center;" class="mt-4">no req.user found</h1>`)
    try {
        const { rollno } = req.user

        const latestComplaint = await ComplaintDB.find({ 'rollno': rollno }).sort({ 'createdAt': -1 })
        if (latestComplaint.length == 0) return res.status(200).send('<h1 style = "text-align: center;" class= "mt-4" >No complaints made</h1>')


        return res.status(200).render('viewLatestComplaint.ejs', { complaint: latestComplaint[0], user: req.user.username, message: 'Complaint registered!' })

    } catch (error) {
        return res.status(400).send(`<h1 style="text-align: center;" class="mt-4">${error.message}</h1>`)
    }
}


export { addNewComplaint, allComplaintsById, getComplaintById, viewLatestComplaint }