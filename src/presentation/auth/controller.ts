import { Request, Response } from "express"
import { AuthRepository, CustomError, registerSserDto, RegisterUser } from "../../domain"
import { Jwt } from "../../config"
import { UserModel } from "../../data/mongodb"
import { error } from "console"
import { LoginDto } from "../../domain/dtos/auth/login.dto"
import { LoginUserUseCase } from "../../domain/use-cases/auth/login-user.use-case"

export class AuthController{

    constructor(
        private readonly authRepository:AuthRepository
    ){
        
    }
    private handlerError=(error:unknown,res:Response)=>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message})
        }
        console.log(error)
        return res.status(500).json({error:"internal server error"})
        //winston
    }


    registerUser =  (req:Request, res:Response): any=>{
        
        const [error,registerUserDto] = registerSserDto.create(req.body)
        if (error) return res.status(400).json({error});

        new RegisterUser(this.authRepository).execute(registerUserDto!).then(
            data=> res.json(data)
        ).catch(
            err=>this.handlerError(err,res)
        )
        
    }

    loginUser = (req:Request, res:Response): any=>{
        const [error,loginDto] = LoginDto.login(req.body)
        if (error) return res.status(400).json({error});

        new LoginUserUseCase(this.authRepository).execute(loginDto!).then(
            data=>res.json(data)
        ).catch(
            err=>this.handlerError(err,res)
        )
    }


    getUsers = (req:Request, res:Response)=>{
        UserModel.find().then(
            users=>res.json({user:req.body.user})
            
        ).catch(
            ()=>res.status(500).json({error:"internal server error"})
        )
    }

}