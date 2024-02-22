import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main () {
  try {
    await prisma.user.create({
      data: {
        email: 'david@david.com',
        hashedPassword: '1233455678'
      }
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
