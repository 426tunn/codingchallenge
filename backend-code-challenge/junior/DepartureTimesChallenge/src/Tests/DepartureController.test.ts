import expect from 'expect';
import request from 'supertest';
import app from '../app'; 

describe('GET /departures', () => {
  test('It should respond with 200 status code and an array of stop points', async () => {
    const response = await request(app).get('/departures').expect(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('commonName');
    expect(response.body[0]).toHaveProperty('modes');
    expect(response.body[0]).toHaveProperty('distance');
    expect(response.body[0]).toHaveProperty('lines');
  });

  test('It should respond with 400 status code if no address is provided', async () => {
    const response = await request(app).get('/departures').expect(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Invalid location request');
  });
});
