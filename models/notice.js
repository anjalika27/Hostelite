import mongoose from "mongoose";

const noticeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

const noticeModel = mongoose.model('notice', noticeSchema)

export default noticeModel