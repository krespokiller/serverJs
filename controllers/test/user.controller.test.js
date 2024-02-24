import {
    createUserController,
    findUserByEmailController,
    updateUserByEmailController,
    deleteUserByEmailController,
  } from '../user.controller.js';
  import {
    createUser,
    findUserByEmail,
    updateUserByEmail,
    deleteUserByEmail,
  } from '../../services/index.js';
  
  // Mocked request and response objects
  const mockRequest = (body) => ({ body });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
  };
  
  // Mocked user data for testing
  const mockUser = {
    email: 'test@example.com',
    password: 'password123',
    data: { name: 'Updated Name' },
  };
  
  // Mocked error object for testing
  const mockError = new Error('Test Error');
  
  // Mocked service functions
  jest.mock('../../services/index.js', () => ({
    createUser: jest.fn(),
    findUserByEmail: jest.fn(),
    updateUserByEmail: jest.fn(),
    deleteUserByEmail: jest.fn(),
  }));

  jest.mock('../../middleware/auth.js', () => {
    return {
      isAdmin: jest.fn(()=>true),
    }
  })
  
  describe('User Controller Tests', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear all mock calls before each test
    });
  
    describe('createUserController', () => {
      it('should create a new user successfully', async () => {
        createUser.mockResolvedValue(mockUser);
        const req = mockRequest(mockUser);
        const res = mockResponse();
  
        await createUserController(req, res);
  
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
          ...mockUser,
          message: 'Usuario registrado correctamente',
        });
      });
  
      it('should handle error when creating a new user', async () => {
        createUser.mockRejectedValue(mockError);
        const req = mockRequest(mockUser);
        const res = mockResponse();
  
        await createUserController(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error al registrar el usuario');
      });
    });
  
    describe('findUserByEmailController', () => {
      it('should find a user by email successfully', async () => {
        findUserByEmail.mockResolvedValue(mockUser);
        const req = mockRequest({ email: 'test@example.com' });
        const res = mockResponse();
  
        await findUserByEmailController(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
          ...mockUser,
          message: 'Usuario encontrado correctamente',
        });
      });
  
      it('should handle error when finding a user by email', async () => {
        findUserByEmail.mockRejectedValue(mockError);
        const req = mockRequest({ email: 'test@example.com' });
        const res = mockResponse();
  
        await findUserByEmailController(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error al encontrar el usuario');
      });
    });
  
    describe('updateUserByEmailController', () => {
      it('should update a user by email successfully', async () => {
        updateUserByEmail.mockResolvedValue(mockUser);
        const req = mockRequest({ email: 'test@example.com', data: { name: 'Updated Name' } });
        const res = mockResponse();
  
        await updateUserByEmailController(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
          ...mockUser,
          message: 'Usuario actualizado correctamente',
        });
      });
  
      it('should handle error when updating a user by email', async () => {
        updateUserByEmail.mockRejectedValue(mockError);
        const req = mockRequest({ email: 'test@example.com', data: { name: 'Updated Name' } });
        const res = mockResponse();
  
        await updateUserByEmailController(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error al actualizar el usuario');
      });
    });
  
    describe('deleteUserByEmailController', () => {
      it('should delete a user by email successfully', async () => {
        deleteUserByEmail.mockResolvedValue(mockUser);
        const req = mockRequest({ email: 'test@example.com' });
        const res = mockResponse();
  
        await deleteUserByEmailController(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
          ...mockUser,
          message: 'Usuario borrado correctamente',
        });
      });
  
      it('should handle error when deleting a user by email', async () => {
        deleteUserByEmail.mockRejectedValue(mockError);
        const req = mockRequest({ email: 'test@example.com' });
        const res = mockResponse();
  
        await deleteUserByEmailController(req, res);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Error al borrar el usuario');
      });
    });
  });
  