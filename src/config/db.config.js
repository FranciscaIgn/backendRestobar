import mongoose from 'mongoose'

export const db =async () =>{
    try{
          await mongoose.connect(process.env.DB_CONNECTION, 
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            });
            console.log('conectado con mongoDB')
    }catch (error){
        console.error('error conectando con mongoDb', error)

    }
}