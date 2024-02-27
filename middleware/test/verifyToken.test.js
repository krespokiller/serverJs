import jwt from 'jsonwebtoken'
import { verifyToken } from '../auth.js'
import { findUserByEmail } from '../../services/user.js';

jest.mock('jsonwebtoken', () => {
    return {
        verify: jest.fn((token, secret, callback) => {
            callback(null, { id: 'someUserId' });
        })
    };
});

jest.mock('../../services/user.js',() => {
    const mockedUser = { id: 1, email: 'test@example.com', hashedPassword: '123TH1SISSUPOSEDTOBEAHASH123' };
    return {
      findUserByEmail: jest.fn(()=>mockedUser)
    };
  })
  describe('Verify token', () => {
    it('calls verify when execute verifyToken middleware', async () => {
        const req = { headers: { "authorization": 'Bearer someToken' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        // Call verifyToken middleware
        await verifyToken(req, res, next);

        // Verify that jwt.verify is called with correct arguments
        expect(jwt.verify).toHaveBeenCalledWith('someToken', process.env.SECRET_KEY, expect.any(Function));

        // Verify that findUserByEmail() is called
        expect(findUserByEmail).toHaveBeenCalledWith(undefined);

        // Verify that next() is called
        expect(next).toHaveBeenCalled();
    });

    it('returns 403 status if no token provided', async () => {
        const req = { headers: {} };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        // Call verifyToken middleware
        await verifyToken(req, res, next);

        // Verify that res.status and res.send are called with appropriate arguments
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith({ auth: false, message: 'No token provided.' });

        // Verify that jwt.verify and findUserByEmail are not called
        expect(jwt.verify).not.toHaveBeenCalled();
        expect(findUserByEmail).not.toHaveBeenCalled();

        // Verify that next() is not called
        expect(next).not.toHaveBeenCalled();
    });

    it('returns 500 status if token verification fails', async () => {
        const req = { headers: { "authorization": 'Bearer invalidToken' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        // Mock jwt.verify to simulate verification failure
        jwt.verify.mockImplementationOnce((token, secret, callback) => {
            callback(new Error('Token verification failed'), null);
        });

        // Call verifyToken middleware
        await verifyToken(req, res, next);

        // Verify that res.status and res.send are called with appropriate arguments
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({ auth: false, message: 'Failed to authenticate token.' });

        // Verify that jwt.verify is called with correct arguments
        expect(jwt.verify).toHaveBeenCalledWith('invalidToken', process.env.SECRET_KEY, expect.any(Function));

        // Verify that findUserByEmail is not called
        expect(findUserByEmail).not.toHaveBeenCalled();

        // Verify that next() is not called
        expect(next).not.toHaveBeenCalled();
    });
});

