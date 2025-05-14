import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import express, { Express } from 'express';
import auth from '../../src/routes/auth.js';
import supertest from 'supertest';
import Crypto from '../../src/util/Crypto.js';

let app: Express;

beforeEach(() => {
  app = express();
  app.use(express.json({ limit: '256mb' }));
  app.use(auth);
});

test('HEAD xsrf', async () => {
  const fakeDate = new Date();
  vi.useFakeTimers({ now: fakeDate });

  const response = await supertest(app).head('/xsrf');
  const setCookie = response.headers['set-cookie'] as unknown as string[];
  expect(setCookie).toBeDefined();
  const xsrfCookie = setCookie[0]!;
  const parts = xsrfCookie.split(';');
  expect(parts[1]).toBe(' expires=1');
  expect(parts[2]).toBe(' HttpOnly');
  expect(parts[3]).toBe(' Secure');
  expect(parts[4]).toBe(' SameSite=None');
  expect(parts[5]).toBe(' Path=/');
  const xsrfToken = parts[0]!.split('=')[1]!;
  const deciphered = Crypto.decipher(xsrfToken);
  expect(deciphered.date).toBeDefined();
  expect(deciphered.date).toEqual(fakeDate.getTime());
});

test('GET xsrf', async () => {
  const fakeDate = new Date();
  vi.useFakeTimers({ now: fakeDate });

  const response = await supertest(app).get('/xsrf');
  const setCookie = response.headers['set-cookie'] as unknown as string[];
  expect(setCookie).toBeDefined();
  const xsrfCookie = setCookie[0]!;
  const parts = xsrfCookie.split(';');
  expect(parts[1]).toBe(' expires=1');
  expect(parts[2]).toBe(' HttpOnly');
  expect(parts[3]).toBe(' Secure');
  expect(parts[4]).toBe(' SameSite=None');
  expect(parts[5]).toBe(' Path=/');
  const xsrfToken = response.body.token;
  const deciphered = Crypto.decipher(xsrfToken);
  expect(deciphered.date).toBeDefined();
  expect(deciphered.date).toEqual(fakeDate.getTime());
});

test('POST code', async () => {
  // nothing
  let response = await supertest(app).post('/code').send({ code: '1111' });
  expect(response.statusCode).toBe(417);
  // invalid xsrf
  response = await supertest(app).post('/code').set('xsrf-token', 'xxx').send({ code: '1111' });
  expect(response.statusCode).toBe(417);
  // valid xsrf but unauthorired
  const xsrfResponse = await supertest(app).get('/xsrf');
  const xsrf = xsrfResponse.body.token;
  response = await supertest(app).post('/code').set('xsrf-token', xsrf).send({ code: '1111' });
  expect(response.statusCode).toBe(401);
  // all good
  response = await supertest(app).post('/code').set('xsrf-token', xsrf).send({ code: '1234' });
  expect(response.statusCode).toBe(200);
});

afterEach(() => {
  vi.useRealTimers();
});
