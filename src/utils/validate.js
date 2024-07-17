import bcrypt from 'bcrypt'


export const validateLoginData = async(user, clave) =>{
   const verifyClave = await bcrypt.compare(clave, user.clave)
       
       
            if(!user || !verifyClave){
                return 'Los datos ingresados son invalidos' 
            }
                
}