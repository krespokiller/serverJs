import { isAdmin } from '../auth.js'

describe('Is the user admin', () => {
    it('return true', () => {
        expect(isAdmin({role:"ADMIN"})).toBe(true)
    });
    
    it('return false', () => {
        expect(isAdmin({role:"anything"})).toBe(false)
    });
    
});

