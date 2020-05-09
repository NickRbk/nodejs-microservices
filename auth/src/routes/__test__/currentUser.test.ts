import request from 'supertest';
import { app } from '../../app';

it('get current user details', async () => {
  const cookie = await global.signin();

  const res = await request(app)
    .get('/api/users/current')
    .set('Cookie', cookie)
    .expect(200);

  expect(res.body.currentUser.email).toEqual('test@i.ua');
});

it('get null for unauth user', async () => {
  const res = await request(app).get('/api/users/current').expect(200);

  expect(res.body.currentUser).toEqual(null);
});
