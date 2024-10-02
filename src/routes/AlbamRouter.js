import { addAlbam, listAlbam, deleteAlbam } from "../controller/AlbamController.js";
import express from 'express'
import upload from "../middleware/multer.js";
const albamRouter = express.Router();

albamRouter.post("/add", upload.single("image"), addAlbam);
albamRouter.get("/list", listAlbam);
albamRouter.post("remove", deleteAlbam)

export default albamRouter;