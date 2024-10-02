import mongoose from "mongoose";

const SongScheme = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    albam: { type: String, required: true },
    image: { type: String, required: true },
    file: { type: String, required: true },
    duration: { type: String, required: true },
})

const songModel = mongoose.models.song || mongoose.model("song", SongScheme)

export default songModel;