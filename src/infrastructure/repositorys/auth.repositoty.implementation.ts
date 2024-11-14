import { AuthDataSource, AuthRepository, registerSserDto, UserEntity } from "../../domain";
import { LoginDto } from "../../domain/dtos/auth/login.dto";

export class AuthRepositoryImplementation implements AuthRepository{

    constructor(
        private readonly dataSource:AuthDataSource
    ){
        
    }

    register(registerSserDto: registerSserDto): Promise<UserEntity> {
        return this.dataSource.register(registerSserDto);
    }
    login(loginUserDto:LoginDto): Promise<UserEntity>{
        return this.dataSource.login(loginUserDto)
    }
    
}