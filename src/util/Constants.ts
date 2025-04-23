import dotenv from "dotenv";

export default class Constants {
  static {
    dotenv.configDotenv();
  }

  static readonly CIPHER_KEY = process.env.CIPHER_KEY ?? "";

  static readonly ADMIN_SECRET = process.env.ADMIN_SECRET ?? "";
  static readonly API_URL = process.env.API_URL ?? "";

  static {
    if (Constants.CIPHER_KEY === "") {
      console.error(
        "CIPHER_KEY is not set, please set it in your .env file or in your environment variables"
      );
      process.exit(1);
    }
    if (Constants.ADMIN_SECRET === "") {
      console.error(
        "ADMIN_SECRET is not set, please set it in your .env file or in your environment variables"
      );
      process.exit(1);
    }
    if (Constants.API_URL === "") {
      console.warn(
        "API_URL is not set, please set it in your .env file or in your environment variables"
      );
      process.exit(1);
    }
  }
}
