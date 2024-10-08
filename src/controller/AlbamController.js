import { v2 as cloudinary } from 'cloudinary'
import albamModel from '../models/AlbamModel.js'

const addAlbam = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const albamData = {
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url,
        }
        const albam = albamModel(albamData)
        await albam.save()
        res.status(200).json({ result: true, message: "Album Added" })
    } catch (error) {
        res.status(404).json({ result: true, message: "error occured" })
    }
}

const listAlbam = async (req, res) => {
    try {
        const allAlbam = await albamModel.find({})
        res.status(200).json({ result: true, message: allAlbam })
    } catch (error) {
        res.status(404).json({ result: false, message: "error" })
    }

}

const deleteAlbam = async (req, res) => {
    try {
        const id = req.body.id;
        await albamModel.findByIdAndDelete({ _id: id })
        res.status(200).json({ result: true, message: "Delete Sucessfully" })
    } catch (error) {
        res.status(404).json({ result: false, message: "Error occured" })
    }

}
export { addAlbam, listAlbam, deleteAlbam }