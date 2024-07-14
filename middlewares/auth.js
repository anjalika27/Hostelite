import { validateToken } from "../services/auth.js"

export function checkAuthentication(req, res, next) {
    const token = req.cookies['token']
    if (!token) return res.redirect('/login')
    try {
        const userPayload = validateToken(token);
        req.user = userPayload;
    } catch (error) {
        console.log('not got user');
    }
    return next()
}