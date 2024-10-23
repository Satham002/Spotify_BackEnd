import express from "express"
import { login, signin } from "../controller/UserController.js"

const UserRouter = express.Router()

UserRouter.post("/login", login);
UserRouter.post("/signin", signin)

export default UserRouter;