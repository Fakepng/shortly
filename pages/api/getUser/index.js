import { db } from '../../../utils/db.server'

export default async function handle(req, res) {
    const { email } = req.body;

    const user = await db.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        res.end({ message: 'User not found' })
    }

    const url = await db.url.findMany({
        where: {
            userId: user.id
        }
    })

    user.urls = url;

    res.json(user)
}