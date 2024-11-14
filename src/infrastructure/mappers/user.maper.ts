import { CustomError, UserEntity } from "../../domain";

export class UserMapper{

    static userEntityFromObject(object:{[key:string]:any}){
        const {id,_id,name,email,password,roles}=object

        if(!_id||!id){
            throw CustomError.basRequest("id  is required")
        }
        if(!name){
            throw CustomError.basRequest("name is required")
        }
        if(!email){
            throw CustomError.basRequest("email is required")
        }
        if(!password){
            throw CustomError.basRequest("password is required")
        }
        if(!roles){
            throw CustomError.basRequest("roles is required")
        }


        return new UserEntity(
            _id||id,
            name,
            email,
            password,
            roles
        )
    }
}