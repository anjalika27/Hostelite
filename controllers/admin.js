import UserDB from '../models/user.js'
import ComplaintDB from '../models/complaint.js'
import NoticeDB from '../models/notice.js'
import bcrypt from 'bcrypt'
import { transporter } from '../services/email-sender.js'

export async function loginAdmin(req, res) {
    if (!req.body) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">Not valid credentials</h1>')

    const { username, password } = req.body

    try {
        const admin = await UserDB.findOne({ username })
        if (!admin) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">Admin not found</h1>')
        const isMatched = await bcrypt.compare(password, admin.password)
        if (isMatched) return res.render('admin/adminFeatures.ejs')
        return res.status(400).send('<h1 style="text-align: center; class="mt-4">Not Authorized</h1>')
    } catch (error) {
        return res.status(500).send(`<h1 style="text-align: center; class="mt-4">${error.message}</h1>`)
    }
}


export async function getAllComplaintsOfAllStudents(req, res) {
    try {
        const allComplaints = await ComplaintDB.find({}).sort({ 'createdAt': -1 })
        return res.render('admin/allComplaintsAdmin.ejs', { complaints: allComplaints })
    } catch (error) {
        return res.status(500).send(`<h1 style="text-align: center; class="mt-4">${error.message}</h1>`)
    }
}

export async function getAllStudents(req, res) {
    try {
        const allStudents = await UserDB.find({ role: 'STUDENT' })
        return res.render('admin/allStudentsAdmin.ejs', { students: allStudents })
    } catch (error) {
        return res.status(500).send(`<h1 style="text-align: center; class="mt-4">${error.message}</h1>`)
    }
}

export async function changeComplaintStatusToAccept(req, res) {
    if (!req.params) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">No complaint ID found</h1>')
    try {
        const { id } = req.params
        const complaint = await ComplaintDB.updateOne({ '_id': id }, { $set: { 'status': 'ACCEPTED' } })
        return res.redirect('/admin/allComplaints')
    } catch (error) {
        return res.status(500).send(`<h1 style="text-align: center; class="mt-4">${error.message}</h1>`)
    }
}

export async function changeComplaintStatusToReject(req, res) {
    if (!req.params) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">No complaint ID found</h1>')
    try {
        const { id } = req.params
        const complaint = await ComplaintDB.updateOne({ '_id': id }, { $set: { 'status': 'REJECTED' } })
        return res.redirect('/admin/allComplaints')
    } catch (error) {
        return res.status(500).send(`<h1 style="text-align: center; class="mt-4">${error.message}</h1>`)
    }
}

export async function getAllNotices(req, res) {
    try {
        const allNotices = await NoticeDB.find({})
        return res.render('admin/allNoticesAdmin.ejs', { notices: allNotices })
    } catch (error) {
        return res.status(500).send(`<h1 style="text-align: center; class="mt-4">${error.message}</h1>`)
    }
}

export async function addNotice(req, res) {
    if (!req.body) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">Add Notice please</h1>')
    try {
        const { title, text } = req.body
        const notice = await NoticeDB.create({ title, text })

        const allStudentMailID = await UserDB.find({}, { 'email': 1, '_id': 0 })

        const emailArray = []
        for (const email of allStudentMailID) {
            emailArray.push(email.email)
        }

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: emailArray,
            subject: title,
            text: text
        }

        const info = await transporter.sendMail(mailOptions)
        console.log('info ', info.response);

        return res.redirect('/admin/allNotices')
    } catch (error) {
        return res.status(500).send(`<h1 style="text-align: center; class="mt-4">${error.message}</h1>`)
    }
}

export async function deleteNotice(req, res) {
    if (!req.params) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">No notice ID found</h1>')
    try {
        const { id } = req.params
        const notice = await NoticeDB.deleteOne({ '_id': id })
        if (notice.deletedCount <= 0) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">Could not delete Notice</h1>')
        return res.redirect('/admin/allNotices')
    } catch (error) {
        return res.status(500).send(`<h1 style="text-align: center; class="mt-4">${error.message}</h1>`)
    }
}
