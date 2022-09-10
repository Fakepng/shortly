import { db } from '../../../utils/db.server'

export default async function handle(req, res) {
    const { code } = req.body;

    await db.url.update({
        where: {
            code
        },
        data: {
            visited: {
                set: 0
            }
        }
    })

    res.end('Visited reset')
}