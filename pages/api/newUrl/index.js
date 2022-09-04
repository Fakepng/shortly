import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
    const { id, url, name } = req.body;

    const string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    let code = '';
    while (true) {
        code = '';
        for (let i = 0; i < 12; i++) {
            code += string.charAt(Math.floor(Math.random() * string.length));
        }

        const codeExist = await prisma.url.findUnique({
            where: {
                code
            }
        })

        if (!codeExist) {
            break;
        }
    }
    

    const newUrl = await prisma.user.update({
        where: {
            id
        },
        data: {
            url: {
                create: {
                    url,
                    name,
                    code,
                    visited: 0
                }
            }
        },
        include: {
            url: true
        }
    })

    res.end(newUrl)
}