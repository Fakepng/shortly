import { db } from '../../../utils/db.server'

export default async function handle(req, res) {
    const { id } = req.body;

    const url = await db.url.findMany({
        where: {
            userId: id
        }
    })

    res.json(url)
}