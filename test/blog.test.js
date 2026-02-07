import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/config/db.js';

test('Create blog and list', async () => {
  const email = `blog${Date.now()}@example.com`;
  const pwd = 'password123';

  const reg = await request(app)
    .post('/auth/register')
    .set('Content-Type', 'application/json')
    .send({ name: 'Blog User', email, password: pwd })
    .expect(201);

  const token = reg.body.token;
  assert(token, 'received token');

  const create = await request(app)
    .post('/blogs')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ title: 'Test Blog', content: 'This content is long enough to be summarized. It contains multiple sentences. It should pass validation.' })
    .expect(201);

  assert(create.body.id, 'blog created with id');

  const list = await request(app).get('/blogs').expect(200);
  assert(Array.isArray(list.body.data), 'blogs list returned');
});
test.after(async () => {
  await pool.end();
});
