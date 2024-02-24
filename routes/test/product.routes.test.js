import request from 'supertest';
import { app } from '../../app';
import { PrismaClient } from '@prisma/client'

// Connect to the test database
export const prisma = new PrismaClient();

// Mock PrismaClient and its methods
jest.mock('@prisma/client', () => {
  const mockProductCreate = jest.fn(()=>mockProduct);
  const mockProductsFindByUser = jest.fn(()=>[mockProduct]);
  const mockProductsFindAll = jest.fn(()=>[mockProduct]);
  const mockProductFindById = jest.fn(()=>mockProduct);
  const mockProductUpdate = jest.fn(()=>mockProduct);
  const mockProductDelete = jest.fn(()=>mockProduct);

  return {
    PrismaClient: jest.fn(() => ({
      product: {
        create: mockProductCreate,
        findMany: mockProductsFindByUser,
        findAll: mockProductsFindAll,
        findUnique: mockProductFindById,
        update: mockProductUpdate,
        delete: mockProductDelete,
      },
      $disconnect: jest.fn(),
    })),
    __mockProductCreate: mockProductCreate,
    __mockProductsFindByUser: mockProductsFindByUser,
    __mockProductsFindAll: mockProductsFindAll,
    __mockProductFindById: mockProductFindById,
    __mockProductUpdate: mockProductUpdate,
    __mockProductDelete: mockProductDelete,
  };
});

jest.mock('../../middleware/auth.js', () => {
  return {
    isAdmin: jest.fn(()=>true),
    verifyToken: jest.fn((req, res, next)=>{
      next()
    })
  }
})
// Mocked product data for testing
const mockProduct = {
id: 1,
name: 'Sample Product',
price: 10.99,
userId: 1,
};

// Close the database connection after all tests are run
afterAll(async () => {
  // Disconnect Prisma Client
  await prisma.$disconnect();
});

describe('Product routes', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });

  describe('POST /products/create', () => {
    it('should return 201', async () => {
        const payload = { name: 'Test Product', price: 100, userId: 1 };
        await request(app)
        .post('/product/create')
        .send(payload)
        .expect(201)
            });
  });

  describe('GET /product/findByUser', () => {
    it('should return 200', async () => {
      const userId = 1;

      await request(app)
        .get('/product/findByUser')
        .send({ userId })
        .expect(200);
    });
  });

  describe('GET /product/find', () => {
    it('should return 200', async () => {
      await request(app)
        .get('/product/find')
        .expect(200);
    });
  });

  describe('GET /product/findById', () => {
    it('should return 200', async () => {
      const productId = 1;

      await request(app)
        .get('/product/findById')
        .send({ productId })
        .expect(200);
    });
  });

  describe('PUT /product/update', () => {
    it('should return 200', async () => {
      const productId = 1;
      const payload = { name: 'Updated Product', price: 200 };

      await request(app)
        .put('/product/update')
        .send({ productId, ...payload })
        .expect(200); 
    });
  });

  describe('DELETE /product/delete', () => {
    it('should return 200', async () => {
      const productId = 1;

      await request(app)
        .delete('/product/delete')
        .send({ productId })
        .expect(200); 
    });
  });
});
