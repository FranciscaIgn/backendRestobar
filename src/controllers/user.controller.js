import { User} from "../models/User.model.js";



export const getAllUsers = async(req, res) =>{
    try {
        const allUsers = await User.find()
        res.status(200).json({
            message: "usuarios encontrados", 
            status: 200, 
            data: allUsers})
    } catch (error) {
        res.status(404).json({
            message: "Usuarios no encontrados", 
            status: 404, 
            error})
    }
}

export const getUserByRut = async(req, res) => {
    try {
        const { rut } =req.params
        const getUserByRut = await User.findOne({ rut: rut})

        res.status(200).json({message: `Usuario con RUT ${rut} encontrado`, status: 200, data: getUserByRut})
    } catch (error) {
        res.status(404).json({message: 'No encontramos el usuario', status: 404, error})
    }
}

export const createNewUser = async(req, res) =>{
    try{
        const{nombre, apellido, rut, telefono, correo, clave } = req.body

        const newuser = new User({
            nombre,
            apellido,
            rut,
            telefono,
            correo,
            clave
        })

          const saveUser = await newuser.save()

        res.status(201).json({
            message: 'info creada con éxito',
            status: 201,
            data: saveUser
        })
    }catch(error){
        res.status(500).json({
            message: 'Error al crear la info',
            status: 500,
            error
        })

    }
}

export const updateUser = async (req, res) => {
    try {
        const userRut = req.params.rut;
        const updateData = req.body;

        const updateUser = await User.findOneAndUpdate(
            {rut: userRut},
            updateData,
            {new: true}
        );
        if(!updateUser) {
             return res.status(404).json({ message: "Usuario no encontrado"});
        }

        res.status(202)
        .json({message: `Usuario ${updateUser.nombre} ${updateUser.apellido} ha sido actualizado con éxito`,
        })
    } catch (error) {
        res.status(500).json({message: "No pudimos actualizar el usuario", error})
    }
};

export const deleteUserByRut = async (req, res) => {
    try {
        const userRut = req.params.rut;

        const removeUser = await User.findOneAndDelete({ rut: userRut });
        if(!removeUser){
            return res
            .status(404)
            .json({message: "Usuario no encontrado para eliminar"});
        }

        res
        .status(202)
        .json({message: `Usuario ${removeUser.nombre} ${removeUser.apellido} ha sido eliminado con éxito`,
        })
    } catch (error) {
        res.status(500).json({message: "No pudimos eliminar el usuario,", error})
    }
}




