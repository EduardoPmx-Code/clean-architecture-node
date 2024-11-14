import { Jwt } from "../../../config";
import { registerSserDto } from "../../dtos/auth/register.dto";
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

interface RegisterUserUseCase{
    execute(registerUserDto:registerSserDto):Promise<userToken>
}
export class RegisterUser implements RegisterUserUseCase{
    constructor(
        private readonly authrepository:AuthRepository,
        private readonly signtToken:signToken = Jwt.generateToken
    ){

    }
    async execute(registerUserDto: registerSserDto): Promise<userToken> {
        // todo: create user
        // return token

        const user = await this.authrepository.register(registerUserDto);
        const token = await this.signtToken({id:user.id},"2h")
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