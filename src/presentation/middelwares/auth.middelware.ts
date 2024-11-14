import { NextFunction, Request, Response } from "express";
import { Jwt } from "../../config";
import { UserModel } from "../../data/mongodb";

export class AuthMiddelware {

    static   validateJWT= async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
        const autorization =req.headers.authorization;
        if(!autorization) return res.status(401).json({error:'No token provided'})
        if(!autorization.startsWith('Bearer '))    return res.status(401).json({error:'invalid tokend'})
        const token = autorization.split(' ').at(1)|| " ";
    try {
        //todo: 
        // paylod

        const payload  = await Jwt.validateToken<{id:string}>(token)
        if(!payload) return  res.status(401).json({error:"invalid token"})
        

        const user = await UserModel.findById(
            payload.id
        )

        if(!user) return  res.status(401).json({error:"invalid token "})



        req.body.user = user;
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
    }
    }


}