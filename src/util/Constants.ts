export default class Constants {
    static readonly CIPHER_KEY: string = "a8f5f167f44f4964e6c998dee827110c8f5f167f44f4964e6c998dee827110c8f5f167f44f4964e6c998dee827110c";

    static readonly ADMIN_SECRET = process.env.ADMIN_SECRET ?? "1234";
    static readonly API_URL = process.env.API_URL ?? "1234";
}