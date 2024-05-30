import { hashPassword } from '../controllers/auth.js';
import bcrypt from 'bcrypt';

describe('hashPassword', () => {
  it('should return a hashed password', async () => {
    const password = 'testPassword';
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).toBeTruthy();
    expect(typeof hashedPassword).toBe('string');
    expect(hashedPassword).not.toEqual(password);

    const isValid = await bcrypt.compare(password, hashedPassword);
    expect(isValid).toBe(true);
  });
});
