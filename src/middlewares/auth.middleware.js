import jwt from 'jsonwebtoken'


export const authRequire = (req, res, next) =>{
    try {
        const {authorization} =req.headers

        if(!authorization)
            return res.status(401).json({message: "No autorizado"})

        const tokenDecoded = jwt.verify(authorization, process.env.SECRET_KEY)
        const actualTime = new Date()/1000;

        if(actualTime > tokenDecoded.exp)
             return res.status(401).json({message: 'Token expirado'})

            req.data = tokenDecoded.data
    } catch (error) {
        return res.status(401).json({message: "Token inválido o no proporcionado", error})
    }

    next()
}