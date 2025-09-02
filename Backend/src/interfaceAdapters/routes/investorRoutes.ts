import { injectedRegisterUserController } from "@infrastructure/DI/User/authContainer";
import { Router, Request, Response } from "express";

export class Investor_Router {
  private _router: Router;

  constructor() {
    this._router = Router();
    this._setRoute();
  }

  private _setRoute() {
    this._router.post("/investors", (req: Request, res: Response) => {
      injectedRegisterUserController.sendOtp(req, res);
    });

    this._router.post("/investor/verify", (req: Request, res: Response) => {
      injectedRegisterUserController.registerInvestor(req, res);
    });
  }

  public get_router(): Router {
    return this._router;
  }
}
