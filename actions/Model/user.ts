'use server'
import prisma from "@/db/db"


export const getUser = async (id: string) => {
    const response = await prisma.user.findUnique({
        where: { id },
        include:{
            subscriptions: true,
            client: true,
            employee: true
        }
    })

    return response
}