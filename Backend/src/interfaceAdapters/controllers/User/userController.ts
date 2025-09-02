import { Request, Response } from "express";

export class UserController {
    constructor(
        private _updateUserProfile: ,
    ) {}

    async updateUser(req:Request,res:Response):Promise<void> {
        try {
            console.log("update profile data reached ,",req.body);

            const userId = req.params.id;
            const updates = req.body;
            
        } catch (error) {
            
        }
    }
}