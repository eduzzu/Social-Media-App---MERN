import { extractUserData } from '../controllers/auth';

describe('extractUserData', () => {
  it('should extract user data from input object', () => {
    const inputData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      picturePath: '/path/to/picture.jpg',
      friends: ['friend1', 'friend2'],
      location: 'New York',
      occupation: 'Software Engineer',
    };

    const extractedData = extractUserData(inputData);

    expect(extractedData).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      picturePath: '/path/to/picture.jpg',
      friends: ['friend1', 'friend2'],
      location: 'New York',
      occupation: 'Software Engineer',
    });
  });
});
