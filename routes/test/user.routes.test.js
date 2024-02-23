import request from 'supertest';
import { app } from '../../app';
import { PrismaClient } from '@prisma/client'

// Connect to the test database
export const prisma = new PrismaClient();

// Mock PrismaClient and its methods
jest.mock('@prisma/client', () => {
  const mockUserCreate = jest.fn();
  const mockUserFindUnique = jest.fn();
  const mockUserUpdate = jest.fn();
  const mockUserDelete = jest.fn();

  return {
    PrismaClient: jest.fn(() => ({
      user: {
        create: mockUserCreate,
        findUnique: mockUserFindUnique,
        update: mockUserUpdate,
        delete: mockUserDelete,
      },
      $disconnect: jest.fn(),
    })),
    __mockUserCreate: mockUserCreate,
    __mockUserFindUnique: mockUserFindUnique,
    __mockUserUpdate: mockUserUpdate,
    __mockUserDelete: mockUserDelete,
  };
});

// Close the database connection after all tests are run
afterAll(async () => {
  // Disconnect Prisma Client
  await prisma.$disconnect();
});

describe('User routes', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });

  describe('POST /user/create', () => {
    it('return 201', async () => {
        const payload = {email: 'xyz@sadfjak.com', password: '2342388' };
        await request(app)
        .post('/user/create')
        .send(payload)
        .expect(201)
    })
  });

  describe('GET /user/find', () => {
    it('return 200', async () => {
      const email = 'test@example.com';

      await request(app)
        .get('/user/find')
        .send({ email })
        .expect(200);
    });
  });

  describe('PUT /user/update', () => {
    it('return 200', async () => {
      const email = 'test@example.com';
      const data = { name: 'New Name' }
      await request(app)
        .put('/user/update')
        .send({ email, data })
        .expect(200); 
    });
  });

  describe('DELETE /user/delete', () => {
    it('return 200', async () => {
      const email = 'test@example.com';
      await request(app)
        .delete('/user/delete')
        .send({ email })
        .expect(200); 
    });
  });
});
