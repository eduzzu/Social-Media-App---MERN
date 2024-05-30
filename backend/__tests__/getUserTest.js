import express from 'express';
import request from 'supertest';

const app = express();

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  if (id === '1') {
    res.status(200).json({ id: 1, name: 'John Doe' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

describe('GET /user/:id', () => {
  it('should respond with user details', async () => {

    const response = await request(app).get('/user/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name', 'John Doe');
  });

  it('should respond with 404 for non-existent user', async () => {
    const response = await request(app).get('/user/999');

    expect(response.status).toBe(404);
  });
});
