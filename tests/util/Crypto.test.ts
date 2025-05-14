import { expect, test } from "vitest";
import Crypto from "../../src/util/Crypto.js";

test("cipher / decipher", () => {
  const ciphered = Crypto.cipher("test");
  expect(ciphered).not.toBeNull();
  expect(ciphered).not.toBe("");
  const deciphered = Crypto.decipher(ciphered);
  expect(deciphered).toBe("test");
});

test("md5", () => {
  const md5 = Crypto.md5("test");
  expect(md5).toBe("098f6bcd4621d373cade4e832627b4f6");
});

test("validateXsrf", () => {
  const date = new Date().getTime();
  const cipher = Crypto.cipher({ date });
  expect(Crypto.validXSRF(cipher)).toBeTruthy();

  const oldDate = new Date();
  oldDate.setTime(oldDate.getTime() - 3100);
  const oldCipher = Crypto.cipher({ date: oldDate });
  expect(Crypto.validXSRF(oldCipher)).toBeFalsy();
});

test("validateToken", () => {
  const date = new Date().getTime();
  const cipher = Crypto.cipher({ date, admin: true });
  expect(Crypto.validToken(cipher)).toBeTruthy();
  expect(Crypto.validToken(Crypto.cipher({ date, admin: false }))).toBeFalsy();

  const oldDate = new Date();
  oldDate.setTime(oldDate.getTime() - (24 * 60 * 60 * 1000 + 100));
  const oldCipher = Crypto.cipher({ date: oldDate, admin: true });
  expect(Crypto.validToken(oldCipher)).toBeFalsy();
});
