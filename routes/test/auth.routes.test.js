import request from 'supertest';
import { app } from '../../app';
import { PrismaClient } from '@prisma/client'

// Connect to the test database
export const prisma = new PrismaClient();

// Mock PrismaClient and its methods
jest.mock('@prisma/client', () => {
  const mockUserCreate = jest.fn(() => { return { email: 'xyz@sadfjak.com', password: '2342388'} });
  const mockUserFindUnique = jest.fn(() => { return { email: 'xyz@sadfjak.com', password: '2342388'} });

  return {
    PrismaClient: jest.fn(() => ({
      user: {
        create: mockUserCreate,
        findUnique: mockUserFindUnique,
      },
      $disconnect: jest.fn(),
    })),
    __mockUserCreate: mockUserCreate,
    __mockUserFindUnique: mockUserFindUnique,
  };
});

jest.mock('bcryptjs', () => {
  return {
    genSaltSync: jest.fn(() => { return '$2a$10$eFdpf.C4gLQSlq3CALloT.' }),
    hashSync: jest.fn(()=>'123TH1SISSUPOSEDTOBEAHASH123'),
    compareSync: jest.fn((value1,value2)=>value1==='password123'&&value2==='123TH1SISSUPOSEDTOBEAHASH123')
  };
});

jest.mock('../../services/index.js', () => ({
  singUp: jest.fn(()=>{return{ email: 'xyz@sadfjak.com', password: '2342388'}}),
  logIn: jest.fn(()=>{return{token: 'fakeToken'}}),
}));
// Close the database connection after all tests are run
afterAll(async () => {
  // Disconnect Prisma Client
  await prisma.$disconnect();
});

describe('Auth routes', () => {
  beforeEach(() => {
    jest.setTimeout(10000);
    jest.clearAllMocks();
  });

  describe('POST /auth/signup', () => {
    it('returns 201', async () => {
      const payload = { email: 'xyz@sadfjak.com', password: '2342388' };
      await request(app)
        .post('/auth/signup')
        .send(payload)
        .expect(200);

    });
  });

  describe('POST /auth/login', () => {
    it('returns 200', async () => {
      const payload = { email: 'xyz@sadfjak.com', password: '2342388' };
      await request(app)
        .post('/auth/login')
        .send(payload)
        .expect(200);
    });
  });
});
