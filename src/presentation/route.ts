import { Router } from "express";
import { AuthRoutes } from "./auth/route";

export class AppRoutes {



    static get routes():Router{
        const router = Router()

        // definir todas las rutas 
        router.use('/api/auth',AuthRoutes.routes)


        // router.use('/api/user')
        // router.use('/api/products')
        //router.use('/api/orders')
        return router
    }



}