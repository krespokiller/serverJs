import request from 'supertest';
import { app } from '../../app';

import { PrismaClient } from '@prisma/client'
// Connect to the test database
export const prisma = new PrismaClient();
const mockedUser = { id: 1, email: 'test@example.com', password: '123TH1SISSUPOSEDTOBEAHASH123' };
// Mock PrismaClient and its methods
jest.mock('@prisma/client', () => {
  const mockUserCreate = jest.fn(()=>mockedUser);
  const mockUserFindUnique = jest.fn(()=>mockedUser);
  const mockUserUpdate = jest.fn(()=>mockedUser);
  const mockUserDelete = jest.fn(()=>mockedUser);

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

jest.mock('../../middleware/auth.js', () => {
  return {
    isAdmin: jest.fn(()=>true),
    verifyToken: jest.fn((req, res, next)=>{
      next()
    })
  }
})
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
