import mongoose from "mongoose";

const complaintSchema = mongoose.Schema({
    rollno: {
        type: String,
        required: true
    },
    complaint: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
        default: 'PENDING',
        required: true
    }
}, { timestamps: true })

const complaintModel = mongoose.model('complaints', complaintSchema)

export default complaintModel