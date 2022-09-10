import { db } from '../../../utils/db.server'

export default async function handle(req, res) {
    const { id, url, name } = req.body;

    const user = await db.user.findFirst({
        where: {
            id
        },
        include: {
            url: true
        }
    })

    if (user.role === 'FREE' && user.url.length >= 10 ) {
        res.send('You have reached the limit of 10 urls')
    } else {
        const string = 'abcdefghijklmnopqrstuvwxyz0123456789';

        let code = '';
        while (true) {
            code = '';
            for (let i = 0; i < 12; i++) {
                code += string.charAt(Math.floor(Math.random() * string.length));
            }
    
            const codeExist = await db.url.findUnique({
                where: {
                    code
                }
            })
    
            if (!codeExist) {
                break;
            }
        }
    
        await db.user.update({
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
            }
        })
    
        res.send('Url created')
    }

    
}