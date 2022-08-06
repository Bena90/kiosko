import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    
    if(req.method === 'POST'){
        const orden = await prisma.order.create({
            data: {
                name: req.body.orderName,
                fecha: req.body.date,
                total: req.body.total,
                order: req.body.order,
            }            
        })
        console.log(orden)
        res.json(orden)
    }else{
        console.log ('get')
    }
}
