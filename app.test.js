// tests/app.test.js
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/test', (req, res) => {
  res.status(200).send('Hello, World!');
});

describe('GET /test', () => {
  it('responds with Hello, World!', async () => {
    const response = await request(app).get('/test');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });
});