import express, { Express } from "express";
import { mongoConnect } from "infrastructure/db/connectDB/mongoConnect";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CONFIG } from "config/config";
import { User_Router } from "interfaceAdapters/routes/userRoutes";
import { Investor_Router } from "interfaceAdapters/routes/investorRoutes";

class Express_app {
  private _app: Express;
  constructor() {
    this._app = express();
    mongoConnect.connect();
    this._setMiddleware();
    this._setRoutes();
  }

  listen() {
    this._app.listen(CONFIG.PORT, (err) => {
      if (err) {
        console.log("error while starting server");
        throw err;
      }
      console.log(`server is running on port ${CONFIG.PORT}`);
    });
  }

  private _setMiddleware() {
    this._app.use(
      cors({
        origin: CONFIG.FRONTEND_URL,
        credentials: true,
      })
    );
    this._app.use(express.json());
    this._app.use(cookieParser());
  }

  private _setRoutes() {
    this._app.use("/users", new User_Router().get_router());
    this._app.use("/investors", new Investor_Router().get_router());
  }
}

const _app = new Express_app();
_app.listen();
