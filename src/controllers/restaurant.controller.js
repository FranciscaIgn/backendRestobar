import { Restaurant } from "../models/Restaurant.model.js";

export const getAllInfo = async(req, res) =>{
    try{
       const allInfo =await Restaurant.find()
       res.status(200).json({
        message: 'información encontrada',
        status: 200,
        data: allInfo
       })
    }catch(error){
       res.status(404).json({
        message: 'no se encontro la información',
        status: 404,
        error
       })
    }
}


export const CreateNewiInfo = async(req, res) =>{
    try{
        const{nombre, correo, telefono, direccion} = req.body

        const info = new Restaurant({
            nombre,
            correo,
            telefono,
            direccion
        })

        const SaveInfo = await Restaurant.save()

        res.status(201).json({
            message: 'info creada con éxito',
            status: 201,
            data: SaveInfo
        })
    }catch(error){
        res.status(500).json({
            message: 'Error al crear la info',
            status: 500,
            error
        })

    }
}

export const updateInfoById = async(req, res) =>{
    try{
        const infoID = req.params.id
        const updatedInfo = req.body

        const updateInfo = await Restaurant.findOneAndUpdate({ _id: infoID}, updatedInfo, { new: true })
        if(!updateInfo) res.status(404).json({message:'Información no encontrada', status: 404}) // guard condition

            res.status(202).json({
                message: 'información actualizada con éxito',
                status: 202,
                data: updateInfo
            })
        }catch(error){ 
            res.status(500).json({
                message: 'no pudimos actualizar la información',
                status: 500,
                error
            })
    }
};

export const deleteInfoById = async(req, res) =>{
   try {
    const infoID = req.params.id

    const removeInfo = await Restaurant.findOneAndDelete({ _id: infoID })
    if(!removeInfo) res.status(404).json({ message: 'información no encontrada', status: 404}) // guard condition
       
    res.status(202).json({
    message: 'informacion eliminada con éxito',
    status: 202,
})
   } catch (error) {
     res.status(500).json({
        mesagge: 'No pudimos eliminar la información',
        status: 500,
        error
     })
   }
};