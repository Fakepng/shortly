import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        res.end({ message: 'User not found' })
    }

    const url = await prisma.url.findMany({
        where: {
            userId: user.id
        }
    })

    user.urls = url;

    res.json(user)
}