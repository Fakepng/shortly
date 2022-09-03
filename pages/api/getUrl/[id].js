import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
    const { id } = req.query

    const code = id.split('-').join('')

    const url = await prisma.url.findUnique({
        where: {
            code
        }
    })
    
    if (!url) {
        res.end('Url not found')
    } else {
        await prisma.url.update({
            where: {
                code
            },
            data: {
                visited: url.visited + 1
            }
        })
        
        res.end(url.url)
    }
}