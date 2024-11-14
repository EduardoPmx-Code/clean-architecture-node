import { Jwt } from "../../../config";
import { LoginDto } from "../../dtos/auth/login.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repositorie";

interface userToken{
    token:string,
    user:{
        id:string,
        name:string,
        email:string,
    }
}

type signToken = (_payload:Object, _duration:string)=>Promise<string| null>
export class LoginUserUseCase{
    constructor(
        private readonly authRepository:AuthRepository,
        private readonly signToken:signToken = Jwt.generateToken
    ){

    }
    async execute(loginUserDto:LoginDto): Promise<userToken>{
        const user = await this.authRepository.login(loginUserDto);
        const token = await this.signToken({id:user.id},"2h")
        if(!token) throw CustomError.internalServerError("Error generating token")
        
        
        
            return{
                token:token,
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                }
    }
}

}