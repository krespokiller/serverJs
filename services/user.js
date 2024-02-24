import prisma from '../prisma/db.js'

export const createUser = async (email, hashedPassword) => {
  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword
    }
  })
  return user
}

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email
    }
  })
}

export const updateUserByEmail = async (email, data) => {
  return await prisma.user.update({
    where: {
      email
    },
    data: data
  })
}

export const deleteUserByEmail = async (email) => {
  return await prisma.user.delete({
    where: {
      email
    }
  })
}