import { Validators } from "../../../config";

export class registerSserDto{
    private constructor(
        public name:string,
        public email:string,
        public password:string,    
    ){

    }

    static create(object:{[key:string]:any}):[string?,registerSserDto?]{
        
        const {name ,email,password}= object;

        if(!name) return [`missin name`]
        if(!email) return [`missin email`]
        if(!Validators.email.test(email)) return [`email no valid`]
        if(!password) return [`missin password`]

        if(password.length < 6) return [`password to short`]
        
        
        return [
            undefined,
            new registerSserDto(
                name,
                email,
                password,
            )
        ]
    }
}