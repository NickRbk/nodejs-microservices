import request from 'supertest';
import { app } from '../../app';

it('invalid email', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@i.ua',
      password: 'pswd',
    })
    .expect(400);
});

it('signin failed with incorrect password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@i.ua',
      password: 'pswd',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@i.ua',
      password: '_pswd',
    })
    .expect(400);
});

it('sigin responce include cookie', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@i.ua',
      password: 'pswd',
    })
    .expect(201);

  const res = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@i.ua',
      password: 'pswd',
    })
    .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
});
