import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
    const { code } = req.body;

    await prisma.url.delete({
        where: {
            code
        }
    });

    res.end('Url deleted')
}