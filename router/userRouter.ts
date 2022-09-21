import express from 'express'

const router = express.Router()
import {getUsers, createUser} from '../controller/userController'

router.route("/").get(getUsers).post(createUser)

export default router