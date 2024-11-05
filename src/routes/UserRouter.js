import express from "express"
import { login, signin, tokenVerify } from "../controller/UserController.js"

const UserRouter = express.Router()

UserRouter.post("/login", login);
UserRouter.post("/signin", signin)
UserRouter.get('/tokenverify', tokenVerify)

export default UserRouter;