import { db } from '../../../utils/db.server'

export default async function handle(req, res) {
    const { code } = req.body;

    await db.url.delete({
        where: {
            code
        }
    });

    res.end('Url deleted')
}