import jwt from 'jsonwebtoken'

import { verifyToken } from '../auth.js'

jest.mock('jsonwebtoken', () => {
    return {
        verify: jest.fn((token, secret, callback) => {
            callback(null, { id: 'someUserId' });
        })
    };
});

describe('Verify token', () => {
    it('calls verify when execute verifyToken middleware', () => {
        const req = { headers: { "authorization": 'Bearer someToken' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();

        // Call verifyToken middleware
        verifyToken(req, res, next);

        // Verify that jwt.verify is called with correct arguments
        expect(jwt.verify).toHaveBeenCalledWith('someToken', process.env.SECRET_KEY, expect.any(Function));

        // Verify that next() is called
        expect(next).toHaveBeenCalled();
    });
});
