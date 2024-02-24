import { singUp, logIn } from '../auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../user';
import { PrismaClient } from '@prisma/client'

// Connect to the test database
export const prisma = new PrismaClient();

// Mocks
jest.mock('jsonwebtoken');

jest.mock('bcryptjs', () => {
  return {
    genSaltSync: jest.fn(() => { return '$2a$10$eFdpf.C4gLQSlq3CALloT.' }),
    hashSync: jest.fn(()=>'123TH1SISSUPOSEDTOBEAHASH123'),
    compareSync: jest.fn((value1,value2)=>value1==='password123'&&value2==='123TH1SISSUPOSEDTOBEAHASH123')
  };
});


jest.mock('../user',() => {
  const mockedUser = { id: 1, email: 'test@example.com', password: '123TH1SISSUPOSEDTOBEAHASH123' };
  return {
    createUser: jest.fn(()=>mockedUser),
    findUserByEmail: jest.fn(()=>mockedUser)
  };
})

jest.mock('@prisma/client', () => {
  const mockUserFindUnique = jest.fn();

  return {
    PrismaClient: jest.fn(() => ({
      user: {
        findUnique: mockUserFindUnique,
      },
      $disconnect: jest.fn(),
    })),
    __mockUserFindUnique: mockUserFindUnique,
  };
});

describe('Authentication Services', () => {
  beforeEach(()=>{
    jest.clearAllMocks()
  })
  describe('singUp', () => {
    it('should create a new user with hashed password', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      // Call the singUp function with the email and password
      const user = await singUp(email, password);
  
      // Assert that createUser was called with the correct arguments
      expect(createUser).toHaveBeenCalledWith( email, '123TH1SISSUPOSEDTOBEAHASH123' );
      // Assert that the singUp function returned the mocked user object
      expect(user).toEqual({ id: 1, email: email, password: '123TH1SISSUPOSEDTOBEAHASH123' });
    });
  });

  describe('logIn', () => {
    it('should log in the user and return a JWT token', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = {
        email,
        password: '123TH1SISSUPOSEDTOBEAHASH123',
      };
      const token = 'generatedToken';

      jwt.sign.mockReturnValue(token);

      const result = await logIn(email, password);

      expect(result).toEqual(token);
      expect(findUserByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compareSync).toHaveBeenCalledWith(password, user.password);
      expect(jwt.sign).toHaveBeenCalledWith({ email: user.email }, undefined,{"expiresIn": "7d"});
    });

    it('should throw an error if user is not found', async () => {
      const email = 'nonexistent@example.com';
      const password = 'password123';

      findUserByEmail.mockResolvedValue(null);

      await expect(logIn(email, password)).rejects.toThrow('No se encontró el usuario');
    });

    it('should throw an error if password is incorrect', async () => {
      const email = 'test@example.com';
      const password = 'wrongPassword';
      const user = {
        email,
        password: '123TH1SISSUPOSEDTOBEAHASH123',
      };
      findUserByEmail.mockResolvedValue(user);
      bcrypt.compareSync.mockResolvedValue(false);

      await expect(logIn(email, password)).rejects.toThrow('Credenciales incorrectas');
    });
  });
});
