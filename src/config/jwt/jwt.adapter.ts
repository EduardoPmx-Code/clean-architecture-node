import { error } from 'console';
import jwt from 'jsonwebtoken'
import { envs } from '../envs';


const JWT_SEED = envs.JWT_SEED

export class Jwt{
    static async generateToken(_payload:Object, _duration:string = '2h'):Promise<string| null>{

        return new Promise((resolve)=>{
            jwt.sign(_payload,JWT_SEED ,{expiresIn:_duration},(err,token)=>{
                if(err) return resolve(null);
                resolve(token!)
            })
        })
    }

    static validateToken<T>(token:string):Promise<T|null>{
        return new Promise ((resolve)=>{
            jwt.verify(token,JWT_SEED ,(error,decode)=>{
                if(error) return resolve(null)
                resolve(decode as T)
            })
        })
    }
}