import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImplementation, AuthRepositoryImplementation } from "../../infrastructure";
import { AuthMiddelware } from "../middelwares/auth.middelware";



export class AuthRoutes {



    static get routes():Router{
        const router = Router()
        const dataSource = new AuthDataSourceImplementation()
        const authrepository =  new AuthRepositoryImplementation(dataSource)
        const controller = new AuthController(authrepository)

        // definir todas las rutas 
        router.post("/login",controller.loginUser)

        router.post("/register", controller.registerUser)
        router.get("/", AuthMiddelware.validateJWT ,controller.getUsers)

        return router
    }
}


//openssl rand -hex 32 //linux y mac
//openssl rand 