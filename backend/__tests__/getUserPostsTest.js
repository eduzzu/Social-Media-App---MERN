import Post from "../models/Post";
import { getUserPosts } from "../controllers/posts";
import { jest } from '@jest/globals';

describe('getUserPosts', () => {
  it('should return user posts when found', async () => {
    const userId = '123';
    const userPosts = [
      { _id: '1', userId: '123', content: 'Post 1' },
      { _id: '2', userId: '123', content: 'Post 2' },
    ];

    // simulez cautarea postarilor utilizatorului în baza de date
    jest.spyOn(Post, 'find').mockResolvedValue(userPosts);

    const req = { params: { userId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUserPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(userPosts);
  });

  it('should return error message when user posts not found', async () => {

    const userId = '123';

    jest.spyOn(Post, 'find').mockRejectedValue(new Error('User posts not found'));

    const req = { params: { userId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUserPosts(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User posts not found' });
  });
});