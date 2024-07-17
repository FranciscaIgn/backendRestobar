import { User } from '../models/User.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateLoginData } from '../utils/validate.js'

export const signUp = async(req, res) =>{ 
    try {
        const { nombre, apellido, rut, telefono, correo, clave } = req.body
        
        if(!nombre || !apellido || !rut || !telefono || !correo || !clave) {
            return res.status(400).json({message: 'Todos los campos son requeridos', status: 400})
        }

        const verifyUser = await User.findOne({ rut: rut })
        if(verifyUser) return res.status(500).json({ message: 'El rut ingresado ya tiene una cuenta', status: 500 })

            const claveEncrypt = await bcrypt.hash(clave, 10)

            const user = new User({
                nombre,
                apellido,
                rut,
                telefono,
                correo,
                clave: claveEncrypt
            })

            const saveUser = await user.save()

        const expireTime = Math.floor(new Date()/1000) * 3600

        const token = jwt.sign({
            exp: expireTime,
            data: {
                id: saveUser._id,
                correo,
                nombre,
                apellido,
            }
        }, process.env.SECRET_KEY)

        res
        .status(201)
        .json({
            message: `El usuario ${saveUser.nombre} ${saveUser.apellido} ha sido creado con éxito`,
            status: 201,
            token,
            user: saveUser
        })
    } catch (error) {
        res.status(500).json({message: 'No pudimos crear al usuario', status: 500, error})
    }
}

export const login = async(req, res) => {
    try {
        const { correo, clave } = req.body

        const verifyUserByCorreo = await User.findOne({ correo: correo})
        validateLoginData(verifyUserByCorreo, clave)       
   
        const expireTime = Math.floor(new Date()/1000) * 3600

        const {_id, nombre, apellido } = verifyUserByCorreo

        const token = jwt.sign({
            exp: expireTime,
            data:{
                id: _id,
                nombre,
                apellido,
                correo
            }
        }, process.env.SECRET_KEY)

        res.status(202).json({token, user: verifyUserByCorreo})
   
    } catch (error) {
        res.status(401).json({message: 'usuario no autorizado', status: 401, error })
    }
}

export const verifyUser = async(req, res) => {
   try {
      const user = await User.findById(req.data.id).select("-clave")
       res.json(user);
   } catch (error) {
       return res.status(500).json({message: "No pudimos verificar a este usuario", error})
    }
}