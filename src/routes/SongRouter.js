import { addSong, listSong, removeSong } from "../controller/SongController.js";
import express from 'express'
import uplode from "../middleware/multer.js";

const SongRouter = express.Router()


SongRouter.post("/add", uplode.fields([{ name: 'image', maxCount: 1 }, { name: "file", maxCount: 1 }]), addSong);
SongRouter.get("/list", listSong);
SongRouter.post("/remove", removeSong);

export default SongRouter;