import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean user and product tables
  console.log('Seed started');

  await prisma.product.deleteMany();
  console.log('deleted products');

  await prisma.user.deleteMany();
  console.log('deleted users');

  const admin = await prisma.user.create({
    data: {
      email: 'admin@david.com',
      hashedPassword: '$2a$10$lnD9Au.V0uu51o/tow68GejLzUiuoNlQPE.SumKzsySFQltnHThha',
      role: "ADMIN"
    }
  });

  console.log(admin)

  const vendor = await prisma.user.create({
    data: {
      email: 'vendor@david.com',
      hashedPassword: '$2a$10$lnD9Au.V0uu51o/tow68GejLzUiuoNlQPE.SumKzsySFQltnHThha',
      role: "VENDOR"

    }
  });

  console.log(vendor)

  const vendor2 = await prisma.user.create({
    data: {
      email: 'vendor@david2.com',
      hashedPassword: '$2a$10$lnD9Au.V0uu51o/tow68GejLzUiuoNlQPE.SumKzsySFQltnHThha',
      role: "VENDOR"
    }
  });

  console.log(vendor2)

  // Add products
  const products = [
    { name: 'Test Product 1', price: 50 },
    { name: 'Test Product 2', price: 75 },
    { name: 'Test Product 3', price: 100 },
    { name: 'Test Product 4', price: 120 }
  ];


  const product1 = await prisma.product.create({
    data: {
      ...products[0],
      userId: vendor.id
    }
  });

  console.log(product1)


  const product2 = await prisma.product.create({
    data: {
      ...products[1],
      userId: vendor.id
    }
  });

  console.log(product2)

  const product3 = await prisma.product.create({
    data: {
      ...products[2],
      userId: vendor2.id
    }
  });

  console.log(product3)


  const product4 = await prisma.product.create({
    data: {
      ...products[3],
      userId: vendor2.id
    }
  });

  console.log(product4)

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
