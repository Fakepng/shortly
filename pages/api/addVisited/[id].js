import { db } from '../../../utils/db.server'

export default async function handle(req, res) {
    const { id } = req.query

    const code = id.split('-').join('')

    await db.url.update({
        where: {
            code
        },
        data: {
            visited: {
                increment: 1
            }
        }
    })
}