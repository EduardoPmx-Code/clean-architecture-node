import { envs } from "./config";
import { mongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/route";
import { Server } from "./presentation/server"


(()=>{
    main()
})();

async function main (){
    // todo: await db conection
    await mongoDatabase.conect({
        dbName:envs.MONGO_DB_NAME,
        mongoUrl:envs.MONGO_URL,
    })
    // todo: await server init
    new Server({
        port:envs.PORT,
        routes: AppRoutes.routes,
    }).start()
}