import  express, { Router } from "express";

interface Optionts {
    port?:number
    routes:Router
}

export class Server {
    public readonly app = express()
    private readonly port:number
    private readonly routes:Router
    constructor(options:Optionts){
        const {port=3100, routes} = options;
        this.port = port
        this.routes = routes
    }
    async start(){


        //midelwers 
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended:true}))



        //user las rutas definidas
        this.app.use(this.routes)

        // listing Port
        this.app.listen(this.port,()=>{
            console.log(`server is runing in port ${this.port}`)
        })
    }
}