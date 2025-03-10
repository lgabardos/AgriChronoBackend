import * as express from "express";
import Crypto from "../util/Crypto.js";
import Constants from "../util/Constants.js";

const xsrfSecure = () => {
  return !process.env.NODE_ENV ? "SameSite=Lax;" : "Secure; SameSite=None;";
};
const router = express.Router();

router.head("/xsrf", async (_req: express.Request, res: express.Response) => {
  const xsrf = {
    date: new Date().getTime(),
  };
  // return result
  res.setHeader("Set-Cookie", [
    `XSRF-TOKEN=${Crypto.cipher(
      xsrf
    )}; expires=1; HttpOnly; ${xsrfSecure()} Path=/`,
  ]);
  res.status(200).send();
});
router.post("/code", async (req: express.Request, res: express.Response) => {
  const xsrf = req.cookies["XSRF-TOKEN"];
  if (!xsrf || !Crypto.validXSRF(xsrf)) {
    res.status(417).send({ message: "XSRF is invalid, please refresh page" });
    return;
  }
  const { code } = req.body;
  if (code === Constants.ADMIN_SECRET) {
    res
      .status(200)
      .send({
        token: Crypto.cipher({ date: new Date().getTime(), admin: true }),
      });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
});
export default router;
