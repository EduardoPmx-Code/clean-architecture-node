import { LoginDto } from "../dtos/auth/login.dto";
import { registerSserDto } from "../dtos/auth/register.dto";
import { UserEntity } from "../entities/user.entity";


export abstract class AuthDataSource {
    // todo:
    abstract login ( loginUserDto: LoginDto):Promise<UserEntity>
    abstract  register(registerUserDto:registerSserDto):Promise<UserEntity>
}