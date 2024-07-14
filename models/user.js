import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    rollno: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['STUDENT', 'ADMIN'],
        default: 'STUDENT'
    }
}, { timestamps: true })

const userModel = mongoose.model('user', userSchema)

export default userModel