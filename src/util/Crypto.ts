import * as crypto from "crypto";
import Constants from "./Constants.js";

export default class Crypto {
  static cipher(
    phrase: any,
    thumbprint: string = Constants.CIPHER_KEY
  ): string {
    const key = crypto
      .createHash("sha256")
      .update(`#$£@${thumbprint}+=;?`)
      .digest();
    const iv = crypto.randomBytes(12).toString("hex");
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv, {
      authTagLength: 16,
    });
    let ciphered = cipher.update(JSON.stringify(phrase), "utf8", "base64");
    ciphered += cipher.final("base64");
    const tags = cipher.getAuthTag().toString("hex");

    return iv + tags + ciphered;
  }

  static decipher(phrase: string): any {
    const key = crypto
      .createHash("sha256")
      .update(`#$£@${Constants.CIPHER_KEY}+=;?`)
      .digest();
    const iv = phrase.substring(0, 24);
    const tags = Buffer.from(phrase.substring(24, 56), "hex");
    const ciphered = phrase.substring(56);

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv, {
      authTagLength: 16,
    });
    decipher.setAuthTag(tags);
    let decText = decipher.update(ciphered, "base64", "utf8");
    decText += decipher.final("utf8");
    return JSON.parse(decText);
  }

  static md5(str: string): string {
    return crypto.createHash("md5").update(str).digest("hex");
  }

  static validXSRF(xsrf: string) {
    try {
      const decipher = Crypto.decipher(xsrf);
      const diff = new Date().getTime() - decipher.date;
      if (diff < 3000) {
        return true;
      }
    } catch (_) {}
    return false;
  }

  static validToken(token: string) {
    try {
      const decipher = Crypto.decipher(token);
      const diff = new Date().getTime() - decipher.date;
      if (diff < 24 * 60 * 60 * 1000 && decipher.admin === true) {
        // token valid for 24 hours
        return true;
      }
    } catch (_) {}
    return false;
  }
}
