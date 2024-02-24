import prisma from '../prisma/db.js'

export async function createProduct(name, price, userId) {
    return await prisma.product.create({
      data: {
        name,
        price,
        userId
      }
    });
}

export async function findAllProductsByUser(userId) {
    return await prisma.product.findMany({
      where: {
        userId
      }
    });
}

export async function findAllProducts() {
    return await prisma.product.findMany();
}

export async function findProductById(productId) {
    return await prisma.product.findUnique({
      where: {
        id: productId
      }
    });
}

export async function updateProduct(productId, name, price) {
    return await prisma.product.update({
      where: {
        id: productId
      },
      data: {
        name,
        price
      }
    });
}

export async function deleteProduct(productId) {
    return await prisma.product.delete({
      where: {
        id: productId
      }
    });
  }