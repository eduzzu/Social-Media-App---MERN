import { getFeedPosts } from '../controllers/posts';
import Post from '../models/Post';
import { jest } from '@jest/globals';

describe('getFeedPosts', () => {
  it('should return feed posts successfully', async () => {

    const mockPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];

    // simulez functia Post.find() pentru a returna aceste postari
    jest.spyOn(Post, 'find').mockResolvedValue(mockPosts);

    // Mock pentru res si req
    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getFeedPosts(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockPosts);
  });

  it('should handle errors during feed posts retrieval', async () => {

    jest.spyOn(Post, 'find').mockRejectedValue(new Error('Database error'));

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getFeedPosts(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
