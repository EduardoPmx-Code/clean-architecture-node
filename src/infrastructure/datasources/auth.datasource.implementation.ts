import { Response } from "express";
import { BcryptAdapter } from "../../config/bcrypt.ts/bcrypt";
import { UserModel } from "../../data/mongodb";
import { AuthDataSource, CustomError, registerSserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.maper";
import { LoginDto } from "../../domain/dtos/auth/login.dto";
//authMonGo
type HashFuntion =(password:string)=>string
type CompareFuntion = (password:string, hashed:string)=>boolean;
export class AuthDataSourceImplementation implements AuthDataSource{

    
    
    constructor(
        private readonly hashFuntion:HashFuntion = BcryptAdapter.hash,
        private readonly comparePassword:CompareFuntion = BcryptAdapter.compareHasH,
    ){

    }
    async login(loginUserDto: LoginDto): Promise<UserEntity> {
        

        try {

            const {email,password}= loginUserDto
            const user = await UserModel.findOne(
            { email: email}
            )
            if(!user)   throw CustomError.basRequest("invalid credentials")
    
            const passwordCheck= this.comparePassword(password,user.password);
        
            if(!passwordCheck) throw CustomError.basRequest("invalid credentials")
    
            
            
            return  UserMapper.userEntityFromObject(user);
        } catch (error) {
            console.log(error)
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServerError()
        }
    }



    async register(registerSserDto: registerSserDto): Promise<UserEntity> {
        const {name,email,password}= registerSserDto
        
        try {
           // verificar si el correo existe
           // hash del password
           //  mapear respuesta a nuestra entidad

            const emailExist = await UserModel.findOne({
            email:email
            })
            if(emailExist){
            throw CustomError.basRequest("invalid credentials")
            }


            const user = await UserModel.create({
            name:name,
            email:email,
            password:this.hashFuntion(password)
            })



            await user.save()

           //todo: maped response
            return UserMapper.userEntityFromObject(user);

            
        } catch (error) {
            console.log(error)
            if(error instanceof CustomError){
                throw error;
            }
            throw CustomError.internalServerError()
        }
    }

}