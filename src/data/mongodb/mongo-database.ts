import mongoose from "mongoose";
    interface Options{
        mongoUrl:string;
        dbName:string;
    }
export class mongoDatabase{


    static async conect(options:Options){
        const {dbName,mongoUrl}= options

        try {
            const db = await mongoose.connect(mongoUrl,{
                dbName:dbName
            });
            console.log("Mongo COnected");
            return true; 
        } catch (error) {
            console.log(error)
            console.log("mongo conection error")
            throw error
        }
    }

}