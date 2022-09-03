import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getUrl = async ({ code }) => {
    const url = await prisma.url.findOne({
        where: {
            code
        }
    })

    if (!url) return 'Url not found'

    await prisma.url.update({
        where: {
            code
        },
        data: {
            visited: url.visited + 1
        }
    })

    return url
}

const newUrl = async ({ url, name, user }) => {
    const string = 'abcdefghijklmnopqrstuvwxyz1234567890'

    while (true) {
        let code = ''
        for (let i = 0; i < 12; i++) {
            code += string[Math.floor(Math.random() * string.length)]
        }

        const exists = await prisma.url.findOne({
            where: {
                code
            }
        })

        if (!exists) {
            await prisma.url.create({
                data: {
                    url,
                    name,
                    code,
                    user
                }
            })

            return code
        }
    }

}

module.export = { getUrl, newUrl }