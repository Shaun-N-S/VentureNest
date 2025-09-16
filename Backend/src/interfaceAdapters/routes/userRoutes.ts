// src/interfaceAdapters/routes/userRoutes.ts
import { userAuthController } from "@infrastructure/DI/authContainer";
import { Router, Request, Response } from "express";
// import { injectedRegisterUserController } from "infrastructure/DI/User/authContainer";

export class User_Router {
  private _router: Router;

  constructor() {
    this._router = Router();
    this._setRoute();
  }

  private _setRoute() {
    this._router.post("/users", (req: Request, res: Response) => {
      userAuthController.sendOtp(req, res);
    });

    this._router.post("/users/verify-otp", (req: Request, res: Response) => {
      userAuthController.registerUser(req, res);
    });

    this._router.post("/users/resend-otp", (req: Request, res: Response) => {
      userAuthController.sendOtp(req, res);
    });

    this._router.post("/users/login", (req: Request, res: Response) => {
      userAuthController.userLogin(req, res);
    });

    // this._router.post("/forgot-password-verify-otp", (req: Request, res: Response) => {
    //   injectedRegisterUserController.forgetPasswordVerifyOtp(req, res);
    // });

    // this._router.post("/login", (req: Request, res: Response) => {
    //   injectedRegisterUserController.login(req, res);
    // });

    // this._router.patch("/profile-update",(req:Request,res:Response)=>{
    //   injectedRegisterUserController.
    // })

    // this._router.post("/forget-password", (req: Request, res: Response) => {
    //   injectedRegisterUserController.forgetPassword(req, res);
    // });

    // this._router.post("/reset-password", (req: Request, res: Response) => {
    //   injectedRegisterUserController.resetPassword(req, res);
    // });
  }

  public get_router(): Router {
    return this._router;
  }
}
