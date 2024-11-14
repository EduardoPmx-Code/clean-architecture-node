import { Validators } from "../../../config"

export class LoginDto{

constructor(
    public email:string,
    public password:string,
){
    

}
    static login(object:{[key:string]:any}):[string?,LoginDto?]{
        
        const {email,password}= object
        if(!email) return ['mising email']
        if(!Validators.email.test(email)) return [`email no valid`]
        if(!password) return ['mising password']
        if(password.length < 6) return [`password to short`]
        return [
            undefined,
            new LoginDto(
                email,
                password,
            )
        ]
    }

}