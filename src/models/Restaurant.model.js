import mongoose from "mongoose";

const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
    nombre: {type: String, required: true},
    correo: {type: String, required: true},
    telefono: {type: Number, required: true},
    direccion: {type: String, required: true},

}, {versionKey: false})

export const Restaurant = mongoose.model('Restaurant', RestaurantSchema)