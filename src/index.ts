import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as http from "http";
import * as https from "https";
import * as fs from "fs";
import auth from "./routes/auth.js";
import settings from "./routes/settings.js";
import Constants from "./util/Constants.js";

(() => {
  // Create express instnace
  const app = express();

  // Create api/v1 Router instance
  const api = express.Router();

  //disable xpowered header
  app.disable("x-powered-by");

  //Configure our app
  app.use(
    express.urlencoded({
      limit: "256mb",
      extended: true,
    })
  );

  // 256 Mo for upload
  app.use(express.json({ limit: "256mb" }));
  const customOrigin = (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (
      origin === undefined ||
      origin.startsWith("http://localhost") ||
      origin.startsWith("https://localhost") ||
      origin.startsWith("capacitor://localhost") ||
      origin.startsWith(Constants.API_URL)
    ) {
      callback(null, true);
    } else {
      callback(new Error(origin + " => Not allowed by CORS"));
    }
  };
  // use cors for API calls
  app.use(
    cors({
      origin: customOrigin,
      exposedHeaders: [Constants.XSRF_TOKEN, "x-access-token"],
      credentials: true,
    })
  );
  app.use(cookieParser());

  app.use((_, res, next) => {
    res.removeHeader("X-Powered-By");
    res.setHeader("X-Powered-By", "Laurent");
    next();
  });

  api.use(auth);
  api.use(settings);
  app.use("/api", api);

  // Create and start server
  let server: http.Server | https.Server;

  if (process.env.NODE_ENV === "production") {
    console.log("=================================");
    console.log("== HTTPS MODE ");
    console.log("=================================");
    const pkey = fs.readFileSync("/certs/server.key");
    const pcert = fs.readFileSync("/certs/server.pem");
    const httpsOptions = {
      key: pkey,
      cert: pcert,
    };
    server = https.createServer(httpsOptions, app);
  } else {
    console.log("=================================");
    console.log("== DEV MODE ");
    console.log("=================================");
    server = http.createServer(app);
  }

  server.listen(8500, "0.0.0.0", () => {
    console.log("Server started !");
  });

  [
    `exit`,
    `SIGINT`,
    `SIGUSR1`,
    `SIGUSR2`,
    `uncaughtException`,
    `SIGTERM`,
  ].forEach((event) => {
    process.on(event, (e) => {
      console.log("receive " + event + " event... close server", e);
      server.close(() => process.exit());
    });
  });
})();
