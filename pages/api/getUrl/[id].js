import { db } from '../../../utils/db.server'

export default async function handle(req, res) {
    const { id } = req.query

    const code = id.split('-').join('')

    const url = await db.url.findFirst({
        where: {
            code
        }
    })
    
    if (!url) {
        res.end('Url not found')
    } else {
        res.end(url?.url)
    }
}