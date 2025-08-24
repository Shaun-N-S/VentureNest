// src/interfaceAdapters/routes/userRoutes.ts
import { Router, Request, Response } from "express";
import { injectedRegisterUserController } from "../../infrastructure/DI/authContainer";

export class Auth_Router {
  private _router: Router;

  constructor() {
    this._router = Router();
    this._setRoute();
  }

  private _setRoute() {
    this._router.post("/signup", (req: Request, res: Response) => {
      injectedRegisterUserController.sendOtp(req, res);
    });

    this._router.post("/verify-otp", (req: Request, res: Response) => {
      injectedRegisterUserController.registerUser(req, res);
    });

    this._router.post("/verify-otp2", (req: Request, res: Response) => {
      injectedRegisterUserController.verifyOtp(req, res);
    });

    this._router.post("/login", (req: Request, res: Response) => {
      injectedRegisterUserController.login(req, res);
    });

    this._router.post("/forget-password", (req: Request, res: Response) => {
      injectedRegisterUserController.forgetPassword(req, res);
    });
  }

  public get_router(): Router {
    return this._router;
  }
}
