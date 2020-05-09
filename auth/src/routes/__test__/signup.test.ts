import request from 'supertest';
import { app } from '../../app';

it('successful signup with 201 response code', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@i.ua',
      password: 'pswd',
    })
    .expect(201);
});

it('failed signup with invaid email and 400 response code', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test',
      password: 'pswd',
    })
    .expect(400);
});

it('failed signup with invalid password and 400 response code', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@i.ua',
      password: 'psw',
    })
    .expect(400);
});

it('failed signup with missing props and 400 response code', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@i.ua',
    })
    .expect(400);
});

it('prohibit duplicated email and return 400 response code', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@i.ua',
      password: 'pswd',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@i.ua',
      password: 'pswd',
    })
    .expect(400);
});

it('sets cookie after sigup', async () => {
  const res = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@i.ua',
      password: 'pswd',
    })
    .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();
});
