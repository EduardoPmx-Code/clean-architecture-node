export class CustomError extends Error  {
    constructor(
        public readonly statusCode:number,
        public readonly message:string
    ){
        super(message);
    }

    static basRequest (message:string){
        return new CustomError(400,message);
    }
    static unAutorized (message:string){
        return new CustomError(401,message);
    }
    static forbiden (message:string){
        return new CustomError(403,message);
    }
    static notFound (message:string){
        return new CustomError(404,message);
    }
    static internalServerError(message:string= "internal server error"){
        return new CustomError(500,message);
    }
}