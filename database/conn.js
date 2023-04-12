const MONGO_URI = "mongodb://yash9657:Yash2001@ac-g9ts6gh-shard-00-00.jpyaug7.mongodb.net:27017,ac-g9ts6gh-shard-00-01.jpyaug7.mongodb.net:27017,ac-g9ts6gh-shard-00-02.jpyaug7.mongodb.net:27017/?ssl=true&replicaSet=atlas-4r0o3e-shard-0&authSource=admin&retryWrites=true&w=majority"
import mongoose from 'mongoose';

const connectMongo = async () => {
    try{
        console.log('entered');
        const { connection }  = await mongoose.connect(MONGO_URI)
        console.log(connection.readyState);
        if(connection.readyState == 1){
            console.log("Database Connected")
        }

    }catch(errors){
        console.log(errors)
        console.log("Database not Connected")
        return Promise.reject(errors)
    }
}

export default connectMongo;