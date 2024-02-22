import { createUser, findUserByEmail, updateUserByEmail, deleteUserByEmail } from '../users.js'
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
describe('User Database Functions', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      const email = 'test@example.com';
      const hashedPassword = 'hashedPassword123';

      await createUser(email, hashedPassword);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email,
          hashedPassword,
        },
      });
    });
  });

  describe('findUserByEmail', () => {
    it('should find a user by email', async () => {
      const email = 'test@example.com';

      await findUserByEmail(email);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          email,
        },
      });
    });
  });

  describe('updateUserByEmail', () => {
    it('should update a user by email', async () => {
      const email = 'test@example.com';
      const newData = { name: 'New Name' };

      await updateUserByEmail(email, newData);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: {
          email,
        },
        data: newData,
      });
    });
  });

  describe('deleteUserByEmail', () => {
    it('should delete a user by email', async () => {
      const email = 'test@example.com';

      await deleteUserByEmail(email);

      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: {
          email,
        },
      });
    });
  });
});

