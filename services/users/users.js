import prisma from '../../prisma/db'
export const createUser = async (email, hashedPassword) => {
  return await prisma.user.create({
    data: {
      email,
      hashedPassword
    }
  })
}

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email
    }
  })
}

export const updateUserByEmail = async (email, newData) => {
  return await prisma.user.update({
    where: {
      email
    },
    data: newData
  })
}

export const deleteUserByEmail = async (email) => {
  return await prisma.user.delete({
    where: {
      email
    }
  })
}
