import { v2 as cloudinary } from 'cloudinary'
import songModel from '../models/SongModel.js';
const addSong = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;
        const albam = req.body.albam;
        const imageFile = req.files.image[0];
        const audioFile = req.files.file[0];
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        const songdata = {
            name,
            desc,
            albam,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration: duration
        }

        const song = songModel(songdata);
        await song.save()
        res.json({ result: true, message: "song added" })
    } catch (error) {
        res.status(404).json({ result: false, error: error })
    }
}

const listSong = async () => {

}


export { addSong, listSong }