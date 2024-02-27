import { singUpController, logInController } from '../auth.controller.js';
import { singUp, logIn } from '../../services/index.js';

const mockRequest = (body) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock('../../services/index.js', () => ({
  singUp: jest.fn(),
  logIn: jest.fn(),
}));

describe('Authentication Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signUpController', () => {
    it('should create a new user successfully', async () => {
      const mockUser = { email: 'testuser@example.com', password: 'testpassword' };
      singUp.mockResolvedValue(mockUser);
      const req = { body: mockUser };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
  
      await singUpController(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ ...mockUser, message: 'Usuario registrado correctamente' });
    });
  
    it('should handle error when creating a new user', async () => {
      const mockUser = { email: 'testuser@example.com', password: 'testpassword' };
      singUp.mockRejectedValue(new Error('Registration failed'));
      const req = { body: mockUser };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
  
      await singUpController(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error al registrar el usuario');
    });
  });

  describe('logInController', () => {
    it('should return a token when logging in successfully', async () => {
      const mockUser = { username: 'testuser', password: 'testpassword' };
      logIn.mockResolvedValue({token: 'fakeToken'});
      const req = mockRequest(mockUser);
      const res = mockResponse();

      await logInController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({token: 'fakeToken'});
    });

    it('should handle error when login fails', async () => {
      const mockUser = { username: 'testuser', password: 'testpassword' };
      logIn.mockRejectedValue(new Error('Authentication failed'));
      const req = mockRequest(mockUser);
      const res = mockResponse();

      await logInController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error en la autenticación');
    });
  });
});
