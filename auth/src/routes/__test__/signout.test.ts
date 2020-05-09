import request from 'supertest';
import { app } from '../../app';

it('invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@i.ua',
      password: 'pswd',
    })
    .expect(201);

  const res = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200);

  expect(res.get('Set-Cookie')[0]).toContain('express:sess=;');
});
