import { singUp, logIn } from '../auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser } from '../../users/users';
import { PrismaClient } from '@prisma/client'

// Connect to the test database
export const prisma = new PrismaClient();

// Mocks
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../users/users')
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
  describe('singUp', () => {
    it('should create a new user with hashed password', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = 'hashedPassword123';

      bcrypt.hash.mockResolvedValue(hashedPassword);
      await singUp(email, password);

      expect(createUser).toHaveBeenCalledWith({email: "test@example.com", password: "hashedPassword123"});
    });
  });

  describe('logIn', () => {
    it('should log in the user and return a JWT token', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = {
        email,
        password: 'hashedPassword123', // Assuming this is the hashed password stored in the database
        username: 'testuser'
      };
      const token = 'generatedToken';

      prisma.user.findUnique.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue(token);

      const result = await logIn(email, password);

      expect(result).toEqual(token);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(jwt.sign).toHaveBeenCalledWith({ username: user.username }, 'secretKey');
    });

    it('should throw an error if user is not found', async () => {
      const email = 'nonexistent@example.com';
      const password = 'password123';

      prisma.user.findUnique.mockResolvedValue(null);

      await expect(logIn(email, password)).rejects.toThrow('No se encontró el usuario');
    });

    it('should throw an error if password is incorrect', async () => {
      const email = 'test@example.com';
      const password = 'wrongPassword';
      const user = {
        email,
        password: 'hashedPassword123', // Assuming this is the hashed password stored in the database
      };

      prisma.user.findUnique.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

      await expect(logIn(email, password)).rejects.toThrow('Credenciales incorrectas');
    });
  });
});
