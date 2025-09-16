// import { injectedRegisterUserController } from "@infrastructure/DI/authContainer";
import { investorAuthController } from "@infrastructure/DI/authContainer";
import { Router, Request, Response } from "express";

export class Investor_Router {
  private _router: Router;

  constructor() {
    this._router = Router();
    this._setRoute();
  }

  private _setRoute() {
    this._router.post("/signup", (req: Request, res: Response) => {
      investorAuthController.sendOtp(req, res);
    });

    this._router.post("/verify-otp", (req: Request, res: Response) => {
      investorAuthController.registerInvestor(req, res);
    });

    this._router.post("/resend-otp", (req: Request, res: Response) => {
      investorAuthController.sendOtp(req, res);
    });

    this._router.post("/login", (req: Request, res: Response) => {
      investorAuthController.investorLogin(req, res);
    });
  }

  public get_router(): Router {
    return this._router;
  }
}
