import { LoginDto } from "../dtos/auth/login.dto";
import { registerSserDto } from "../dtos/auth/register.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
    // todo:
    abstract login (loginDto:LoginDto):Promise<UserEntity>
    abstract  register(registerSserDto:registerSserDto):Promise<UserEntity>
}