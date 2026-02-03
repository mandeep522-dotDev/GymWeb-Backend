
import connectDB from "./db/dbConnection.js";
import { app } from './app.js';




connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`server is running on port : ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log('mongo db connection faild !!! ', err);
    
})



