import { beforeEach, expect, test, vi } from 'vitest';
import express, { Express } from 'express';
import settings from '../../src/routes/settings.js';
import supertest from 'supertest';
import SettingController from '../../src/controller/SettingController.js';
import Crypto from '../../src/util/Crypto.js';

let app: Express;

beforeEach(() => {
  app = express();
  app.use(express.json({ limit: '256mb' }));
  app.use(settings);
});

test('GET settings', async () => {
  SettingController.getSettings = vi.fn().mockImplementationOnce(() => {
    throw 'fake';
  });
  const response = await supertest(app).get('/settings');
  expect(response.statusCode).toBe(500);
  expect(SettingController.getSettings).toHaveBeenCalled();

  SettingController.getSettings = vi.fn().mockReturnValue({});
  const ok = await supertest(app).get('/settings');
  expect(ok.statusCode).toBe(200);
});

test('POST settings', async () => {
  SettingController.saveSettings = vi.fn().mockResolvedValue(true);
  // no token
  let response = await supertest(app).post('/settings').send({});
  expect(response.statusCode).toBe(401);
  expect(SettingController.saveSettings).not.toHaveBeenCalled();
  // wrong token
  response = await supertest(app).post('/settings').set('Authorization', 'Bearer xxx').send({});
  expect(response.statusCode).toBe(401);
  expect(SettingController.saveSettings).not.toHaveBeenCalled();
  // ok token
  const token = Crypto.cipher({ date: new Date().getTime(), admin: true });
  response = await supertest(app)
    .post('/settings')
    .set('authorization', `Bearer ${token}`)
    .send({});
  expect(response.statusCode).toBe(200);
  expect(SettingController.saveSettings).toHaveBeenCalled();
});
