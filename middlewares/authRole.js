import UserDB from '../models/user.js'

export function authRole(role) {
    return async function (req, res, next) {
        try {
            const { username } = req.body
            const admin = await UserDB.findOne({ username })
            if (!admin) return res.status(400).send('<h1 style="text-align: center;" class="mt-4">No admin found</h1>')
            if (admin.role !== role) {
                return res.status(400).send('<h1 style="text-align: center;" class="mt-4">Unauthorised user</h1>')
            }
            return next();
        } catch (error) {
            return res.status(400).send(`<h1 style="text-align: center;" class="mt-4">${error.message}</h1>`)
        }
    }
}