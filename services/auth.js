import JWT from 'jsonwebtoken'
import { configDotenv } from 'dotenv'
configDotenv()

function createToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        rollno: user.rollno,
        role: user.role
    }

    const token = JWT.sign(payload, process.env.SECRET_KEY_FOR_AUTHENTICATION)
    return token
}

function validateToken(token) {
    const payload = JWT.verify(token, process.env.SECRET_KEY_FOR_AUTHENTICATION)
    return payload
}

export { createToken, validateToken }