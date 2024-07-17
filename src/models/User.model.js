import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    nombre: {type: String, required: true },
    apellido: {type: String, required: true},
    rut: {type: String, required: true, unique: true},
    telefono: {type: Number, required: true},
    correo: {type: String, required: true},
    clave: {type: String, required: true}   
}, { versionKey: false })

export const User = mongoose.model('users', UserSchema)